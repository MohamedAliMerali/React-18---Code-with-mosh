# Connecting to the Backend

As you have seen react is a library for building user-interfaces, or front-end, but also every app needs a back-end which is the part that runs on the server, it provides the business logic, data managment, and security features, such as authentication and authorization.

we have various language and frameworks to build back-end such as Express.js, Django, Ruby on Rails, Spring, ASP.NET Core and more, building backends is an entirely different topic and its outside the scope of this coures, but as a react developer you need to know how to connect your React apps to the backend, This is what this section is for.

## keywords:

    - Effect Hook
    - Effect Dependencies
    - Effect Clean up
    - unmounting
    - fetch / Axios
    - Axios.get
    - Axios.delete
    - Axios.post
    - Axios.put / Axios.patch
    - AxiosError
    - promise / asynchronous
    - catch
    - async / Await
    - as keyword
    - AbortController
    - CanceledError
    - finally
    - Optimistic/Pessimistic updates

# Understanding the Effect Hook

Before we talk about connecting our React apps to a backend, you need to understand how to use the effect hooks in React. Earlier I told you that our React components should be pure functions, a pure function should not have any side effects and should return the same result if begin with the same input.

Now, to make our functions or components pure, we have to keep any code that makes changes outside of the render phase, but There are situations where you might need to store some data in the local storage of the browser so we can remember it in the future. Or we may need to call the server to fetch or save the data or maybe want to manually modify DOM elements.

None of these situations are about rendering a component. They have nothing to do with returning some JSX markup. So where can we implement that? That's where the effect hook comes in, With the **`effect hook`** we can tell react hook to execute a piece of code after a component is rendered.

So here's an example, let's say when the app starts, we want to put focus on an input field, first we need to use the ref hook to get a reference to this input field, the type of the target element is an _HTMLInputElement_. we check if _ref.current_ is defined, then we call _ref.current.focus_.

```tsx
import { useRef } from "react";

function App() {
  const ref = useRef<HTMLInputElement>(null);

  // side effect
  if (ref.current) ref.current.focus();

  return (
    <div>
      <input type="text" className="form-control" />
    </div>
  );
}
```

Now here's the thing. This piece of code has nothing to do with returning some JSX markup with this piece of code, we are changing the state of the DOM. So we say this piece of code has a side effect, it's changing something outside of this component. So now our component is no longer a pure component, To make this a pure component, we can use the **`effect hook`**.

> **`effect hook`**: The Effect Hook lets you perform side effects in function components.

we call the **`useEffect`** and give it an arrow function then we move this piece of code that causes side effects inside this function.

    PS: Now the name is a little bit confusing, a lot of people hate it, it would be better if it was called after render.

So the function that we pass here will be called after each render. And this is an opportunity for us to write a piece of code that causes side effects. We can store something in the local storage, which are working with a DOM elements we can call the server and so on.

```tsx
import { useEffect, useRef } from "react";

function App() {
  const ref = useRef<HTMLInputElement>(null);

  // afterRunder
  useEffect(() => {
    // side effect
    if (ref.current) ref.current.focus();
  });

  return (
    <div>
      <input type="text" className="form-control" />
    </div>
  );
}
```

Now, there are a few things we need to know about the effect hook just like the state and ref hooks, **we can only call the effect hook** at the **top level of our components**. So we cannot call it inside loops or if statements and also similar to the ref and state hooks. We can call this multiple times for different purposes.

For example, right after, we can have another effect, in this function, perhaps we want to set the title of the document to My app. So here we have two different types of effects. One is about putting focus on a DOM element, the other is about setting the title of the document, these are two separate responsibilities.

```tsx
// afterRunder
useEffect(() => {
  // side effect
  document.title = "My App";
});
```

so, when we have multiple effects, react will run them in order after each render

# Effect Dependencies

This function that we pass to the effect hook gets executed after each render, but there are situations where we don't want this default behaviour.

    PS: you learned that the effect function gets executed after each render, if we update a state in it, which will triggers another render, we'll end up in an infinite loop of updating state, rendering and executing our effects.

    To solve this problem, we should tell react to run this effect only once the first time our component is rendered.

