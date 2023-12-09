import config from "../config";

export const useHttpClient = () => {
  const httpGet = async <T>(params: { url: string }): Promise<T> => {
    const { url } = params;
    const headers = {
      "Content-Type": "application/json",
      "X-Master-Key": config.apiMasterKey,
      "X-Access-Key": config.apiAccessKey,
    };

    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    return await response.json();
  };

  return {
    httpGet,
  };
};
