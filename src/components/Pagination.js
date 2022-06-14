import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';

const Pagination = () => {

  const { pagination, onPaginationChange, page, perPage, totalUsers } = React.useContext(GithubContext);

  const handelPageChange = (e) => {
    const prams = pageObject(e);
    onPaginationChange(prams);    
  }

  const pageObject = (e) => { 
    return  pagination ? pagination.filter((l) => l.rel == e)[0] : null;
  };

  if(pagination !== 0) {

    let startIndex = Number(page) != 1 ? (Number(page) * Number(perPage)) - 1 : 1;
    let endIndex = Math.min(startIndex + Number(perPage) - 1, Number(totalUsers) - 1);

    return (
      <Wrapper>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            {pagination.map((btn) => {  btn.rel != 'first' &&  btn.rel !== 'last'
              return <button
                        key={'mobile-' + btn.order}
                        onClick={() => handelPageChange(btn.rel)}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <span className="sr-only">Previous</span>
                        {btn.rel}
                      </button>
            })}
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex}</span> to <span className="font-medium">{endIndex}</span> of{' '}
                <span className="font-medium">{totalUsers} </span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {pagination.map((btn) => {  
                  return <button
                            key={'main-' + btn.order}
                            onClick={() => handelPageChange(btn.rel)}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">{btn.rel}</span>
                            {btn.rel}
                          </button>
                })}
              </nav>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.section`
  padding: 0;
`;

export default Pagination;
