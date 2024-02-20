//
// import ListGroup from "./components/ListGroup";
//
// that's ugly, we can use index.ts file instead
// import ListGroup from "./components/ListGroup/ListGroup";
//
// import Alert from "./components/Alert";
// import ListGroup from "./components/ListGroup";
// import Message from "./Message";

import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import UserService, { User } from "./services/user-service";
import userService from "./services/user-service";

// import Form from "./components/expense-tracker/components/Form";
// import Filter from "./components/expense-tracker/components/Filter";
// import ExpTable from "./components/expense-tracker/components/ExpTable";
// import { useState } from "react";
// import { FieldValues } from "react-hook-form";

// // ///////////////////////////////////////////////////////////////////////////

// function App() {
//   const [category, setCategory] = useState("");
//   const [expenses, setExpenses] = useState([
//     { id: 0, description: "Milk", amount: 5, category: "groceries" },
//     { id: 1, description: "Movie", amount: 25, category: "entertainment" },
//     { id: 2, description: "Sledge Hammer", amount: 50, category: "utilities" },
//     { id: 3, description: "Paint", amount: 34, category: "utilities" },
//   ]);

//   const handleFormSubmit = (data: FieldValues) => {
//     const newExpense = { id: expenses[expenses.length - 1].id + 1, ...data };
//     console.log(newExpense);
//     setExpenses([...expenses, newExpense]);
//   };

//   const handleFilterChange = (selectedCateg: string) => {
//     setCategory(selectedCateg);
//   };

//   return (
//     <>
//       <Form onSubmit={handleFormSubmit}></Form>
//       <Filter onChange={handleFilterChange}></Filter>
//       <ExpTable
//         expenses={expenses.filter(
//           (expense) => !category || expense.category === category
//         )}
//         // // Another way:
//         // expenses={
//         //   !category
//         //     ? expenses
//         //     : expenses.filter((expense) => expense.category === category)
//         // }
//         onDelete={(id) => {
//           console.log(id);
//           setExpenses(expenses.filter((exp) => (id !== exp.id ? exp : null)));
//         }}
//       ></ExpTable>
//     </>
//   );
// }

// ///////////////////////////////////////////////////////////////////////////

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = UserService.getAll<User>(); // this return a promise
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

    userService.delete(user.id).catch((err) => {
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
      .create(newUser)
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

    userService.update(updatedUser).catch((err) => {
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
// // ///////////////////////////////////////////////////////////////////////////

// function App() {
//   const [category, setCategory] = useState("");

//   return (
//     <div>
//       <select
//         name=""
//         id=""
//         className="form-select"
//         onChange={(event) => setCategory(event.target.value)}
//       >
//         <option value=""></option>
//         <option value="Clothing">Clothing</option>
//         <option value="Household">Household</option>
//       </select>
//       <ProductList category={category} />
//     </div>
//   );
// }

// ///////////////////////////////////////////////////////////////////////////
// import Form from "./components/Form";

// function App() {
//   return (
//     <>
//       <Form></Form>
//     </>
//   );
// }
// // ///////////////////////////////////////////////////////////////////////////
// // PureMessage
// import PureMessage from "./components/PureMessage";

// function App() {
//   return (
//     <>
//       <PureMessage />
//       {/* <PureMessage />
//       <PureMessage /> */}
//     </>
//   );
// }
// // ///////////////////////////////////////////////////////////////////////////
// import ButtonsExercice from "./components/ButtonsExercice";
// import AlertExercice from "./components/AlertExercice";
// import { useState } from "react";
//
// // Alert Exercice
// function App() {
//   const [showState, setShowState] = useState(false);

//   const handleClick = (children: string) => {
//     console.log(children);
//   };

//   return (
//     <>
//       {showState && (
//         <AlertExercice
//           alertText="Alert!"
//           onClose={() => setShowState(false)}
//         ></AlertExercice>
//       )}
//       <ButtonsExercice
//         onClickButton={(children) => {
//           handleClick(children);
//           setShowState(true);
//         }}
//       >
//         Ma Negga
//       </ButtonsExercice>
//     </>
//   );
// }
// // ///////////////////////////////////////////////////////////////////////////
// import ButtonsExercice from "./components/ButtonsExercice";
// // Button Exercice
// function App() {
//   const handleClick = (children: string) => {
//     console.log(children);
//   };

//   return (
//     <ButtonsExercice onClick={handleClick}>
//       Ma Negga
//     </ButtonsExercice>
//   );
// }
// // ///////////////////////////////////////////////////////////////////////////
// function App() {
//   const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

//   const handleSelectItem = (item: string) => {
//     console.log(item);
//   };

//   return (
//     <div>
//       {/* we can set them just as attributes from HTML elements */}
//       <ListGroup
//         items={items}
//         heading="Cities"
//         onSelectItem={handleSelectItem}
//       />

//       {/* Notes:
//       we can use warp the heading in braces {""}, howevere, it is not
//       necessary because we are passing a static value*/}
//       {/* <ListGroup /> */}
//       {/* we will get the error here, Ts compiler is telling us that this
//       component expect 2 properties(items and heading) that we had not specify*/}
//     </div>
//   );
// }
// ///////////////////////////////////////////////////////////////////////////
// // Passing children
// function App() {
//   return (
//     <div>
//       <Alert>
//         Hello <span>there!</span>
//       </Alert>

//       {/* if you wanna pass simple string all you have to do is changing the type
//         of children to string */}
//       {/* <Alert> */}
//       {/*Hello there!*/}
//       {/* </Alert> */}

//       {/*you can also do this*/}
//       {/* <Alert text="Hello there!"></Alert> */}
//     </div>
//   );
// }

// ///////////////////////////////////////////////////////////////////////////
// // Passing Data and Functions via Props
// function App() {
//   const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

//   const handleSelectItem = (item: string) => {
//     console.log(item);
//   };

//   return (
//     <div>
//       {/* we can set them just as attributes from HTML elements */}
//       <ListGroup
//         items={items}
//         heading="Cities"
//         onSelectItem={handleSelectItem}
//       />

//       {/* Notes:
//       we can use warp the heading in braces {""}, howevere, it is not
//       necessary because we are passing a static value*/}
//       {/* <ListGroup /> */}
//       {/* we will get the error here, Ts compiler is telling us that this
//       component expect 2 properties(items and heading) that we had not specify*/}
//     </div>
//   );
// }

// ///////////////////////////////////////////////////////////////////////////
// function App() {
//   return (
//     <div>
//       <ListGroup />
//     </div>
//   );
//   // you can sue self closing tag
//   // return <div><Message/></div>;

//   // return <div><Message></Message></div>;
//   // // you can sue self closing tag
//   // // return <div><Message/></div>;
// }

export default App;
