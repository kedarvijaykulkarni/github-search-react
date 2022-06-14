import React from 'react';
import styled from 'styled-components';
import { Pagination, Loading, User } from '../components';
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
              {githubUsers?.map((item) => <User url={item.url} key={item.id} {...item}></User>)}
          </ul>
          <Pagination></Pagination>
      </Wrapper>
    );
  }
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
