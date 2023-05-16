import React, { createContext, useEffect, useState } from "react";
import queryString from "query-string";
import { IGithubToken } from "../interfaces/githubInterfaces";
import { useKeycloak } from "@react-keycloak/web";
import { toast } from "sonner";
import { useAppDispatch } from "../hooks/redux";
import {
  getGithubAccessTokenwithCode,
  getGithubAccessTokenwithRefreshToken,
} from "../resources/GithubSlice";
export const GithubContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const dispatch = useAppDispatch();
  const { keycloak } = useKeycloak();
  const queryParams = queryString.parse(window.location.search);
  const [githubToken, setGithubToken] = useState<IGithubToken | null>(() => {
    if (
      JSON.parse(localStorage.getItem("githubTokens") as any) &&
      JSON.parse(localStorage.getItem("githubTokens") as any)?.exp <=
        Math.floor(Date.now() / 1000) - 600 &&
      JSON.parse(localStorage.getItem("githubTokens") as any)?.userId !==
        keycloak?.tokenParsed?.githubApp
    ) {
      return null;
    }
    return JSON.parse(localStorage.getItem("githubTokens") as any);
  });

  useEffect(() => {
    if (keycloak?.tokenParsed?.githubApp && !githubToken && queryParams?.code) {
      getGithubAppToken();
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (keycloak?.tokenParsed?.githubApp && !githubToken) {
      getGithubAppCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("githubTokens", JSON.stringify(githubToken));
    const tokenExpriationTimer =
      githubToken &&
      keycloak?.tokenParsed?.githubApp &&
      setTimeout(() => {
        handleRefreshToken();
      }, (githubToken?.exp - Math.floor(Date.now() / 1000) - 900) * 1000);
    return () => clearTimeout(tokenExpriationTimer || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [githubToken]);

  function getGithubAppCode() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_APP_CLIENT_ID}`;
  }

  function getGithubAppToken() {
    dispatch(
      getGithubAccessTokenwithCode({
        code: queryParams.code,
        githubUserId: keycloak?.tokenParsed?.githubApp,
      })
    ).then((response: any) => {
      setGithubToken(
        !response?.payload?.data?.error
          ? {
              exp:
                response.payload.data.expires_in +
                Math.floor(Date.now() / 1000),
              ...response.payload.data,
            }
          : null
      );
      toast.message(
        !response?.payload?.data?.error
          ? "Github App Auth successfull."
          : "Github App Auth failed. Please sign in your's github account."
      );
    });
  }

  function handleRefreshToken() {
    dispatch(
      getGithubAccessTokenwithRefreshToken({
        refresh_token: githubToken?.refresh_token,
      })
    )
      .then((response: any) => {
        if (!response?.payload?.data?.error) {
          setGithubToken({
            exp:
              response?.payload?.data.expires_in +
              Math.floor(Date.now() / 1000),
            ...response?.payload?.data,
          });
          console.log("githubTokenRenewed");
        } else {
          getGithubAppCode();
        }
      })
      .catch((error) => {
        getGithubAppCode();
      });
  }

  return (
    <GithubContext.Provider
      value={{
        githubToken,
        githubAuth: githubToken?.access_token ? true : false,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
