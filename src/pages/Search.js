import React from "react";
import { Searchbar, Navbar, Results } from "../components";
import { GithubContext } from "../context/context";

const Search = () => {
  const { totalUsers } = React.useContext(GithubContext);

  return (
    <main>
      <Navbar></Navbar>
      <div className="container mx-auto px-4">
        <Searchbar></Searchbar>
        {totalUsers ? <Results></Results> : ""}
      </div>
    </main>
  );
};

export default Search;
