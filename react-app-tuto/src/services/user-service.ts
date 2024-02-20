import create from "./http-service";

export interface User {
  name: string;
  id: number;
}

export default create("/user");

// // this interface is only about the users,
// // it should be here not in the component
// export interface User {
//   name: string;
//   id: number;
// }

// class UserServcie {
//   // in this methods, were gonna have the logic for
//   // sending an HTTP requests for our backend
//   getAllUsers() {
//     const controller = new AbortController();

//     // return apiClient.get<User[]>("/users", {...
//     // instead of returning only this promise method, we're gonna store it
//     // in an object called resuest, and return it in the end along with
//     // a cancel method, we call controller.abort() in this function
//     // like this the consumer will only use the cancel method only
//     // for canceling a request, how it happens in irrelevant, that's
//     // implementation details
//     const request = apiClient.get<User[]>("/users", {
//       signal: controller.signal,
//     });
//     return { request, cancel: () => controller.abort() };
//   }

//   addUser(user: User) {
//     return apiClient.post("/users", user);
//   }

//   updateUser(id: number, user: User) {
//     return apiClient.patch("/users/" + id, user);
//   }

//   deleteUser(id: number) {
//     return apiClient.delete("/users/" + id);
//   }
// }

// // export new instance of this
// // class as a default object
// export default new UserServcie();