The effect function has a second argument which is optional. Here we pass an array of dependencies. In this array, we can add one or more variables which can be props or state, and our effect will be dependent on these values. If any of these values changes, we will rerender our effect, but if you pass an empty array that means this effect is not dependent on any values. So it will be executed only once.

```tsx
const [products, setProducts] = useState<string[]>([]);

useEffect(() => {
  console.log("Fetching products");
  setProducts(["Clothing", "Household"]);
}, []);
```

To see how we can use The effect function and update states, Let's say we want to add a drop on this on the top three categories. When the user selects a category, we want to show the products in that category.

    PS: We don't always have to exclusively use an interface. if we only have a single or a maximum of two props, we can declare them inline here.

```tsx
const ProductList = ({ category }: { category: string }) => {...
```

So back to the app component, we're going to add a select with 3 options, one empty, along with "clothing" and "household". we need to keep track of the selected category in a state variable, So when the state has changed, our product list is rerender.

```tsx
// Category component
import { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  // We refer to the fucntion that we pass here a callback function, because React is going to call this function back.
  useEffect(() => {
    console.log("Fetching products in ", category);
    setProducts(["Clothing", "Household"]);
  }, [category]);
  // Anytime the value of any of these dependencies(2nd arg to the effect func) changes, react will rerun our effect

  return <div>ProductList</div>;
};
```

```tsx
// App component
function App() {
  const [category, setCategory] = useState("");

  return (
    <div>
      <select
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} />
    </div>
  );
}

export default App;
```

So let's quickly recap. The second argument to the effect hook is dependencies, if you leave it out, react will execute our effect after every render. If we pass an empty array, react will execute our effect only once the first time our component is rendered. If you add one or more values here, which can be props or state variables. React will rerun our effect every time any of these values changes.

# Effect Clean Up

Sometimes the code that we pass to that effect hook doesn't need any cleanup, as we saw in a presvious example, we were simply setting the title of the document. But what if this was a chat component, and here we were connecting to a chat server. At some point, we need to disconnect from the chat circuit, For example, if the user navigates away from the chat page, we have to disconnect on the chat server. Let's see how we can do this.

we will create two functions, **connect** to simulate connecting to a chat server, and we need a function for disconnecting.

```tsx
const connect = () => console.log("Connecting");
const disconnect = () => console.log("disconnect");
```

In the effect hook, we call the Connect function. to provide cleanup code, we return a function, and in this function, we call our disconnect function, So the function that we pass to the front hook can optionally return a function for cleaning up. This is not always necessary, but if we need to do clean up, this is the way we do it.

```tsx
useEffect(() => {
  connect();

  return () => disconnect();
});
```

    PS: Generally. Speaking, our cleanup function should stop or undo whatever the effect was doing.

    Exp:

    - For example, if we are connecting or subscribing to something, our cleanup function should unsubscribe or disconnect.

    - As another example, if we are showing a model here, our cleanup function should hide the model or if they're fetching some data from the server here, our cleanup function should either abort the fetch or ignore the result.

Now let's see how this work, if we go back to the browser, we're getting three messages, _connecting_, _disconnecting_ and _connecting_.

So, In the development mode, with a strict mode turned on, react renders each component twice. So in this case, react renders our app component that's why we see the _connected_ message, but before react renders our app component the second time, first it's going to remove the component from the screen. This is called **`unmounting`**. So just like we can mount a painting on a wall, react mounts our components on the screen, and unmount them when they're no longer needed. So with this strict mode enable before react mounts our components for the second time, first it has to unmount it that is why our cleanup code is executed.

# Fetching Data

Now lets see how we can fetch data from the server, we're gonna use a fake backend called **JSONPlaceholder**, in this website we have various end-point to get dummy data.

To send a request to the server, we can use the **fetch** function that is implemented in all modern browsers, but a lot of people prefer to use a library called **axios**, so lets install this:

```cmd
npm i axios@1.3.4
```

in the app componenet we're going to fetch the list of users from JSON Placeholder, we import axios and then we use state hook to declare a state variable to store the users.

Next we need to use the effect hook, and this is where we're going to call the server, to do so we're going to call axios get method and pass the @ or the url of an end-point.

Now, because calling the server isn't going to happen immediately, it may take some time, this method will return a promise.

```tsx
useEffect(() => {
  axios.get("https://jsonplaceholder.typicode.com/users");
});
```

