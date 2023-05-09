import React, { createContext, useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import { IGithubToken } from "../interfaces/githubInterfaces";
export const GithubContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [githubToken, setGithubToken] = useState<IGithubToken | null>(
    JSON.parse(localStorage.getItem("githubTokens") as any)?.exp <=
      Math.floor(Date.now() / 1000) - 600
      ? null
      : JSON.parse(localStorage.getItem("githubTokens") as any)
  );
  const queryParams = queryString.parse(window.location.search);

  useEffect(() => {
    if (!githubToken) {
      if (queryParams?.code) {
        getGithubAccessTokenwithCode();
      } else {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_APP_CLIENT_ID}`;
      }
    } else {
      // window.history.pushState({}, "", "/");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const tokenExpriationTimer =
      githubToken &&
      setTimeout(() => {
        getGithubAccessTokenwithRefreshToken();
      }, (githubToken?.exp - Math.floor(Date.now() / 1000) - 900) * 1000);
    return () => clearTimeout(tokenExpriationTimer || 0);
  }, [githubToken]);

  useEffect(() => {
    console.log(githubToken);
    localStorage.setItem("githubTokens", JSON.stringify(githubToken));
  }, [githubToken]);

  function getGithubAccessTokenwithCode() {
    axios
      .post(
        "http://localhost:8081/getGithubAccessTokenwithCode",
        {
          code: queryParams.code,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (!response?.data?.error) {
          setGithubToken({
            exp: response.data.expires_in + Math.floor(Date.now() / 1000),
            ...response.data,
          });
          console.log("githubTokenReceived");
        } else {
          window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_APP_CLIENT_ID}`;
        }
      })
      .catch((error) => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_APP_CLIENT_ID}`;
      });
  }

  function getGithubAccessTokenwithRefreshToken() {
    axios
      .post(
        "http://localhost:8081/getGithubAccessTokenwithRefreshToken",
        {
          refresh_token: githubToken?.refresh_token,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (!response?.data?.error) {
          setGithubToken({
            exp: response.data.expires_in + Math.floor(Date.now() / 1000),
            ...response.data,
          });

          console.log("githubTokenRenewed");
        } else {
          window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_APP_CLIENT_ID}`;
        }
      })
      .catch((error) => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_APP_CLIENT_ID}`;
      });
  }

  return (
    <GithubContext.Provider
      value={{
        githubToken,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
