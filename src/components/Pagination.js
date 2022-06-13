import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';

const Pagination = () => {

  const { pagination, onPaginationChange } = React.useContext(GithubContext);

  const handelPageChange = (e) => {
    const prams = pageObject(e);
    onPaginationChange(prams);    
  }

  const pageObject = (e) => { 
    return  pagination ? pagination.filter((l) => l.rel == e)[0] : {};
  };

  if(pagination !== 0) {
    return (
      <Wrapper>
        <div className="inline-flex">
          <button onClick={() => handelPageChange('first')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
            First
          </button>
          <button onClick={() => handelPageChange('prev')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
            Prev
          </button>
          <button onClick={() => handelPageChange('next')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
            Next
          </button>
          <button onClick={() => handelPageChange('last')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
            Last
          </button>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.nav`
  
`;

export default Pagination;
