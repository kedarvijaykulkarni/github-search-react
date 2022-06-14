import React, { useState, useEffect } from 'react';
// import mockUsers from './mockData/users';

const GithubContext = React.createContext();
const axios = require('axios').default;
axios.defaults.baseURL = 'https://api.github.com';

const GithubProvider = ({ children }) => {

  const [githubUsers, setGithubUsers] = useState();

  const [requests, setRequests] = useState(0);

  const [totalUsers, setTotalUsers] = useState(0);

  const [pagination, setPagination] = useState(0);

  const [selectedUser, setSelectedUser] = useState(0);

  const [loading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(3);

  const onPaginationChange = (params) => {
    searchGithubUsers(selectedUser, params);
  };

  const getUserDetails = async ({url}) => {
    return await axios.get(url)
  };

  const searchGithubUsers = async (user, params = '') => {
    
    // set loader true
    setIsLoading(true);

    let url = `search/users?q=${user || selectedUser}`;

    // create url
    if(params != '')  {
      Object.keys(params).forEach(key => {
        url += `&${key}=${params[key]}`;
        if (key == 'page') {
          setPage(params[key]);
        }
        if (key == 'per_page') {
          setPerPage(params[key])
        }
      });
    } else {
      url += `&per_page=${perPage}&page=1`;
    }

    const response = await axios
    .get(url)
    .catch((err) => console.log(err));

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

        const order = (key) => { 
          let num = 0;
          switch(key){
            case 'first': num = 1;
            break;
            case 'prev': num = 2;
            break;
            case 'next': num = 3;
            break;
            case 'last': num = 4;
            break;
            default: num;
          }
          return  num;
         }
        return {per_page: params.per_page, page: params.page, rel: key, order: order(key) }
      })
      : 0;

      // create a pagination based on response from link
      if(githubLink) { //for single user need this
        setPagination(githubLink.sort((a,b) => a.order - b.order));
      }

      // set the results to main github usres
      setGithubUsers(response.data.items);

      setTotalUsers(response.data.total_count);

      getRemainingRequests();
    
    } else {
			getRemainingRequests();
		}

    setIsLoading(false);
   }

   const getRemainingRequests = () => {
		axios
			.get('/rate_limit')
			.then(({ data }) => {
				setRequests(data.rate);
				if (data.rate.remaining == 0) {
					//throw error
          throw new Error('hourly limit is over')
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

  useEffect(() => {
    getRemainingRequests(); 
    return () => console.log("Thanks for checking: please visit for code https://github.com/kedarvijaykulkarni/github-search-react");
  }, []);

  return (
    <GithubContext.Provider value={ 
        {
          githubUsers,
          requests,
          totalUsers,
          pagination,
          loading,
          setSelectedUser,
          searchGithubUsers,
          onPaginationChange,
          setGithubUsers,
          setPagination,
          setTotalUsers,
          getUserDetails,
          page,
          perPage,
          setPage
        }
      }>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
