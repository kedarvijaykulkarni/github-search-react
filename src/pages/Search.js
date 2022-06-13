import React from 'react';
import { Searchbar, Navbar, Results } from '../components';

const Search = () => {
  return (
    <main>
      <Navbar></Navbar>
      <div className="container mx-auto px-4">
        <Searchbar></Searchbar>
        <Results></Results>
      </div>
    </main>
  );
};

export default Search;
