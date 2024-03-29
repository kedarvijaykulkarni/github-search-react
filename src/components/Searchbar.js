import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";

const Search = () => {
  const [user, setUser] = React.useState("");
  const {
    totalUsers,
    searchGithubUsers,
    setPage,
    setSelectedUser,
    setGithubUsers,
    setPagination,
    setTotalUsers,
  } = React.useContext(GithubContext);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (user) {
      handelClear();
      setUser(user);
      setSelectedUser(user);
      searchGithubUsers(user, "");
    }
  };

  const handelClear = () => {
    setPage(1);
    setUser("");
    setSelectedUser("");
    setGithubUsers(undefined);
    setPagination(0);
    setTotalUsers(0);
  };

  return (
    <Wrapper>
      <form className="group relative" onSubmit={handelSubmit}>
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          className="focus:ring-2 mr-3 focus:ring-blue-500 focus:outline-none appearance-none w-3/5 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
          type="text"
          placeholder="User name"
          aria-label="Github username"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <button
          className="w-1/6 px-3 mr-3 py-2 rounded-md bg-slate-50 cursor-pointer dark:bg-transparent dark:text-slate-300 dark:ring-1 dark:ring-slate-700 hover:bg-slate-700 hover:text-white border-slate-100 hover:border-slate-700 text-sm border-2"
          type="submit"
        >
          Search
        </button>
        <button
          className="w-1/6 px-3 py-2 rounded-md bg-red-400 cursor-pointer dark:bg-transparent dark:text-slate-300 dark:ring-1 dark:ring-slate-700 hover:bg-red-800 hover:text-white border-red-400 hover:border-red-800 text-sm border-2"
          type="button"
          onClick={handelClear}
          disabled={totalUsers <= 0}
        >
          clear
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-bottom: 16px;
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  margin: 1rem 0;
`;

export default Search;
