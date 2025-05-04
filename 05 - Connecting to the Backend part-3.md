# Extracting a Reusable API Client

Our code lately has grown quite a bit, it needs some improvments, that's what we're going to do over the few next lessons.

The first issue is the duplication with the backend url, to improve this we're going to create a separate module where we store our different configuration settings for making HTTP calls.

We add new folder called **services** in src folder, in this module we're going to add basic modules that provide services or functionalities to our application, The servecies are not about the UI, they're about functionality. we add a TS file called **api-client.ts**.

In this file we're going to create new access client with a custom configuration.

PS: when grabbing the URL leave the user out of the url so this URL can be reusable, maybe in other components we need to hit other end-points.

We can optionally set HTTP headers (ts object '{...}'), this headers will be passed with every HTTP request, sometimes it's necessary, for exp some back-ends require us to send an API key with every HTTP request, if there is such a requirement we can pass an api key here and set it to some value.

Back to our App component, we remove the axios import and we export our **apiClient**, with this service in place we can remove all axios references. we go back to our apiClient and import **CanceledError**, and then export it as a name object.

```tsx
import axios, { CanceledError } from "axios";

// we call create method and give it a configuration object
// in this object we set basic url to the url of our backend
export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export { CanceledError };
```

Now the final step, everywhere we have a reference to axios, we replace that with **apiClient**. Using this apiClient, we send a request to the users end-point.

With this service in place, anywhere we want to talk to our back-end, we simply import the **apiClient** and sent HTTP requests.

# Extracting the user service

The next issue in this code is that our component is too concerned with making HTTP request, for exp it knows about the requests methods, endpoint(which is repeated in many places) and the **AbortController** which is only about HTTP.

Our component is like a chef, which is also responsible for shopping the ingrediants, he should not consider with shopping, they should only focus on theire primary responsibilty.

Our component also should focus only about his primary responsability, which is returning markeup and handling user interaction at a high level. so in order to improve this code, we should extract all the logic around making HTTP requests, into a seperate service, this allow us to seperate concers and make our code more modular and reusable, potentially we can reuse this service in other components.

**First**, in the services folder we add a new file called **user-service.ts**, inside this we create a class with all the functionalities we need. Check the code below:

```tsx
// user-service.ts
import apiClient from "./api-client";

// this interface is only about the users,
// it should be here not in the component
export interface User {
  name: string;
  id: number;
}

class UserServcie {
  // in this methods, were gonna have the logic for
  // sending an HTTP requests for our backend
  getAllUsers() {
    const controller = new AbortController();

    // return apiClient.get<User[]>("/users", {...
    // instead of returning only this promise method, we're gonna store it
    // in an object called request, and return it in the end along with
    // a cancel method, we call controller.abort() in this function
    // like this the consumer will only use the cancel method only for
    // canceling a request, how it happens is irrelevant, that's implementation details
    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  addUser(user: User) {
    return apiClient.post("/users", user);
  }

  updateUser(id: number, user: User) {
    return apiClient.patch("/users/" + id, user);
  }

  deleteUser(id: number) {
    return apiClient.delete("/users/" + id);
  }
}

// export new instance of this
// class as a default object
export default new UserServcie();
```

