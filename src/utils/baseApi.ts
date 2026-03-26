const isDev = process.env.NODE_ENV === "development";

export const getEnv = (
  devKey: string,
  prodKey: string,
  name: string,
): string => {
  const value = isDev ? process.env[devKey] : process.env[prodKey];
  if (!value) {
    console.warn(
      `⚠ ${name} is not defined in environment variables, using fallback`,
    );
    return isDev
      ? "https://sharek-app-qatar-fjc3czhcenh0ftd8.qatarcentral-01.azurewebsites.net/api/v1"
      : "https://sharek-app-qatar-fjc3czhcenh0ftd8.qatarcentral-01.azurewebsites.net/api/v1";
  }
  return value;
};
// http://10.0.20.163:8080/api/v1
export const BASEAPI = (): string =>
  getEnv("NEXT_PUBLIC_BASEURL_DEV", "NEXT_PUBLIC_BASEURL_PROD", "Base API URL");

export const CLIENT_URL = (): string =>
  getEnv(
    "NEXT_PUBLIC_CLIENT_URL_DEV",
    "NEXT_PUBLIC_CLIENT_URL_PROD",
    "Client Public URL",
  );

export const AI_BASEAPI = (): string =>
  getEnv(
    "NEXT_PUBLIC_AI_BASEURL_DEV",
    "NEXT_PUBLIC_AI_BASEURL_PROD",
    "AI Backend URL",
  );
