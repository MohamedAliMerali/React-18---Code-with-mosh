# React 18 - Code with Mosh

# Prerequisite

Good understanding of:

- HTML
- CSS
- JavaScript

plus:

- TypeScript

# What is React ?

The React.js framework is an open-source JavaScript framework and library developed by Facebook. It’s used for building interactive user interfaces and web applications quickly and efficiently with significantly less code than you would with vanilla JavaScript.

In React, you develop your applications by creating reusable components that you can think of as independent Lego blocks. These components are individual pieces of a final interface, which, when assembled, form the application’s entire user interface.

React’s primary role in an application is to handle the view layer of that application just like the V in a model-view-controller (MVC) pattern by providing the best and most efficient rendering execution. Rather than dealing with the whole user interface as a single unit, React.js encourages developers to separate these complex UIs into individual reusable components that form the building blocks of the whole UI. In doing so, the ReactJS framework combines the speed and efficiency of JavaScript with a more efficient method of manipulating the DOM to render web pages faster and create highly dynamic and responsive web applications.

# Setting up the development environments

For this Course you need Node 16 or higher, type 'node -v' to check the version, if you don't you just need to downloads it from yhe nodeJs webiste.

# Creating a react App

## There is 2 ways to do so:

- **Create React APP (CRA)**: The official tool, provided by React team.
- **Vite**: it is getting increasingly popular this days bcz it's faster and gives smaller bundle sizes

to create with vite you should type:

```shell
npm create vite@latest

# To specify a version (same as the course here)
npm create vite@4.1.0
```

First it will ask you to install a package, Now set the project name, 'vite-project' will be the name of the project, ofc you can change it. after that select a Framework(React), using vite you can create any kind of javascript proejct, last but not least select a language(TypeScript).

1. Go to the project folder "cd react-app-tuto"
2. Install all the 3rd partie dependencies "npm install" or "npm i"
3. Run the web server "npm run dev"
4. Open the @ you got on the browser

Now open that folder with VS Code with the command: "code ."

# Project structure

You'll find some files and fodlers in your project:

- **node_module**: all the **3rd partie libraries** like react and other tools are installed (no need to touch this).
- **public**: **public assets** of our website are here like images and videos.
- **src**: **source code** of our application, in this app we have a single component called the 'App' component
- **index.html**: basic HTML template, you'll find a div with the id of 'root', it's the **container** for our application, bellow that there is a script element, it's the entry point to our application
- **package.json**: info about our project, like name, version, some scripts, dependencies(react and react-dom for our case here) and a bunch of devDependencies.
- **tsconfig.json**: bunch of settings for telling the TypeScript compiler how to compile our code to Js (you won't need to touch this unless if you are an advanced user)
- **vits.config.ts**: no need to touch it too X)

# Creating a React App

The extension of TypeScript files should be "ts" or "tsx", often "ts" is used for plain TypeScript files, and "tsx" for React component, to create this last one you can use js class or a function, function are more popular now since they are easy and concise.

1. go to "src" folder and write new file 'Message'
2. create 'Message' function (use PascalCasing)
3. export the function as default
4. go to 'App.tsx" and delete what is there
5. import the Message component
6. create App component and return ur components (Message inside the div)
7. export the App component

PS1: this syntaxe is not HTML, it is **JSX** (JavaScript XML), that code under the hood will be compiled down to Js (you can use Babeljs to check this).

PS2: **'hmr'** is short for **'hot model replacement'**, vite monitor the changes and refresh the page automatically.

# How React works

Now we have a component tree with the App beign the root (or top level component), and the message beign a child. when our Application start, Reacts take this component tree and build a JavaScript DataStructure called **'Vitual DOM'**, this one is different from the actuall DOM in the browser, it's a **light weight** in **memory representation** of our component tree, where each node represent a component and its properties.