> PS: a **Promise** is an object that holds the eventual result or failure of an asynchronous operation.
>
> **asynchronous**: a fancy term for an operation that is gonna take a long time, in other words, it means that a process operates independently of other processes.

all promises have a method called **then**, we can call it right after and give it a callback function, this callback function will get executed when our promise is resolved and the result is ready, in this case we need to find a fucntion that has a parameter called _res_ or _response_.

now to see the result we can simply use console.log, u may notice that we have no auto completion, Here we can use TypeScript to add auto completion and type safety to our code using an interface, so we don't access invalid properties, we can only add the properties that we are interested in, we don't need to type them all if we're not gonna use them.

```tsx
interface User {
  id: number;
  name: string;
}
```

After that, when calling the get method, we specify in angle bracket the type of data we're going to fetch.

```tsx
axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
```

After fetching the data we're gonna set our users var to the fetched users data, be aware that u may face an issue here, because we initialized the users with an empty array so TS compiler doesn't know the type of objects we're going to store here, we need to specify the type of the array.

```tsx
const [users, setUsers] = useState<User[]>([]);
// .
// .
axios.get<User[]>("https://jsonplaceholder.typicode.com/users").then((res) => {
  setUsers(res.data);
});
```

Do not forget to add an empty array as a dependencie for the effect function, it is very important, otherwise, as we saw earlier we'll end up in an infinite loop and send the server hundred of requests.

```tsx
useEffect(() => {
  axios
    .gett<User[]>("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      setUsers(res.data);
    });
}, []);
```

Now, with the final step, we're going to render the users list, here's the final code:

```tsx
import axios from "axios";
import { useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

# Understanding HTTP Requests

As a front-end developer , it's important that u'll understand what happend under the hood when you call the get method, and thats what we're gonna talk about in this lesson.

When we call the get method, axios sent an HTTP (hypertext transfer protocol) request to the server, it's a protocol to transfer data over the internet.

if you go to the network tab in developer mode in your browser, you can filter for axios requests by clicking on **Fetch/XHR**, XHR means XML HTTP request, you'll find the request to the user endpoint, the status will be 200 which means successful.

    PS: In HTTP every request and every response has 2 sections, headers when we specify the Metadata and the body where we supply or get the data.

if you click on that request u'll see more details, in the headers tab you'll find some general headers like request url(end-point), request method which is set to _GET_ in here, u'll find status code, remote address.

We also have response headers, which are the headers included in the repsonse that we don't have to worry about now.

In the preview tab we can see the data returned from the server properly formated, and in the response tab we see the body of the response sent from the server in plain text.

# Handling errors

When calling the server many things can go wrong, perhaps our network may drop out or the server is gonna go offline and so on, as a good developer u need to anticipate such problems and handle error properly.

In JS all promisses have a method called **catch** that we can use for catching errors, we give it a callback function so it gets executed if something goes wrong while fetching the data, this function should take an error object, you can log that on the console, you can simulate an error by changing the url so you can see the error object.

```tsx
useEffect(() => {
  axios
    .get<User[]>("https://jsonplaceholder.typicode.com/XD<= users")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => console.log(err));
}, []);
```

In this case u'll get an **AxiosError** object, in this object we have properties such as **code** which is set to bad request "ERR_BAD_REQUEST", as well as **config**, **message**, **name**, **request** and **response**.

Using this object we can show an error message to the user:

```tsx
import axios from "axios";
import { useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
```

# Working with async and await

we can write this code in kinda more linear way, using async and awit.

    PS: What is async and await in JavaScript?

    async and await are two keywords that can help make asynchronous read more like synchronous code. This can help code look cleaner while keeping the benefits of asynchronous code.

The get method returns a promise, if this promise is resolved, we'll get a response object, if the promise is rejected we get an error, so lets see how we can rewrite this code without using _then_ and _catch_ methods

<!-- // get -> promise -> res/err -->

In JS if we have a promise, we can put the **await** keyword in front of the promise to get the result, so we can await the promise we're getting from the **get** method to get the response object.

```tsx
const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState("");

useEffect(() => {
  const res = await axios
    .get<User[]>("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => setError(err.message));
}, []);
```

we will have a compilation error saying "**'await' expression are only allowed within async function and at the top levels of modules.**", So in order to use it here we need to mark the containing function as async.

Now we'll get another kind of error because it doesn't allow us to pass an **asynch** function to the effect hook, to work around this, we need to remove the async keyword and defined an async function inside the function that we passed to the effect hook, then we move our line up inside the function, so we await the promise, then we got a response, then we call setUsers and pass response.data.

we call that function right after...

```tsx
const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState("");

useEffect(() => {
  const fetchUsers = async () => {
    const res = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    setUsers(res.data);
  };

  fetchUsers();
}, []);
```

This was the happy path, if the promise is resolved, what if our promise was rejected, for that we need to wrap the axios call in try catch block, and just like before, in case of an error we call setError and pass the error message.

But we will have an error saying "'err' is of type 'unknown'", so the TS compiler cannot tell the type of **error** object, the problem is we cannot annotate the _err_ object in the catch block, we cannot set it to **AxiosError**, bcs type annotation is not allowed in a **catch block**, to work around this, we have to wrap this _err_ in parenthesis then we use **as** keyword to tell the TS compiler the type of that object, that is going to be **`AxiosError`**.

```tsx
const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState("");

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/usersqq"
      );
      setUsers(res.data);
    } catch (err) {
      console.log((err as AxiosError).message);
      setError((err as AxiosError).message);
    }
  };

  fetchUsers();
}, []);
```

    PS: there is a fair amount of extra work in here, you may want to use the first one, feel free to do so...

# Canceling a Fetch request

We talked before about effect clean-up, sometimes we need to return a cleanup function from our effect, in this example we're sending an HTTP request to the server to fetch the users, now what if the user navigates away from this page? we don't wanna wait for the server to return the data and then render it here.

So as a best practise when we fetch data in an effect we should also provide a clean-up function for cancelling the fetch request in case the data is no longer needed, to do that, here we need to creat an object called **controller** and set it to an instance of **AbortController()**, that's a built-in class in modern browsers that allows us to cancel or abort asynchronous operations, like fetch request or DOM manipulations or any operation that may take a long time to complete.

when we call the get method, as a second argument we pass a request configuration object, in this object we set the **signal** property to **controller.signal**, and finally, at the end we return our clean-up function, in this one we call **controller.abort()**.

If we check our component, we'll find a _canceled_ message, which is ugly, to remove this we will add a block of code to the callback function in the catch part, first we check if the error object is an insatnce of **CanceledError** that is defined in the axios module, if so we return immediately, otherwise we set the error to **err.message**.

```tsx
const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState("");

