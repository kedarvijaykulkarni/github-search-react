import React, { useEffect, useState } from "react";
import { Loading } from "../components";

const axios = require("axios").default;

const User = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        axios
          .get(props.url)
          .then((response) => {
            setUser(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const hireable = user.hireable ? "hireable" : "";

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <li
          title={`${user.name || user.login} ${hireable}`}
          className={`hover:bg-gray-50 ${hireable} user`}
        >
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-slate-600 truncate uppercase">
                {user.name}
              </div>
              <div className="ml-2 flex-shrink-0 flex">
                <span
                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  title="Followers/Following"
                >
                  <svg
                    text="muted"
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                    className="octicon octicon-people mr-1 pt-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"
                    ></path>
                  </svg>
                  {user.followers} followers . {user.following} following
                </span>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <div className="sm:flex">
                <div className="mr-6 flex items-center text-sm">
                  <a
                    href={user.html_url}
                    className="block hover:bg-gray-50"
                    target="_blank"
                  >
                    <img
                      className="mr-6 rounded-corner w-20"
                      alt={user.login}
                      src={user.avatar_url}
                    />
                  </a>
                  <div>
                    <p
                      className={
                        !user.company ? "text-gray-200" : "text-gray-500"
                      }
                    >
                      {user.company || "Contributor"}
                    </p>
                    <p
                      className={!user.bio ? "text-gray-200" : "text-gray-500"}
                    >
                      {user.bio || "User bio is not available"}
                    </p>
                    <p>
                      <a
                        href={user.html_url}
                        className="block hover:bg-gray-50"
                        target="_blank"
                        title="Visit GitHub Profile"
                      >
                        GitHub URL: {user.html_url}
                      </a>
                    </p>
                    {user.public_repos ? (
                      <p>Public repos: {user.public_repos}</p>
                    ) : (
                      ""
                    )}

                    {user.email ? <p>Email: {user.email}</p> : ""}
                    {user.twitter_username ? (
                      <p>Twitter: {user.twitter_username}</p>
                    ) : (
                      ""
                    )}

                    {user.blog ? <p>Blog: {user.blog}</p> : ""}
                  </div>
                </div>
              </div>
              {user.location ? (
                <div className="flex items-end text-sm text-gray-500 truncate">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    x-description="Heroicon name: solid/location-marker"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {user.location}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </li>
      )}
    </div>
  );
};

export default User;
