import axios from "axios";

let headers = {
  authorization: `Bearer Wookie2021`,
};

const axiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_MOVIES || "https://wookie.codesubmit.io/movies",
  headers,
});

axiosInstance.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    //handle network problem
    //toast.error("Network is not available - check your connection");
  }
  const { status } = error.response;
  if (status === 404) {
    window.location.href = "/not-found";
  }
  if (status === 400) {
    //handle 400
  }
  if (status === 500) {
    //handle 500
  }
  throw error.response;
});

export default axiosInstance;