when the state or the data of a component changes, React update the coresponding Node in the virtual DOM to reflect the new state, then it compares the current version of the current DOM with the older version to identify the node that should be updated, it will then update those nodes in the actuall DOM.

Techniqually, updating the DOM is not done by react itself, it's done by companion library called **React DOM**.

# React Ecosystem

**React** is a js library for building user interfaces, in contrast, there is also other tools such as **Angular** and **vue** which are frameworks.

- Library: A tool that provides speific functionality.
- Framework: A set of tools and guidelines for building apps.

So, React is a tool to build user interfaces, the only thing that is good at is creating dynamic and interactive user interfaces, we often needs other tools for concerns such as Routing (allowing the user to go from one page to another), making HTTP, managing app state, internationalization, form validation, animation and so on...

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

PS1: This expression below, will give an error bcs it's not allowed in JSX markup, we need to wrap it in curly braces.

```jsx
items.map(item => <li>{item}</li>))
```

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

React has a property called onClick as this code shows, inside the braces we can write an arrow function to test it.

The line where we are maping each item to a list item using the map function, so when creating that list we have acces to each item because we are using that item as a key for each list item, so we can log the item.

When maping item we can optionally add a second parameter as an **index**.

The arrow function can optionally have a parameter that represent the browser event, you can call it **e** or **event**

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

PS: it's totally fine to write the logic of a function in the same line only if it was simple, if the function got complicated you may need to transform the logic into seperate function.

```jsx
import { MouseEvent } from "react";

function ListGroup() {
  let items = ["Tokyo", "New York"];
  // we start by the word handle by convention, and then we specify the type of events
  // in this case the type of the event is a click event, we call this an event handler
  const handleClick = (event: MouseEvent) => console.log(event);
  // Here we will have a warning from Ts compiler saying: Parameter 'event' implicitly has 'any' type
  // The reason is Ts compiler doesn't know the type of this parameter, if we use the dot operator
  // we cannot see any property of this event object, this is where we need to specify the type of our parameters so we get auto completion and type safety

  // Solution: import the MouseEvent as you can see on top of the code
  // add the type after the parameter, we call this type annotation in TypeScript
  // like this we can see the properties of the MouseEvent object, we can have auto completion and type-safety
  // and it's easier to refactor or restructure the code
  return (
    <ul>
      {items.length === 0 && <p>No item found</p>}
      items.map((item, index) => (<li
        className="list-group-item"
        key={item}
        // PS: Here the Ts compiler knows the type of our parameter
        // but the other exp we're declaring a brand new function that our compiler
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

PS: in order to print the item using a separate function, we got do some changes, as you can see here:

```jsx
const handleClick = (item: string, index: number) => {
  console.log(index, item);
};

