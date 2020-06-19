import axios from "axios";

export default axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/http://api.weatherstack.com",
  params: {},
});

export const defaultParams = {
  access_key: "ad1cb301e33bda6b58fe2b88916662ec",
};
