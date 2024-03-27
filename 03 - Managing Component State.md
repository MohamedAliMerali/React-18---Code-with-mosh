# Managing Component State

Keywords: asynchronously, spread operator, Immer, produce function

# Understanding the State Hook

Using State Hook we can add states to a components, but there is some things we need to know about the State Hook:

> - React update state **asynchronously**.
> - State is stored outside of components.
> - Use hooks at the top level of your component.

## React update state asynchronously

Meaning of this is not immediately, it will be applied in the futur, Because as part of handling an events we could set multiple states, if React re-render the component every time we set a new one, we will end-up with too many unecessary re-renders.

So for performance reasons, React take all of this updates, matches them and apply them later, after the event handler finishes execution. at that point, react update all states and re-render the component.

```tsx
const [isVisible, setVisibility] = useState(false);

const handleClick = () => {
  setVisibility(true);
  console.log(isVisible); // the output is: false
};
```

## State is stored outside of components

In react we use states to store values, because when declaring variables inside a function, they will be scoped to that function, when the component finishes execution, the local variables will be removed from the memory, next react re-render a component it will call the function again and the variables will be initialized to the original value.

This why we use the State Hook to store the state outside the component.

    PS: React keeps the state in memory as long as the component is visible on the screen.

```tsx
const [isVisible, setVisibility] = useState(false);
let count = 0;

const handleClick = () => {
  setVisibility(true);
  count++;
  console.log(isVisible); // the output is: false
};
```

## Use hooks at the top level of your component

The names we use for states like ('isApproved' and 'setApproved'), those are local identifier in this function, react is not aware of them, when we use state hook, we're only telling react to store a value, react is gonna store those values, most likely inside an Array.

When react re-render a component, it will look at that Array and store the value inside the identifiers, So react relys on the order of the elements inside the Aarray so it can map tha values properly to the local variables of that function.

That means we cannot use Hooks inside if statments, for loops or nested functions, because it can affect the order of which the states Hook are called.

```tsx
// [false, true]: how react save states
const [isVisible, setVisibility] = useState(false);
const [isApproved, setApproved] = useState(true);
let count = 0;

const handleClick = () => {
  setVisibility(true);
  count++;
  console.log(isVisible); // the output is: false
};
```

# Choosing the state structure

> - Group related state variables into an object to keep them organized.
> - Avoid deeply nested state objects as they can be hard to update and maintain.
> - To keep state as minimal as possible, avoid redundant state variables that can be computed from existing variables.

Avoid code like this:

```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const fullName = firstName + " " + lastName;

// this is a variables that don't relate to the name
const [isLoading, setLoading] = useState(false);

return <div>{fullName}</div>;
```

It is better to group related variables

```jsx
// related variables together
const [person, setPerson] = useState({
  firstName: "",
  lastName: "",
  // dont go to deeply nested objects like this,
  // updating it will be difficult
  contact: {
    address: {
      street: "",
    },
  },
});
const [isLoading, setLoading] = useState(false);
```

# Keeping Components Pure

In computer science, A **`Pure Function`** is a function that given the same input, always returns the same result.

React is designed around this concept, it expect every component we creat to be a pure function, so if we give it same inputs or the same props, it should always return same jsx, and this is for performance reasons, so if the input of a component hasn't change, react can skip re-rendering that component.

> - A pure function is one that always returns the same result given the same input.
> - Pure functions should not modify objects outside of the function.
> - React expects our function components to be pure. A pure component should always return the same JSX given the same input.
> - To keep our components pure, we should avoid making changes during the render phase.

```jsx
// As an exp, this component isn't pure, bcs count will increases every time you use the or we call this component.

let count = 0;

const Message = () => {
  count++;
  return <div>Messsage {count}</div>;
};
// reuslt:
// Message 2
// Message 4
// Message 6

export default Message;
```

    PS: we should not change any object that existed before rendering. but note that it's totally fine to update an object that we creat as part of rendering.