useEffect(() => {
  const controller = new AbortController();

  axios
    .get<User[]>("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
    });

  return () => controller.abort();
}, []);
```

# Showing a loading indicator

To show a loading indicator while fetching the data, first we need to use the state hook to declare a state variable, we initialize it to false and call it is loading.

Just before we call the server, we set loading to true to show the loader, and then when ur done we should set it back to false so the loader is hidden.

you shouldn't do it outside of the sercer call because its an asynchronous operation
which means, non-blocking, so the call function not gonna block the execution of the code so it will move immedietly to the next line and we'll end-up hiding the loader, instead, the loader should be hiding when the promise is seteled, whether is resolved or rejected.

we can do this in our callbacks(and it doesn't matter the order because react will reload when all updates are applied), but we'll end up repeating the code twice which isn't the best practise, or we can use the **finally** method, this one will called always whether our promise is resolved or not. However, this won't work with the strict mode turned on

```tsx
const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
  const controller = new AbortController();

  setLoading(true);
  axios
    .get<User[]>("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
    .then((res) => {
      setUsers(res.data);
      // setLoading(false);
    })
    .catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
      // setLoading(false);
    })
    .finally(() => {
      // this won't work in strict mode, use the other lines
      setLoading(false);
    });

  return () => controller.abort();
}, []);
```

The last part is showing the loader, in the markup, right above the ul element we're going to add a div with the class of **spinner-border**, that's a bootstrap class for showing a spinner, we will render this only when **isLoading** is true.

```tsx
return (
  <>
    {error && <p className="text-danger">{error}</p>}
    {isLoading && <div className="spinner-border"></div>}
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </>
);
```
