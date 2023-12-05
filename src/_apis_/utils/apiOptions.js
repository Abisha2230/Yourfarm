
export const apiOptions = async (
  {
    Tokens,
    params = {},
    url = "",
    method = "post",
    data,
}= {}) => {
    const options = {
      method: method.toLowerCase(),
      url: `${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      params,
    };
    if (Tokens) {
      options.headers["authorization"] = Tokens ;
    }
    switch (options.method) {
      case "post":
      case "patch":
      case "put":
        return {
          ...options,
          data,
        };
      case "delete":
      case "get":
      default:
        return options;
    };

};