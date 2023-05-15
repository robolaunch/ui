import React, { createContext, useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import { IGithubToken } from "../interfaces/githubInterfaces";
import { useKeycloak } from "@react-keycloak/web";
export const GithubContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const { keycloak } = useKeycloak();

  const [githubToken, setGithubToken] = useState<IGithubToken | null>(() => {
    console.log();

    if (
      JSON.parse(localStorage.getItem("githubTokens") as any) &&
      JSON.parse(localStorage.getItem("githubTokens") as any)?.exp <=
        Math.floor(Date.now() / 1000) - 600 &&
      JSON.parse(localStorage.getItem("githubTokens") as any)?.userId !==
        keycloak?.tokenParsed?.githubApp
    ) {
      return null;
    } else {
      return JSON.parse(localStorage.getItem("githubTokens") as any);
    }
  });
  const queryParams = queryString.parse(window.location.search);

  useEffect(() => {
    if (!githubToken && keycloak?.tokenParsed?.githubApp) {
      if (queryParams?.code) {
        getGithubAccessTokenwithCode();
      } else {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_APP_CLIENT_ID}`;
      }
    } else {
      // window.history.pushState({}, "", "/");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const tokenExpriationTimer =
      githubToken &&
      keycloak?.tokenParsed?.githubApp &&
      setTimeout(() => {
        getGithubAccessTokenwithRefreshToken();
      }, (githubToken?.exp - Math.floor(Date.now() / 1000) - 900) * 1000);
    return () => clearTimeout(tokenExpriationTimer || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          githubUserId: keycloak?.tokenParsed?.githubApp,
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
          console.log("gettoken", response);
          setGithubToken({
            exp: response.data.expires_in + Math.floor(Date.now() / 1000),
            ...response.data,
          });
          console.log("githubTokenReceived");
        }
      })
      .catch((error) => {
        setGithubToken(null);
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
        githubAuth: githubToken?.access_token ? true : false,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