```tsx
import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import UserService, { User } from "./services/user-service";
import userService from "./services/user-service";
.
.
.
// component
useEffect(() => {
  setLoading(true);
  // this return a promise
  const { request, cancel } = UserService.getAllUsers();

  request
    .then((res) => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
      setLoading(false);
    });
  // .finally(() => {
  //   // this won't work in strict mode, use the other lines
  //   setLoading(false);
  // });

  return () => cancel();
  // here we should return a controller object, which is about HTTP req
  // To hide the complexity, we should return such a function from
  // user-service, we won't import it in order to hide the complexity.
  // return () => controller.abort();
}, []);

const deleteUser = (user: User) => {
  const originalUsers = [...users];
  // we're setting the users first, Optimistic Updates
  // we pass all the users except the given one
  setUsers(users.filter((u) => u.id !== user.id));

  userService.deleteUser(user.id).catch((err) => {
    setError(err.message);
    setUsers([...originalUsers]);
  });
};

const addUser = () => {
  // we're setting the users first, Optimistic Updates
  const originalUsers = [...users];
  const newUser = { id: 0, name: "whatDidUJustSay!" };
  setUsers([newUser, ...users]);

  userService
    .addUser(newUser)
    .then((res) => {
      setUsers([res.data, ...users]);
      console.log("DONE");
    })
    .catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
};

function updateUser(user: User): void {
  const originalUsers = [...users];
  const updatedUser = { ...user, name: user.name + "!" };

  setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

  userService.updateUser(user.id, updatedUser).catch((err) => {
    setError(err.message);
    setUsers([...originalUsers]);
  });
}
```

With those changes, our component knows nothing about our HTTP request, it's more modular and reusable, we have better separation of concerns and we can use it anywhere to those sorts of stuff.

# Creating a Generic HTTP Service

Our user service class encapsulate all the logic for making http requests, if we create another service class for post for exp, it will be almost identical, the only difference is the end-points and the objects that we sent to the server, we can use TypeScript magic to create a generic Http service class.

we create a new file called `http-service.ts`, we past all the code from our `user-service.ts` and paste it in our new file. next we'll modify the code line by line, anywhere we have a ref to user, we should either remove it or make it generic.

        PS: `T` in this context is called a generic type parameter it is a place holder for a type, when calling this method, we supply a generic type arguments like: getAll<User>.

        PS: when supplying the end-point, you can pass it as a parameter, but like that the consumer of the class has to provide the end-point, we don't want that, so we're using a property called `endPoint` then we make a constructor with a parameter `endPoint`.

```tsx
import apiClient from "./api-client";

// we add a constraint to tell TS compiler that our type T
// should have a property called id using an interface
interface Entity {
  id: number;
}

// `HttpService` instead of `UserService`
class HttpService {
  endpoint: string;

  // we're supplying the end-point here when we create
  // a new instance of this class
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // we rename this function, and all other function to make it more generic, for exp getAllUSers => getAll / DeleteUser => Delete ...
  getAll<T>() {
    // we should replace `user` with a generic type parameter
    // ``T`` in this context is called a generic type parameter
    // it is a place holder for a type, when calling this method, we supply a generic type arguments like: getAll<User>
    //
    // whatever we passed when calling getAll methods
    // will be used in here
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  // we make similair chnages with other methods in this class
  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    // entity instead of user, that's more generic
    // also we should change the type to `T`
    // so we need to add `T` as generic type parameter
    return apiClient.post(this.endpoint, entity);
  }

  // we add a constraint to tell TS compiler that our type T
  // should have a property called id using an interface
  //
  // we extends the `T` generic parameter from Entitiy
  // because Ts compiler doesn't know that our entity, which are intance
  //  of type `T` have a property called id.
  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }
}

// we don't wanna create a new instance of this class because we
// have to pass an end point here, we don't wanna hard code an end-point
// otherwise our class won't be reusable, here's what we should do
//
// we should create a function for creating an instance of this class
// here's how:
const create = (endpoint: string) => new HttpService(endpoint);

export default create;

// we do this instead of the old way:
// export default new UserServcie();
```

Now, we're going to delete the user service entirely and import the create fucntion of the `http-service` model, this will be the only place you provide the end-point.

```tsx
import create from "./http-service";

export interface User {
  name: string;
  id: number;
}

export default create("/user");
```

we'll have some errors in our app component, since we modified all the function.

we'll also have a compilation error, bcs Ts compiler doesn't know the type of objects we're going to fetch. we defined earlier the `getAll` method as generic, so when calling this mehtod, we should specify the type of objects we're going to fetch from the server.

# Creating a custom Data Fetching Hook
