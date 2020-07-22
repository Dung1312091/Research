let isRefreshing = false;
let refreshSubscribers = [];

const instance = axios.create({
  baseURL: Config.API_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 498) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshAccessToken().then((newToken) => {
          isRefreshing = false;
          onRefreshed(newToken);
        });
      }

      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          // replace the expired token and retry
          originalRequest.headers["Authorization"] = "Bearer " + token;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  }
);

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.map((cb) => cb(token));
}
