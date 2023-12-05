export const getToken = async () => {
    const appStorage = localStorage;
    return appStorage.getItem("Token").useAuth;
  };