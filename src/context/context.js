import React, { useState } from 'react';
import mockUsers from './mockData/users';

const GithubContext = React.createContext();
const axios = require('axios').default;
axios.defaults.baseURL = 'https://api.github.com';

const GithubProvider = ({ children }) => {

  const [githubUsers, setGithubUsers] = useState(mockUsers);

  // request github 

  const [requests, setRequests] = useState(0);

  const [totalUsers, setTotalUsers] = useState(0);

  const [pagination, setPagination] = useState(0);

  const [selectedUser, setSelectedUser] = useState(0);

  const [loading, setIsLoading] = useState(false);

  const onPaginationChange = (params) => {
    searchGithubUsers(selectedUser, params);
  };

  const searchGithubUsers = async (user, params = '') => {
    
    // set loader true
    setIsLoading(true);

    let url = `search/users?q=${user || selectedUser}`;
    console.log('searchGithubUsers ',  params)

    if(params != '')  {
      Object.keys(params).forEach(key => {
        url += `&${key}=${params[key]}`
      });
    } else {
      url += '&per_page=10&page=1';
    }

    const response = await axios
    .get(url)
    .catch((err) => console.log(err));
    console.log(response);
    if (response) {

      let githubLink = response.headers['link'] 
      ? response.headers['link']
      .split(',')
      .map((lnk)=> {
        let section = lnk.split(';');
        if (section.length != 2) {
          throw new Error("section could not be split on ';'");
        }
        let key = section[1].replace(/rel="(.*)>"/, '$1').trim().split('"')[1].toString();
        let url = section[0].replace(/<(.*)>/, '$1').trim();
        const params = new Proxy(new URLSearchParams(url), {
          get: (searchParams, prop) => searchParams.get(prop),
        });
        return {per_page: params.per_page, page: params.page, rel: key }
      })
      : 0;

      console.log('githubLink =========== :::', githubLink);

      // create a pagination based on response from link
      setPagination(githubLink);

      // set the results to main github usres
      setGithubUsers(response.data);

      setTotalUsers(response.data.total_count);

      getRemainingRequests();
    
    } else {
			getRemainingRequests();
			console.log('no such user');
		}

    setIsLoading(false);
   }

   const getRemainingRequests = () => {
		axios
			.get('/rate_limit')
			.then(({ data }) => {
				setRequests(data.rate);
				console.log('getRemainingRequests', data.rate);
				if (data.rate.remaining == 0) {
					//throw error
          throw new Error('hourly limit is over')
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

  return (
    <GithubContext.Provider value={{githubUsers, requests, totalUsers, pagination, loading, setSelectedUser, searchGithubUsers, onPaginationChange}}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
