// 👉🏻 https://linktr.ee/rifqiahmad.f

export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `${authToken}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );
}
