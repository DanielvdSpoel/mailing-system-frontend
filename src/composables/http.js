import axios from "axios";
import router from "@/router";
import { useErrorStore } from "@/stores/errors.js";
import { useUserStore } from "@/stores/user.js";
import { useNotificationStore } from "@/stores/notifications";

const http = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const token = useUserStore().token;
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    console.log("Error catched!");
    if (!error.response) {
      await router.push("/error?status=503");
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 422 && error.response.data.errors) {
      useErrorStore().setFormErrors(error.response.data.errors);
    }

    if (error.response.status === 401) {
      await useUserStore().setToken(null);
      await router.push("/login");
    }
    //todo catch unauthenicated error

    //Show error toast
    if (error.response.data.message) {
      useNotificationStore().addNotification({
        message: error.response.data.message,
        type: "danger",
        duration: 4000,
      });
    }
    return Promise.reject(error);
  }
);

export default http;
