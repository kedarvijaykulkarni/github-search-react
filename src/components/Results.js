import React from 'react';
import styled from 'styled-components';
import { Pagination, Loading } from '../components';
import { GithubContext } from '../context/context';

const Results = () => {
  const { githubUsers, loading } = React.useContext(GithubContext);
  if(loading) {
    <Wrapper>
      <Loading></Loading>
    </Wrapper>
  } else {
    return (
      <Wrapper>
          <ul role="list" className="divide-y divide-gray-200">
              {githubUsers?.items.map((item) => <Item key={item.id} {...item}></Item>)}
          </ul>
          <Pagination></Pagination>
      </Wrapper>
    );
  }
};

const Item = ({avatar_url, login, html_url, type}) => {
    return(
    <li>
        <a href={html_url} className="block hover:bg-gray-50" target="_blank">
        <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between text-sm text-gray-300">
                {type}
            </div>
            <div className="mt-2 flex justify-between">
            <div className="sm:flex">
                <div className="mr-6 flex items-center text-sm text-gray-500">
                    <img className="mr-6 h-10 w-10 rounded-full" alt={login} src={avatar_url} />
                    <div>
                        <div className="text-lg font-medium uppercase text-indigo-600 truncate">
                            {login}
                        </div>
                        <div className="text-md font-medium text-600 truncate">
                            {html_url}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </a>
    </li>
    )
};


const TotalUsers = () => {
  const { totalUsers } = React.useContext(GithubContext)
  if(totalUsers > 0 ) {
    return `Total Users: ${totalUsers}`
  } else {
    return 'Search results'
  }
};

const Wrapper = styled.section`
    background: var(--clr-white);
    margin-top: 50px;
    padding: 1.5rem 2rem;
    border-top-right-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
    position: relative;
    &::before {
		content: '${TotalUsers}';
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(-100%);
		background: var(--clr-white);
		color: var(--clr-grey-5);
		border-top-right-radius: var(--radius);
		border-top-left-radius: var(--radius);
		text-transform: capitalize;
		padding: 0.5rem 1rem 0 1rem;
		letter-spacing: var(--spacing);
		font-size: 1rem;
	}
`;

export default Results;