function ListGroup() {
  return (
    <>
      <h1>List Group</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className="list-group-item"
            onClick={() => handleClick(item, index)}
            // Pass the item to handleClick
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
```

# Managing state

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
  // Hook: is a function that allows us to tape into built-in function in react
  // this one called state hook, using this one we can tell React that
  // this component can have data or state that will change over time
  //
  // instead of declaring a varibales by the old way, we gonna call 'useState()' function
  // then we're gonna initialize our varibale and give it the initial value of -1
  // that will return array that contains 2 elements

  // const arr = useState(-1);
  // const arr = useState(-1); // instead of working with 2 elements there, it's better to
  // arr[0]; // variable (like selectedIndex)
  // arr[1]; // updtaer function that update the first variable and React will get notified
  // and we'll knows that the sate of our component changed, then it will rerender the
  // component which causes the DOM to be updated under the hood.

  // recap: with React we almost don't have to work with the DOM
  // directly, we think in terms of components that have states,
  // when the state of a component changes,  React will update
  // the DOM to match the new component state

  const [selectedIndex, setSelectedIndex] = useState(-1);
  // selectedIndex: state variables
  // setSelectedIndex: that's a function

  return (
    <>
      <h1>List</h1>
      {items.length === 0 ? <p>No item found</p> : null}
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

```jsx
const arr = useState(-1); // A
arr[0]; // variable (like selectedIndex)
arr[1]; // updater function that update the first variable and React wuill get notified
```

Instead of working with 2 elements here, it's better to destructure this array into 2 elemnts. For Exp: [selectedIndex, setSelectedIndex], it's the convention we use in React applications

```jsx
const [selectedIndex, setSelectedIndex] = useState(-1);
// selectedIndex: state variables
// setSelectedIndex: that's a function
```

As another example, we can use the state hook to declare another variable called name

```jsx
const [name, setName] = useState("");
```

That's how we can tell React that our component has states that will change over time.

PS: Each component gonna have it's own state, so if we doubled the ListGroup component, each list gonna have its own state, they will be indepondent.

## additional

In the provided code, the expression:

```jsx
selectedIndex === index ? "list-group-item active" : "list-group-item";
```

is not executed every time an item is clicked. Instead, it is used to determine the class name that should be applied to each list item (li element) based on whether the item is selected or not.

The component uses the useState hook to maintain the state of the selected item index. When the component is initially rendered, the selectedIndex state is set to -1. When an item is clicked, the onClick event handler is triggered, and it updates the state by calling setSelectedIndex(index), where index is the index of the clicked item.

As the state changes, React will automatically re-render the component and update the class names of the list items based on the updated state value. If the selectedIndex is equal to the index of the current item, the class name "list-group-item active" will be applied, making the item appear active. Otherwise, the class name "list-group-item" will be applied, indicating that the item is not selected.

By using the useState hook, React takes care of updating the DOM when the state changes, and you don't have to manually manipulate the DOM or worry about updating class names in response to item clicks.

# Passing Data via Props

We use Props, or Properties when we want to make a component resuable. Props are the inputs of our components.

Instead of defining the items that you wanna use inside a component, we should be able to pass them as an input to our component, same as calling a function and give it an argument.

So Fisrt, we need to decide the shape of input to this component, in our example here, we should be able to pass an object with 2 properties, 'items', which is going to be an Array, and 'heading' which is a String.

To do that we need on of TypeScript features called an **interface**, with the use of this features, we can define the shape, or the interface of an object.

```jsx
// interface Syntaxe:
// - interface keyword
// - Props: by convention, but some people prefer to prefix it with the name of the component, so ListGroupProps, it's the same
interface Props {
  // we use type-annotation to specify the type of the various properties
  items: string[];
  heading: string;
}
// PS: we declare this in our component
```

Now we give the function a parameter called props, of type Props. after this step, in the 'App' component you'll get 2 compilation errors saying: Type '{}' is missing the following properties from type 'Props': items, heading.

    PS: that's one of the benifits of TypeScript, the compiler is reminding us that we forget to pass those Props, it is helping us to catch bunch of potential error at compile time before running our application.

```jsx
function App() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  return (
    <div>
      {/* we can set them just as attributes from HTML elements */}
      <ListGroup items={items} heading="Cities" />
      {/* we can use warp the heading in braces {""} */}
      {/* <ListGroup /> */}
      {/* we will get the error here, Ts compiler is telling us that this 
      component expect 2 properties(items and heading) that we had not specify */}
    </div>
  );
}
```

Now we'll have couple of issues here, we don't have the 'items' variable anymore, so we have to prefix it with 'props', so we use 'props.items'. The issue here that we need to use 'props.items' again and again, it is repetitive and ugly. a better solution is to destrucutre the 'props' parameter to have acces to these properties anywhere in our function, like this:

```jsx
function ListGroup(props: Props) ...
function ListGroup({ items, heading }: Props) ...
```

Here's the cleaner code of our new component:

```jsx
import { useState } from "react";
// {items: [], heading: string}

function ListGroup({ items, heading }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      {/*Do not forget to replace the List with the heading dynamically*/}
      <h1>{heading}</h1>
      {item.length === 0 && <p>No item found</p>}
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
              setSelectedIndex(index);
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

```jsx
{
  /*inside The App component*/
}
return (
  <div>
    {/* we will get the error here, Ts compiler is telling us that this
      component expect 2 properties(items and heading) that we had not specify*/}
    {/* we can set them just as attributes from HTML elements */}
    <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} />

    {/* Notes:
      we can use warp the heading in braces {""}, howevere, it is not
      necessary because we are passing a static value*/}
    {/* <ListGroup /> */}
  </div>
);
```

# Passing functions via Props

In a real world application, something should happen after an item is selected, perhaps we wanna filter some objects or we wanna redirect user to another page.

What happens will be different from an app to another, we don't wanna hard-coded this, we don't wanna write this piece of logic inside our list group component because it's not gonna a resuable component anymore, we need a way to notify the parent component that an item is selected.

To implement this, we need to modify the props object, we're using its properties to pass data to our component, we can add a third property which is going to be a function, it will take a parameter called item of type string, that is the selected item, and it returns void.

    PS: By convention we start by th word 'on' and then we specify the type of event, in this case it's 'event' (like 'onClick' property that we saw).

```jsx
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
  {/*The type of this property is a function*/}
}
```

Now we need to change the app component since we have a new parameter, we can write an inline function, or we can write a seperate event handler

    PS: If we wanna write a seperate event handler, by convention we start with the word 'handle', followed by the type of event. we set that to a function with the signature that we defined as shown in the code below.

```jsx
const handleSelectItem = (item: string) => {
  console.log(item);
};
```

After that we pass the handler function, 'handleSelectItem' to the 'ListGroup' inside the App component, without forgeting to destructure the new property, and then when selecting an item, we should call this fucntion. Now, That's left us with the final code:

```jsx
{
  /* APP component */
}
function App() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}
```

```jsx
{
  /* ListGroup component */
}
import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
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
              setSelectedIndex(index);
              onSelectItem(item);
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

# States Vs Props

Now let's talk about the differences and similarities between **Props** and **States**.

## Differences

| Props                       | States                      |
| --------------------------- | --------------------------- |
| Input passed to a component | Data managed by a component |
| Similar to function args    | Similar to local variables  |
| Immutable                   | Mutable                     |
|                             |                             |

## Similarities

| Props             | States            |
| ----------------- | ----------------- |
| Cause a re-render | Cause a re-render |
|                   |                   |

    PS: Immutable means Unchangeable, it means it's for read-only, so in our ListGroup component, we should not change our Props, if we do so, nothing is gonna happen, but this is anti-pattern in react, this is based on functional programing principles. So we should treat props as Immutable.

# Passing children

Sometimes, we want to pass children to a component instead of variables, just how we're passing a ListGroup to a div in previous code in 'App.tsx'... (check code below). we will see how to create a component that accept childrens.

Exp:

```tsx
<div>
  <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} />
</div>
```

Now, we need to follow some steps. First, Go to the components folder and add a file called 'Alert.tsx', add the Alert component to our 'App' and test. for the alert we need to barrow some code from bootstrap, get 'alert' (class="alert alert-primary". alert is the base class, the 2nd class will determine the color).

    PS: Her's a shortcut: instead of defining a function 'Alert()' and exporting it, we can use a shortcut, go to the extension panel and search for 'ES7+'. after installing that extension, just type 'rafce' (short for 'reactArrowFunctionComponentExport'), you'll get a code snipest with multi-cursor editing.

    PS: no need to import react there.

If we wanna make it dynamic, we will have to add text as a Prop, so we need to add an interface to define the shape of Prop, and then add a parameter of type Props(better to destructure it as uk).

Back to 'App' component, set the text attribute for the 'Alert' component, Here's the code we made so far:

```tsx
{
  /*<!-- Alert component -->*/
}
interface Props {
  text: string;
}

const Alert = ({ text }: Props) => {
  return <div className="alert alert-primary">{text}</div>;
};

export default Alert;
```

```jsx
{
  /*<!-- App component -->*/
}
import Alert from "./components/Alert";

function App() {
  return (
    <div>
      <Alert text="Hello there!"></Alert>
    </div>
  );
}
```

Furthermore, the way we passed the text is kinda ugly, what if the text is bit too long? or what if we wanna pass HTML content, it is ugly to pass it in a prop like that, it is better to pass it in a child.

Go to 'Alert' component, there is a special Props that all components support called childrens, you only need to rename 'text' to 'children'.

```tsx
{
  /*<!-- Alert component -->*/
}
interface Props {
  children: string; /*rename it here*/;
}

/*rename it here too*/
const Alert = ({ children }: Props) => {
  return <div className="alert alert-primary">{children}</div>;
};

export default Alert;
```

Now you can pass the text like this:

```jsx
{
  /*<!-- App component -->*/
}
import Alert from "./components/Alert";

function App() {
  return (
    <div>
      <Alert>Hello there!</Alert>
    </div>
  );
}
```

Note: if we wanna pass HTML content, we'll get a compilation error, because we told Ts compiler that children Prop is a string, and we're passing more complex structure, you need to change the type of children from string to 'reactNode'

```tsx
{
  /*<!-- Alert component -->*/
}
import ReactNode from "react";

interface Props {
  children: ReactNode /*rename it here*/;
}

const Alert = ({ children }: Props) => {
  return <div className="alert alert-primary">{children}</div>;
};

export default Alert;
```

```tsx
{
  /*<!-- App component -->*/
}
import Alert from "./components/Alert";

function App() {
  return (
    <div>
      <Alert>
        Hello <span>there!</span>
      </Alert>
    </div>
  );
}
```

# Inspecting Component with React Dev Tools

it's an easy-to-use extension :)

# Button exercice

```jsx
import ButtonsExercice from "./components/ButtonsExercice";

function App() {
  const handleClick = (children: string) => {
    console.log(children);
  };

  return <ButtonsExercice onClick={handleClick}>Ma Negga</ButtonsExercice>;
}
```

```jsx
// Interface
interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger"; // .....
  //   color?: string;
  onClick: (children: string) => void;
}

