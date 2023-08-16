export const envOnPremise: boolean =
  process.env.REACT_APP_ON_PREMISE === "true" ? true : false;

export const envFrontendUrl: string = process.env.REACT_APP_FRONTEND_URL || "";

export const isProduction: boolean =
  process.env.NODE_ENV === "production" ? true : false;
