### create a project

```console
npx create-react-app github-search-react`

cd github-search-react
```

### add git refrence

```console
git remote add origin git@github.com:kedarvijaykulkarni/github-search-react.git

git branch -M master

git push -u origin master
```

### Install Tailwind CSS

```console
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Additional packages

```console
npm install axios react-router-dom styled-components cypress
```

## Gihthub API

- [Root Endpoint](https://api.github.com/)
- [code_search_url](https://api.github.com/search/code?q={query}{&page,per_page,sort,order})
- [commit_search_url](https://api.github.com/search/commits?q={query}{&page,per_page,sort,order})
- [issue_search_url](https://api.github.com/search/issues?q={query}{&page,per_page,sort,order})
- [label_search_url](https://api.github.com/search/labels?q={query}&repository_id={repository_id}{&page,per_page})
- [repository_search_url](https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order})
- [topic_search_url](https://api.github.com/search/topics?q={query}{&page,per_page})
- [user_search_url](https://api.github.com/search/users?q={query}{&page,per_page,sort,order})
- [Get User](https://api.github.com/users/kedarvijaykulkarni)
- [Repos](https://api.github.com/users/john-smilga/repos?per_page=100)
- [Followers](https://api.github.com/users/john-smilga/followers)
- [Rate Limit](https://api.github.com/rate_limit)

For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.

## Run the Cypress test by running:

```console
node_modules/.bin/cypress open
```