const ButtonsExercice = ({ children, color = "primary", onClick }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={() => onClick}
    >
      {children}
    </button>
  );
};
```

    PS:
    - color = "primary": we're giving it a default value.
    - 'color?': we're telling that means this property is optional.
    - color?: "primary": string literal, like this we can only set this value to "primary"
    - color?: "primary" | "secondary" ...: adding a second string literal using the union operator. we're telling the compiler that's this values are the only accepted values.

# Showing an Alert exercice

```jsx
// <-- Alert Component -->
interface Props {
  children: string;
  onClose: () => void;
}

const Alert = ({ children, onClose }: Props) => {
  return (
    // "alert alert-warning alert-dismissible fade show"
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
```

```jsx
// <-- Button Component -->
interface Props {
  children: string;
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
```

```jsx
// <-- App Component -->
import { useState } from "react";
import Button from "./components/Button";
import Alert from "./components/Alert";

function App() {
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <>
      {alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>
          The Alert is Alerting
        </Alert>
      )}
      <Button onClick={() => setAlertVisible(true)}>My Button</Button>
    </>
  );
}

export default App;
```

# Resources

1. https://blog.hubspot.com/website/react-js
2. https://www.freecodecamp.org/news/how-to-manage-state-in-your-react-apps/
3. https://www.knowledgehut.com/blog/web-development/handling-react-events-guide#react-events:-naming%C2%A0%C2%A0
4. https://linuxhint.com/center-social-media-icons-using-css/
5.

# Questions

1.  What is the difference between 'fragmaent' and '<>'
2.  in the event video, why did we get the type error when changed the function from the inline arrow function to handleClick function???
