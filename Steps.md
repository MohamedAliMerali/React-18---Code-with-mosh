# React 18 - Code with Mosh

# Prerequisite

Good understanding of:

- HTMLL
- CSS
- JavaScript

plus:

- Typescript

# What is React ?

The React.js framework is an open-source JavaScript framework and library developed by Facebook. It’s used for building interactive user interfaces and web applications quickly and efficiently with significantly less code than you would with vanilla JavaScript.

In React, you develop your applications by creating reusable components that you can think of as independent Lego blocks. These components are individual pieces of a final interface, which, when assembled, form the application’s entire user interface.

React’s primary role in an application is to handle the view layer of that application just like the V in a model-view-controller (MVC) pattern by providing the best and most efficient rendering execution. Rather than dealing with the whole user interface as a single unit, React.js encourages developers to separate these complex UIs into individual reusable components that form the building blocks of the whole UI. In doing so, the ReactJS framework combines the speed and efficiency of JavaScript with a more efficient method of manipulating the DOM to render web pages faster and create highly dynamic and responsive web applications.

# Setting up the development environments

For this Course you need Node 16 or higher, type 'node -v' to check the version.

# Creating a react App

## There is 2 ways to do so:

- **Create React APP (CRA)**
- **Vite**

Vite is getting increasingly popular this days bcz it's faster and gives smaller bundle sizes, to create with vite you should type:

```shell
npm create vite@latest

# To specify a version
npm create vite@4.1.0
```

Now set the project name and select a Framework, using vite you can create any kind of javascript proejct, after that select a language.

1. go to the project folder "cd react-app-tuto"
2. install all the 3rd partie dependencies "npm install" or "npm i"
3. run the web server "npm run dev"
4. open the @ you got on the browser

Now open that folder with VS Code with "code ."

# Project structure

You'll find some files and fodlers in your project:

- node_module: all the **3rd partie libraries** like react and other tools are installed.
- public: **public assets** of our website are here like images and videos.
- src: **source code** of our application, in this app we have a single component called the 'App' component
- index.html: basic HTML template, you'll find a div with the id of 'root', it's the **container** for our application, bellow that there is a sxript element, it's the entry point to our application
- package.json: info about our project, like name, version, some scripts, dependencies(react and react-dom for our case here) and a bunch of devDependencies.
- tsconfig.json: bunch of settings for telling the TypeScript compiler how to compile our code to Js(you won't need to touch this unless if you are an advanced user)
- vits.config.ts: no need to touch it X)

# Creating a React App

The extension of TypeScript files should be "ts" or "tsx", often "ts" is used for plain TypeScript files, and "tsx" for React component, to create this last one you can use js class or a function, function are more popular now since they are easy and concise.

1. go to "src" folder and write new file 'Message'
2. create 'Message' function (use PascalCasing)
3. export the function as default
4. go to 'App.tsx" and delete what is there
5. import the Message component
6. create App component and return ur components (Message inside the dive)
7. export the App component

PS1: this syntaxe is not HTML, it is **JSX** (JavaScript XML), that code under the hood will be compiled down to Js (you can use Babeljs to check this).

PS2: **'hmr'** is short for 'hot model replacement', vite monitor the changes and refresh the page automatically.

# How React works

Now we have a component tree with tha App beign the root (or top level component), and the message beign a child. when our Application start, Reacts take this component tree and build a JavaScript DataStructure called **'Vitual DOM'**, this one is different from the actuall DOM in the browser, it's a light weight in memory representation of our component tree, where each node represent a component and its properties.

when the state or the data of a component changes, React update the coresponding Node in the viryual DOM to reflect the new state, then it compares the current version of the current DOM with the older version to identify the node that should be updated, it will then update those nodes in the actuall DOM.

Techniqually, updating the DOM is not done by react itself, it's done by companion library called **React DOM**

# React Ecosystem

**React** is a js library for building user interfaces, in contrast, there is also other tools such as **Angular** and **vue** which are frameworks.

- Library: A tool that provides speific functionality.
- Framework: A set of tools and guidelines for building apps.

