const config = {
  apiUrl: "https://api.jsonbin.io/v3/b",
  apiMasterKey: `${process.env.REACT_APP_X_MASTER_KEY}` ?? "",
  apiAccessKey: `${process.env.REACT_APP_X_ACCESS_KEY}` ?? "",
};

export default config;