```js
// this component is Pure, we'll always get the same result
const Message = () => {
  let count = 0;
  count++;
  return <div>Messsage {count}</div>;
};

export default Message;
```

# Strict Mode

If you saw something strange from the last Message function, before making the fucntion pure the result was: 2, 4, 6 instead of: 1, 2, 3, this has to do with the strict mode from react.

if you take a look at the 'main.tsx' file you'll find that our app component is wraped inside 'StrictMode' component, that's one of the built-in component in react that doesn't have a visual representation.

When this mode is enabled, in development react render each component twice and take the second result. The first render is for detecting and reporting potential issues with our code, while the second render is used to actually render the component.

```jsx
let count = 0;

const PureMessage = () => {
  console.log("Message called:", count);
  // like this you'll have two messages on the console.
  // the second one may be in grey color, bcs it's coming from the Strict Mode
  count++;
  return <div>Message {count}</div>;
};

export default PureMessage;
```

> Strict mode helps us catch potential problems such as impure components. Starting from React 18, it is enabled by default. It renders our components twice in development mode to detect any potential side effects.

> When we build our strict mode for production, the Strict Mode are not included, and our component render only once.

# Updating Objects

We already discussed that related variables should be grouped together inside an object.

```jsx
import { useState } from "react";

function Drink() {
  const [drink, setDrink] = useState({
    name: "Americano",
    price: 15,
    count: 5,
  });

  const handleClick = () => {
    const newDrink = {
      name: drink.name,
      price: drink.price,
      count: drink.count + 1,
    };
    setDrink(newDrink);

    // This is not gonna work
    // drink.price = drink.count + 1;
    // setDrink(drink);
  };

  return (
    <div>
      <button onClick={handleClick}> Click Me to updtae drinks </button>
      {drink.count}
    </div>
  );
}

export default Drink;
```

    PS: It is not possible to update a property value of a state object and then use the State hook to update an object, we should have an brand new object and then update the existing object, that's how we tell react about the update.

> - Just like Props, we should treat object like immutable or read-only.

In this example here we used State Hook to create a drink object with some properties, then we used handle function to create a brand new object to update the old object state.

There is a better way to do this, we can create the object inside the set function, and what would be even better is to use the spread operator to avoid setting the new values one by one, we may have an object with a lot of values, and that's very tedious.

```jsx
setDrink({
  name: drink.name,
  price: drink.price,
  count: drink.count + 1,
});
```

```jsx
// this will copy all properties of the drink object to the newDrink object
setDrink({
  ...drink,
  count: drink.count + 1,
});
```

# Updating Nested Objects

One thing you need to know here that js **spread operator** is **shallow**, It means when we use it to copy an object that have nested objects(such as address object in the customer object), it's going to return the existing object in memory.

That means if you create 2 objects as shown in the exp below, both objects will reference the same address object in memory, it's not what we want and it will create a lot of bugs.

> To take away: When updating states in React applications, we should make sure that our new state object is completely independent from the existing state object, they don't share anything.

```jsx
const [customer, setCustomer] = useState({
  name: "jhon",
  address: {
    city: "San Francisco",
    zipCode: 94111,
  },
});
```

Soo... How to solve this issue?, we can use spread operator multiple times:

```js
const handleClick = () => {
  setCustomer({
    ...customer,
    address: { ...customer.address, zipCode: 94112 },
  });
};
```

    PS: That's why we should avoid deeply nested object, the deeper the objects are the more complicated it get to update an object, it's preferable to choose a flatter structure than a deeply nested structure.

# Updating Arrays

The same goes for Array, we should not mutate or change them, we should give react a brand new array.

```jsx
const [tags, setTags] = useState(["happy", "cheerful"]);

const handleClick = () => {
  // we don't wanna call this
  // it modifies the original arrays.
  // tags.push()

  // Add
  setTags([...tags, "exciting"]);

  // Remove
  setTags(tags.filter((tag) => tag !== "happy"));

  // Update
  setTags(tags.map((tag) => (tag === "cheerful" ? "delightful" : tag)));
  // Ps you can spread all values then
  // change the values you wanna change
};
```