So, React is a tool to build user interfaces, we often needs other tools for concerns such as Routing (allowing the user to go from one piece to another), making HTTP, managing app state, internationalization, form validation, animation and so on...

A great thing about react is that it doesn't have an opinion for the other tools that we'll use, so we can pick the right tools for the job.

# Creating a ListGroup Component

1. install bootsrap (5.2.3v was used here)
2. clear all css (index and app css files) and remove the import in main
3. import bootstrap in main.tsx

   ```tsx
   import "bootstrap/dist/css/bootstrap.css";
   ```

4. add a folder named 'components', this is not necessarly but by convention we putt all of our component in a floder called components.
5. add file named 'ListGroup.tsx' then import it in the 'App.tsx' file
6. add the ListGroup from bootstrap and pay attention to the class error.

PS1: class is a reserved keyword in JavaScript or typescript, ypu need to rename it to 'className'.

PS2: Prettier automatically wrap our JSX markup in parentheses to break the markup into multiple lines.

# Fragment

In React, a component cannot return more then one element, bcs each expression will get compiled to JavaScript(translated to React.createElement('h1')), the same thing will happen for the 2nd element, so we're retuning multiple element and this is not allowed in react.

To solve this we can wrap the whole code inside a div or another expression, but like that we're adding one extra element in the DOM just to make react happy which is unecesssary.

We can use Fragment, so we won't have any additional element.

```jsx
import { Fragment } from "react";
// ...
//

function ListGroup() {
  return (
    <Fragment>
      <h1></h1>
      <ul></ul>
    </Fragment>
  );
}
```

We can achive the same result with less code, using empty angle brackets we're telling react to use a Fragment to wrap all of the childrens.

```jsx
// ...

function ListGroup() {
   return (
      <>
         <h1></h1>
         <ul></ul>
      <>
   );
}
```

# Rendering Lists

To render a List of items dynamically, we need the map method, we will convert each item to an li element:

```jsx
// ...

const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

function ListGroup() {
  return (
    <>
      <h1>List</h1>
      <ul>
        {items.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </>
  );
}
```

PS1: This expression(items.map(item => <li>{item}</li>)) will give an error bcs it's not allowed in JSX markup, we need to wrap it in curly braces

PS2: If you go to the console, you'll find an error that says 'Warning: Each child in a list should have a unique "key={}" prop.', which means when we map each item to a list item, the warning is saying that each item should have "key" property that uniquely identify that item, Reacts needs this to keep track of our item so later when we add or remove items dynamically, React knows what part of the page should be updated.

# Conditional Rendering

```jsx
let items = [];
function ListGroup() {
  // Condition
  if (items.length === 0)
    return (
      <>
        <h1>List</h1>
        <p>No item found</p>
      </>
    );

  return (
    <>
      <h1>List</h1>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
// ==> The code has some duplication
```

```jsx
function ListGroup() {
  let items = [];
  return (
    <>
      <h1>List</h1>
      <ul>
        {items.length === 0 ? <p>No item found</p> : null}
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
```

This logic may can get complicated and polute our JSX markup, we can extract that logic and store the result in a variable, EXP:

```jsx
function ListGroup() {
  let items = [];
   // const message = items.length === 0 ? <p>No item found</p> : null;
   // you can also use a function

  const getMessage() => {
   return items.length === 0 ? <p>No item found</p> : null;
  }
  return (
    <>
      <h1>List</h1>
      <ul>
        {getMessage()}
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
```

A function is better because it can take some parameters, and have different results. in cas we don't have that scenario, its better to use a constant.

PS: A better way to write that condition, if the first condition is true, the result of the expression will be the second part(p element), otherwise the result will be false and nothing will be rendered on the screen, it's a common technique that React developer use to render content dynamically.

```jsx
{
  items.length === 0 && <p>No item found</p>;
}
```

# Handling Events

I React, has property called on click as this code shows, inside the braces we can write an arrow function to test it.

The line where we are maping each item to a list item using the map function, so when creating that list we have acces to each item because we are using that item as a key for each list item, so we can log the item.

When maping item we can optionally add a second parameter as an **index**.

The arrow function can optionally have a parameter that represent thebrowser event, you can call it **e** or **event**

