import React, { createContext, useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";

export const GithubContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const queryParams = queryString.parse(window.location.search);

  function handleGetGithubAccessToken() {
    axios
      .post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: process.env.REACT_APP_GITHUB_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_GITHUB_APP_CLIENT_SECRET,
          code: queryParams.code,
          redirect_uri: process.env.REACT_APP_GITHUB_APP_REDIRECT_URI,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log(queryParams?.code ? true : false, queryParams?.code);
    if (queryParams?.code) {
      handleGetGithubAccessToken();
    }
  }, [queryParams]);

  return <GithubContext.Provider value={{}}>{children}</GithubContext.Provider>;
};
