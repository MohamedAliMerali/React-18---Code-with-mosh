# Styling Components

You'll Learn

- Vanilla CSS
- CSS Modules
- CSS-in-js
- Using CSS libraries

# Vanilla CSS

> John Smith hates putting css file next to a component file, he's saying that all css files should be in a separate files.

in programing, we have a concept called **'Cohesion'**, it means that things that are related should be next to each others, things that are unrelated should be separate. if ListGroup component will be dependent on its css files, if tomorrow we wanna share that files, we'll go to 2 different folders and share 2 separate files.

There is a 3rd approach, we can put the component and its css file in a seperate folder, it will have all the materials or all the buildings block of the component, a css and ts file.

    NOTE: moving the file will cause the import statment to breack, we need to fix the issue by going to the 'App' component and change the import statment.

```jsx
import ListGroup from "./components/ListGroup/ListGroup";
```

    PS: This structure is a little bit ugly, we can fix this problem by creating an 'index' file in the same folder as the component.
    By default, if we don't supply a file and we're referencing a folder, it will automatically look for a  file called 'index'.

```jsx
import ListGroup from "./components/ListGroup";
import ListGroup from "./components/ListGroup/index";
```

```jsx
{
  /*index.ts file*/
}
import ListGroup from "./ListGroup";

export default ListGroup;
```

# CSS Modules

A CSS module is a CSS file in which all class names are scooped locally just like js Modules, so they allow us to use the same CSS className in differente files without worrying about name clashes.

The first step to use them is to rename the CSS files and add **'.module'** in the file name before the CSS extension, like this: 'ListGroup.module.CSS', then update the the reference and change the import statment, just like how we import an object from a Js or Ts file.

```jsx
import styles from "./ListGroup.module.css"; // or like that below this
import "./ListGroup.module.css";
```

```jsx
function listItem() {
  return (
    <>
      <ul className={styles["list-group"]}></ul>
      <ul className={styles.listGroup}></ul> {/*camelNotation to avoid the ugly syntaxe*/}
      <ul className={[styles.listGroup, styles.container].join(" ")}> </ul>
      {/*for multi classes*/}
    </>
  );
}
```

    PS: the className will be encoded. as part of bundling our app, vite take all css modules and creat unique css classes for us to not worry about name clashes.

# CSS-in-JS

The idea of Css-in-js is that we can write all the styles of the components next to it's definition in a Js or Ts file.

Some Benifits of that:

- Scoped styles: we're not gonna run into name clashes or conflicts.
- All the CSS & Js/Ts code in one file.
- Easy to delete a component.
- Easier to style based on props/states.

There is different libraries that implement this concepts, the most popular ones are:

- Styled component
- Emotion
- Polished

1.  First we need to install the styled-component like this:

```shell
npm i styled-component
```

2.  import 'styled'

```jsx
import styled from "styled-components";
```

    PS: Here you'll get an error saying "Could not find a declaration file for module 'styled-components'." The Ts compiler dosen't know about the type of object defined in this library, this problem may be solved in future versions, we have to install the type definition for this library separately.

    @types is a repository that contains type defenitions for various popular Js libraries.

```shell
npm i @types/styled-component
```

3. Using this styled object we can creat styled components. with styled-component we no longer use className, instead we creat a react component that has all the styles we want right here.

```jsx
// PS: in styled you'll find every HTML element that you can think of
// inside the backtick, define all the styles of this ul element
// all the styling will be here on the top in a single place
const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const ListItem = styled.li`
  padding: 5px 0;
`;

<List>
  {items.map((item, index) => (
    <ListItem
      key={item}
      onClick={() => {
        setSelectedIndex(index);
        onSelectItem(item);
      }}
    >
      {item}
    </ListItem>
  ))}
</List>;
```

the return value of this is gonna be a react component that has this styles applied to it, so we can store the result in a component, then we replace the regular element and replace them with the new component. Like this the jsx markup only represent the structures and no styling.

4. Another benifits, as we mentioned earlier, with this approach it is easier to style a component based on its props or states. so earlier we applied the active class dynamically if the index of the current item was equal to selectedIndex.

to implement this using styles component, We can give 'ListItem' component a prop like 'active' and set it to a boolean expression like this: **'active={index === selectedIndex}'**

Here we'll get a compilation error, we need define the shape of props to this component using an interface.

```jsx
{
  /*define the shape of props*/
}
interface ListItemProps {
  active: boolean;
}
{
  /* now we need template literal for Js/Ts to set the 
  property dynamically based on the active props */
}
const ListItem =
  styled.li <
  ListItemProps >
  `
  padding: 5px 0;
  background: ${(props) => (props.active ? "dodgeblue" : "none")}
`;

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <List>
        {items.map((item, index) => (
          <ListItem
            key={item}
            active={index === selectedIndex}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </>
  );
}
```

# Seperation of concerns

Divide a program into distinct sections where each section handles a specific functionality, rather than having everything in one place.

With this our app will be:

- Modular
- Easier to understand
- Easier to maintain
- Easier to modify

Modularity provide a number of benifits, if our program is modular, we can build and test those modules independently and reuse them in other programs. In Modular programs, each module is responsible for one concern.

In a modul, all of the complexity and implementation details are hidden behind a well-defined interface.

Some people argue that CSS-in-js violates the **Seperation of concerns** principles because we put everything in the same file, but Separation of concerns is not just about organizing code into files, but rather dividing areas of functionality, each section of a program should handle specific functionalities. Therefore, CSS-in-JS does not violate the separation of concerns principle as all the complexity for a component remains hidden behind its interface.

# Inline styles

Although inline styles are easy to apply, they can make our code difficult to read and maintain over time and should only be used as a last resort.

Exp:

```jsx
<ul className="list-group" style={{backgroundColor: "yellow"}}>
{/*every css attributes are available here, but named differently like 'backgroundColor' here instead of background-color */}
```

# Popular UI Libraries

There are several UI libraries available that can assist us in quickly building beautiful and modern applications. Some popular options includes:

- Bootstraps
- Material UI
- TailwindCSS
- DaisyUI
- ChakraUI

As we saw, **Bootstrap** has some ready-to-use component that are publicly available

**Material UI** is an open source React component library that implment google materials design, it's the design language used in google product

**TailwindCSS** is a utility first css library, instead of giving full component, it gives us small utility classes that we can use to style our component. this one may lead to a lot of utility classes in our markup.

**DaisyUI** give us full flesh component with cleaner markup, instead of using utility classes, we can use component like 'alert alert-success', 'avatar' .... it is similair to Bootstrap

**ChakraUI** is similair to **Material UI** it's a React component library that is build on top of tailwind, it is not as comprehensive as **Material UI** but it has all the essential UI component and very easy to learn

# Adding icons

To add icons we are using popular library called React-icons, here's how to install it:

```cmd
npm i react-icons@4.7.1
```

You can search in theire website for icons, React-icons is essentially a package of different icon libraries (Ant design Icons, Bootstrap Icons, BoxIcons...), every icon has a prefix that is short for icon library (Ai for exp stand for Ant design Icons, Bs stand for Bootstrap...). When you find the one that you like, you only need to click to copy it and import it in ur component

```jsx
// this essentially a react component
import { BsFillCalendarFill } from "react-icons/bs";
// PS: because this component start with 'Bs' we need to go to the Bs library '/Bs

function App() {
  return (
    <div>
      <BsFillCalendarFill color="red" size="40" />
    </div>
  );
}
```

# Exercise: Using CSS Modules

# Building a Like Component