```jsx
function ListGroup() {
  let items = [];
  return (
    <ul>
      {items.length === 0 && <p>No item found</p>}
      items.map((item, index) => (<li
        className="list-group-item"
        key={item}
        onClick={() => console.log(index, item)}
      >
        {item}
      </li>
      ))}
    </ul>
  );
}
```

PS: it's totally fine to write the logiq of a function in the same line only if it was simple, if the function got complicated you may need to transform the logique into seperate function.

```jsx
import { MouseEvent } from "react";

function ListGroup() {
  let items = ["Tokyo", "New York"];
  // we start by the word handle by convention, and then we specify the type of events
  // in this case the type of the event is a click event, we call this an event Handler
  const handleClick = (event: MouseEvent) => console.log(event);
  // Here we will have a woring from Ts compiler saying: Parameter 'event' implicitly has 'any' type
  // The reason is Ts compiler doesn't know the type of this parameter, if we use the dot operator
  // we cannot see any property of this event object, this is where we need to specify the type of our
  // parameters so we get auto completion and type safety

  // Solution: import the MouseEvent as you can see on top of the code
  // add the type after the parameter, we call this type annotation in TypeScript
  // like this we can see the properties of the MouseEvent object, we can have auto completion and type-safety
  // and it is easier to refactor or restructure the code
  return (
    <ul>
      {items.length === 0 && <p>No item found</p>}
      items.map((item, index) => (<li
        className="list-group-item"
        key={item}
        // PS: Here the Ts compiler knows the type of our parameter
        // but the other exp we're declaring a brand  new function that our compiler
        // have no idea what's this about or where we're gonna use this
        onClick={handleClick}
        // onClick={(event) => console.log(index, item, event)}
        // Here the event will return (SyntheticBaseEvent)
        // it's one of the built-in classes from React, because
        // different browser have different implementations of events objects
        // So to make it cross browser, React team created this class, that is
        // a wrapper around the native browser event obejct.
      >
        {item}
      </li>
      ))}
    </ul>
  );
}
```

# Managing state

```jsx
const arr = useState(-1); // A
arr[0]; // variable (like selectedIndex)
arr[1]; // updater function that update the first variable and React wuill get notified
```

Instead of working with 2 elements here, it's better to destructure this array into 2 elemnts. For Exp: [selectedIndex, setSelectedIndex], it's convention we use in React applications


```jsx
const [selectedIndex, setSelectedIndex] = useState(-1); 
// selectedIndex: state variables 
// setSelectedIndex: that's a function
```

As another example, we can use the state hook to declare another variable called name

```jsx
const [name, setName] = useState(''); 
```

That's how we can tell React that our component has states that will change over time.

PS: Each component gonna have it's own state, so if we doubled the ListGroup component, each list gonna have its own state, they will be indepondent.

```jsx
import { useState } from "react";

function ListGroup() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  // items = [];

  // let selectedIndex = 0; // -1 means no item is selected / 0 for 1st item
  // this var is a local to this fucntion component, React is not aware of it
  // we need to tell react that this component is going to have data
  // or states that may chnage over the time, we need a built-in function called useState

  // this function called Hook
  // Hook: is a function that allows us to tape in to built-in function in react
  // this one called state hook, using this one we can tell React that this component
  // can have data or state that will change over time
  //
  // instead of declaring a varibales by the old way, we gonna call 'useState()' function
  // then we're gonna initialize our varibale and give it the initial value of -1
  // that will return array that contains 2 elements

  // const arr = useState(-1);
  const arr = useState(-1); // instead of working with 2 elements jhere, it's better to
  arr[0]; // variable (like selectedIndex)
  arr[1]; // updtaer function that update the first variable and React wuill get notified
  // and we'll knows that the sate of our component changed, then it will rerender the
  // component which causes the DOM to be updated under the hood.

  // recap: with React we almost don't have to work with tha DOM directly, we think in terms of
  // components that have states, when the state of a component chnages, React will update the DOM
  // to match the new component state

  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              selectedIndex = index;
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
```

#

#

#

#

# Resources

1. https://blog.hubspot.com/website/react-js
