import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const axiosInstance: any = axios.create({});

axiosInstance.interceptors.request.use(async (req: any) => {
  req.baseURL = process.env.REACT_APP_BACKEND_URL;
  // @ts-ignore
  let token: any = JSON.parse(localStorage.getItem("authTokens"));
  let currentUser: any = jwt_decode(token.idToken);
  let expired: any = dayjs.unix(currentUser.exp).diff(dayjs()) < 1;

  if (!expired) {
    req.headers.Authorization = `Bearer ` + token.idToken;
    return req;
  } else {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/refreshToken`,
      {
        loginRequest: {
          refreshToken: token.refreshToken,
        },
      }
    );
    console.log("AUTHTOKENS AXİOS RESPONSE", response);

    localStorage.setItem(
      `authTokens`,
      JSON.stringify(response.data.responseRefreshToken.data)
    );
    req.headers.Authorization =
      `Bearer ` + response.data.responseRefreshToken.data.idToken;

    console.log("authTokens Renewed");
    return req;
  }
});

export default axiosInstance;
