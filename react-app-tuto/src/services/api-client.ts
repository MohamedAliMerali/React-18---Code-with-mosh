import axios, { CanceledError } from "axios";

// we call create method and give it a configuration object
// in this object we set basic url to the url of our backend
export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export { CanceledError };
