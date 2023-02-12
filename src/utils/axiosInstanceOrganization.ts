import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const axiosInstanceOrganization: any = axios.create({});

axiosInstanceOrganization.interceptors.request.use(async (req: any) => {
  req.baseURL = process.env.REACT_APP_BACKEND_URL;
  // @ts-ignore
  let token: any = JSON.parse(localStorage.getItem("authTokens_organization"));
  let currentUser: any = jwt_decode(token.idToken);
  let expired: any = dayjs.unix(currentUser.exp).diff(dayjs()) < 1;

  if (!expired) {
    req.headers.Authorization = `Bearer ` + token.idToken;
    return req;
  } else {
    const response = await axios.post(
      `${req.baseURL}/refreshTokenOrganization`,
      {
        loginRequest: {
          refreshToken: token.refreshToken,
          organization: token.organization,
        },
      }
    );
    localStorage.setItem(
      `authTokens_organization`,

      JSON.stringify(response.data.responseRefreshToken.data)
    );
    req.headers.Authorization =
      `Bearer ` + response.data.responseRefreshToken.data.idToken;
    console.log("authTokens_organization Renewed");

    return req;
  }
});

export default axiosInstanceOrganization;
