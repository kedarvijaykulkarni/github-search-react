import axios from "axios";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components";

const Profile = () => {
  const navigate = useNavigate();
  let { username } = useParams();
  const [gitHubUser, setGithubUser] = useState({
    profile: {
      id: 0,
      avatar_url: "",
      login: "",
      name: "",
      bio: "",
      type: "",
      created_at: "",
    },
    followers: [
      {
        id: 0,
        avatar_url: "",
        login: "",
        name: "",
      },
    ],
    repos: [
      {
        id: 0,
        name: "",
        html_url: "",
        language: "",
      },
    ],
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const [profile, followers, following, repos] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/users/${username}/followers`),
          axios.get(`https://api.github.com/users/${username}/following`),
          axios.get(`https://api.github.com/users/${username}/repos`),
        ]);

        setGithubUser({
          profile: profile.data,
          followers: followers.data,
          following: following.data,
          repos: repos.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [username]);

  // console.log(username);
  // console.log(gitHubUser);

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          {/*<!-- Left Side -->*/}
          <div className="w-full md:w-3/12 md:mx-2">
            {/*<!-- Profile Card -->*/}
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src={gitHubUser.profile.avatar_url}
                  alt={gitHubUser.profile.login}
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {gitHubUser.profile.name}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                {gitHubUser.profile.login}
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {gitHubUser.profile.bio}
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">
                    {Moment(gitHubUser.profile.created_at).format("LL")}
                  </span>
                </li>
              </ul>
            </div>
            {/*<!-- End of profile card -->*/}
            <div className="my-4"></div>
            {/*<!-- Friends card -->*/}

            {gitHubUser.profile.type === "User" && (
              <div className="bg-white p-3 hover:shadow">
                <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                  <span className="text-green-500">
                    <svg
                      className="h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span>Followers ({gitHubUser.followers.length || 0})</span>
                </div>
                <div className="grid grid-cols-3">
                  {gitHubUser.followers.map((follower) => (
                    <div className="text-center my-2" key={follower.id}>
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src={follower.avatar_url}
                        alt=""
                      />
                      <Link
                        to={`/profile/${follower.login}`}
                        className="text-main-color"
                      >
                        {follower.login}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/*<!-- End of friends card -->*/}
          </div>
          {/*<!-- Right Side -->*/}
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/*<!-- Profile tab -->*/}
            {/*<!-- About Section -->*/}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </span>
                <span className="tracking-wide">Repositories</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  {gitHubUser.repos.map((repo) => (
                    <div
                      className="grid grid-cols-2 border-b hover:bg-sky-100"
                      key={repo.id}
                    >
                      <div className="px-4 py-2 font-semibold">
                        <h6>{repo.name}</h6>
                        <p>
                          <small>{repo.language ? repo.language : "-"}</small>
                        </p>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          className="text-teal-600"
                        >
                          Check on GitHub
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/*<!-- End of about section -->*/}
            <div className="w-full h-64 pt-6">
              <button
                onClick={() => navigate(-1)}
                className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
              >
                Go back search results
              </button>
            </div>

            <div className="my-4"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