# Updating Array of Objects

Sometimes we need to update a specific object within many other object stored in an array. In this code down below, we're telling react that the first object in this array is updated, and react will do the necessary work to update the DOM to match the component state.

> To take away: we don't need to make brand new object in this array, only the object that suppose to be modified.

```jsx
const [bugs, setBugs] = useState([
  { id: 1, title: "Bug 1", fixed: false },
  { id: 2, title: "Bug 2", fixed: false },
]);

const handleClick = () => {
  setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
};
```

# Simplifying Update Logic with Immer

Updating arrays and objects without mutation can get a little bit complicated and repetetive, We can use **Immer library** to simplifiy our update logic.

First you need to install Immer:

```cmd
npm i immer@9.0.19
```

Now we're gonna do the exact same thing, updating the first object in the array. To use Immer, we call setBugs, but instead of using bugs.map, we're gonna call the **produce function**, and as an argument we're gonna pass an arrow function.

By convention we're gonna call the parameter of that function **draft**, which is a proxy object that records the changes we're gonna made to the bugs array.

You can imagine it as the copy of the body array, so we're free to mutate or modify just like a regular js object. No need to map anything, no need to do copies, we can go in that object and make many changes.

Behind the scenes keep track of those changes, then it will make a copy of that bugs array, with our changes applied.

```jsx
function BugsArray() {
  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  const handleClick = () => {
    // the old way:
    // setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));

    setBugs(
      produce((draft) => {
        const bug = draft.find((bug) => bug.id === 1);
        // if an object that meet the condition was find
        if (bug) bug.fixed = true;
      })
    );
  };

  return (
    <div>
      {bugs.map((bug) => (
        <p key={bug.id}>
          {bug.title} {bug.fixed ? "Fixed" : "New"}
        </p>
      ))}
      <button type="button" onClick={handleClick}>
        Fix bug
      </button>
    </div>
  );
}
```

# Sharing State between Components

To share state between components, we should lift the state up to the closest parent component and pass it down as props to child components.

The component that holds some state should be the one that updates it. If a child component needs to update some state, it should notify the parent component using a callback function passed down as a prop.

As an exp, let's imagine we have 2 components, the first is a nav bar, where we can see the numbers of the items we baught, and the 2nd component is a shopping cart where we can see the details of the purchases. So when we remove an item from the Shopping cart, the number of items in the NavBar should be updated in real-time.

```tsx
interface Props {
  cartItemsCount: number;
}

const NavBar = ({ cartItemsCount }: Props) => {
  return <div>NavBar: {cartItemsCount}</div>;
};

export default NavBar;
```

```tsx
// Cart component
interface Props {
  cartItems: string[];
  onClear: () => void;
}

const Cart = ({ cartItems, onClear }: Props) => {
  return (
    <>
      <div>Cart</div>
      <ul>
        {cartItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={onClear}>Clear</button>
    </>
  );
};
export default Cart;
```

```tsx
// App component
function App() {
  const [cartItems, setCartItems] = useState(["Product-1", "Produc-2"]);
  return (
    <div>
      <NavBar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])} />
    </div>
  );
}

export default App;
```

# Exercice

# Questions

# Additional:

```jsx
// const [enteredTitle, setEnteredTitle] = useState("");
// const [enteredAmount, setEnteredAmount] = useState("");
// const [enteredDate, setEnteredDate] = useState("");
const [userInput, setUserInput] = useState({
  enteredTitle: "",
  enteredAmount: "",
  enteredDate: "",
});

const titleChangeHandler = (event) => {
  setUserInput((prevState) => {
    return { ...prevState, enteredTitle: event.target.value };
  });
  // setEnteredTitle(event.target.value);
  // setUserInput({
  //   ...userInput,
  //   enteredTitle: event.target.value,
  // });
};
```
