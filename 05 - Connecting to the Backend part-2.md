# Deleting data

We're going to add button to delete the data, we're adding some bootstrap classes to customize the list.

    PS: to add some spaces between elements you need to use: {" "}
    Otherwise it won't work.

To delete the data we have two options:

- **Optimistic Updates:** we update the UI first then we call the server to save the changes, Here we are optimistic that the call to the server is gonna succeed most of the time so we update the user first to give the user instant feedback, and then we call the server to persist the changes
- **Pessimistic Updates:** We assume that the call to the server is gonna fail, so first we call the server and wait for the result, if the call is successful, then we update the UI, with this approach our UI may feel a little bit slow, so when possible it's better to use optimistic update.

To delete it we use the delete method and give it the url + the user id, this will return a promise, but there is nothing you wanna do after the promise is resolved, so we weont call **then** method, we're only gonna cal **catch** method to catch potential errors, we should set an error message and restore the UI to the original state.

```tsx
const deleteUser = (user: User) => {
  const originalUsers = [...users];
  // we're setting the users first
  // we pass all the users except the given one
  setUsers(users.filter((u) => u.id !== user.id));

  axios
    .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
    .catch((err) => {
      setError(err.message);
      setUsers([...originalUsers]);
    });
};
```

```tsx

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul className="list-group">
        {users.map((user) => (
          // li is a flex container here
          // one of the utility classes in bootstrap,
          // d is short for display
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

# Creating data

We're adding a button and making some changes to add a user. If the call is successful, we should update our list with the saved user because the new user has an id that is going to be generated on the server.

    PS: one thing you need to know about this backend, its a fake one, so if you sent same requests multiple time, we will get a suer with the id of 11 everytime, and that means if we add another user, we'll get an error in the console.

In case we had an error, we should show an error message to the user, and
restore our list back to the original state, we can use a simple constant variable for this.

    PS: You may be wondering, why did we update the state twice with the newUser? doesn't that mean the newUser will be duplicated? well, here's what you need to know:

    React update state asynchronously, Meaning of this is not immediately, it will be applied in the futur, Because as part of handling an events we could set multiple states, if React re-render the component every time we set a new one, we will end-up with too many unecessary re-renders.

    So for performance reasons, React take all of this updates, matches them and apply them later, after the event handler finishes execution. at that point, react update all states and re-render the component.

```tsx
const addUser = () => {
  // we're setting the users first, Optimistic Updates
  const originalUsers = [...users];
  const newUser = { id: 0, name: "whatDidUJustSay!" };
  setUsers([newUser, ...users]);

  axios
    .post("https://jsonplaceholder.typicode.com/users", newUser)
    .then((res) => {
      setUsers([res.data, ...users]);
      console.log("DONE");
    })
    .catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
};
// .
// .
// .
// The Add button
<button className="btn btn-primary mb-3" onClick={() => addUser()}>
  Add
</button>;
```

# updating data

To update the users, we have 2 methods, we can use the **put** or the **patch** method, the difference is, in HTTP we use the put method to replace an object and tha patch method for patching or updating one or more of its properties, the method we choosed depends on how the back-end is build, some backedns don't support the batch method, they only support the put method.

in this case we're using **patch method** because we're updating one single property

```tsx
function updateUser(user: User): void {
  const originalUsers = [...users];
  const updatedUser = { ...user, name: user.name + "!" };

  setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

  axios
    .patch("https://jsonplaceholder.typicode.com/users/" + user.id, updatedUser)
    .catch((err) => {
      setError(err.message);
      setUsers([...originalUsers]);
    });
}
```

```tsx
{
  /* we're adding this div to keep both buttons together on the right side */
}
<div>
  <button className="btn btn-secondary mx-2" onClick={() => updateUser(user)}>
    Update
  </button>
  <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>
    Delete
  </button>
</div>;
```

# catching-up with the code

```tsx
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

// ///////////////////////////////////////////////////////////////////////////
interface User {
  name: string;
  id: number;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
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

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    // we're setting the users first, Optimistic Updates
    // we pass all the users except the given one
    setUsers(users.filter((u) => u.id !== user.id));

    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers([...originalUsers]);
      });
  };

  const addUser = () => {
    // we're setting the users first, Optimistic Updates
    const originalUsers = [...users];
    const newUser = { id: 0, name: "whatDidUJustSay!" };
    setUsers([newUser, ...users]);

    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
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

    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers([...originalUsers]);
      });
  }

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={() => addUser()}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          // li is a flex container here
          // one of the utility classes in bootstrap, d is short for display
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            {/* we're adding this div to keep both buttons together on the right side */}
            <div>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
```
