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

#

#

#

#

#

#

# Resources

1. https://blog.hubspot.com/website/react-js
