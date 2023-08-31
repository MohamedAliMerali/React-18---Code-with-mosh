# Building Forms

It is an essential part of many web apps, in this section we'll learn how to builds forms with react and a couple of third partie libraries, we'll be using React Hook Forms, and Zod for Data validation.

## keywords:

        - React Hook Forms
        - Zod
        - onSubmit
        - preventDefault()
        - useRef
        - <HTMLInputElement>
        -
        -

# Building a Form

First things first, we're gonna build a form and add some bootstrap classes to give a nice and modern look and feel.

# Handling Form Submission

To handle submit event, we need to go to thr form, and handle **`onSubmit`** the same way we handle click event.

one thing you neeed to pay attention to is after submitting the form, the page will be reloaded by default bcs the page will be submitted to the server, and every message loged on the console will disappear, we need to prevent that by using `event.preventDefault();`.

event is of type `FormEvent` and needs to be imported, when not using the type Ts compiler will give an error.

```tsx
import { FormEvent } from "react";

const Form = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // default behaviour is to releaod the page
    console.log("Submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input id="age" type="number" className="form-control" />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Form;
```

# Accessing input Fields with useRef

**`useRef`** is another Hook in React that we can use to reference a DOM element, we can use this Hook to reference an input field and read its value when the fomr get submitted.

```tsx
// passing null is a common practise
// this return a reference object
const nameRef = useRef<HTMLInputElement>(null);
const ageRef = useRef<HTMLInputElement>(null);
const person = { name: "", age: 0 }; // this obj will be sent to the server

const handleSubmit = (event: FormEvent) => {
  event.preventDefault(); // default behaviour is to releaod the page
  // - ref object has a single property that is current,
  //   and it return the DOM element we're referencing
  // - all input field ahs value property
  if (nameRef.current !== null) person.name = nameRef.current.value; // null check
  if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
  // age property is a number but value is a string, we need parseInt
  console.log(person);
};
```

To associate a reference object with an input field we need to pass it to **`ref`** attribute.

```tsx
<input id="name" ref={nameRef} type="text" className="form-control" />
<input id="age" ref={ageRef} type="number" className="form-control" />
```

There is some point you wanna know:

- `ref` object has a single property that is `current`, and it return the DOM element we're referencing.

- when using `nameRef.current.value`, you'll get an error, it says that `nameRef.current` may be `null`, you need to do an null check.

- you'll get now another compilation error from `.value` says that Property `value` does not exist on type `never`, bcs Ts compiler doesn't know we're referencing HTML input element, bcs using the **ref Hook**, we can reference any kind of element in the DOM! not only input fields, we can reference a button, a heading, lists...
  <br> &emsp; So to tell Ts compiler we're referencing HTML inpu element, here when calling this Hook we use the code provided below, `HTMLInputElement` is one of the standard interfaces defined in old browsers that represent html input element.

```tsx
useRef<HTMLInputElement>(null);
```

- We initialized every ref object with null! well, the current property of ref object, references a DOM node, the initial value that we pass will be used to set the current property.
  <br> &emsp; Initially when we create a ref obj we don't have access to DOM node, because the DOM is created after React renders our component, so we really don't have intial value to provide there.
  <br> &emsp; When React render our component and create the DOM, it will set the current property to a DOM node and it will set it back to null when the node is removed from the screen.
  <br> &emsp; So it should be null or an existing DOM node, if we don't supply an initial value there, the current property will be undefined and it may cause some issues that's why we should initialize the ref object with null.

# Controlled components

Instead of **ref Hook** we can use **State Hook** to get the values of a form.

All input fields have this **change event** that is triggered every time the user type a key, we can handle this event and update our state variables every time the user type something in the input field.

So we set the `onChange` attribute to a function, in that function we update the name property of that person object. To get the value of that function field we give that function a parameter called `event`, to access the input field from `event.target` and then we can read the value property.

we simply log the person object when submitting the form.

```tsx
<input
  onChange={(event) => setPerson({ ...person, name: event.target.value })}
  id="name"
  type="text"
  className="form-control"
/>;

<input
  onChange={(event) =>
    setPerson({ ...person, age: parseInt(event.target.value) })
  }
  id="age"
  type="number"
  className="form-control"
/>;
```

One thing you need to know about this approach is that everytime the user add/remove a character the component will re-render, it's no big issue but some people make a big deal out of it bcs it is slower so it's better to use `Ref Hook`.

If you have a really complex form page with a lot of element and you observe performance issues with this approach, then you can use the ref Hook, but for most cases u'r not gonna experience that.

Now, we have a tiny problem in this implementation, every html input fields have `value` property to maintain their own state, but in this implementation we also have state variable called `person`, so it is possible that this sources get out of synch, to solve this, we need to make react a single source of truth.

```tsx
<input
  onChange={(event) =>
    setPerson({ ...person, age: parseInt(event.target.value) })
  }
  value={person.name}
  // the input field now will always rely on the val in our state var
  // and that to make react the only source of truth.
  id="age"
  type="number"
  className="form-control"
/>
```

One small thing, now after using `value` property, the name or age will contain the value of 0 by default, it is ugly. we can solve that by initializing the age property to empty string.

```tsx
import { FormEvent, useState } from "react";

const Form = () => {
  // initializing age to empty string to avoid the default 0 val
  // in the number field, which appeared when we set the value property to the age var inside person object
  const [person, setPerson] = useState({ name: "", age: "" });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          onChange={(event) =>
            setPerson({ ...person, name: event.target.value })
          }
          value={person.name}
          // the input field now will always rely on the val in our state var
          // and that to make react the only source of truth.
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          onChange={(event) =>
            setPerson({ ...person, age: event.target.value })
          }
          value={person.age}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
```

# Managing Forms with React Hook Forms

As our form gets larger and more complex, managing the form state with the state Hook can become time-consuming, for every input field you have to set two values, on `onChange` and `value`, This is where we can use a popular library called, **react Hook form**, with this library, we can quickly build forms with less code.

```cmd
npm i react-hook-form@7.43
```

Back to our component, we're going to import custom hook from our library called `useForm` and then calls it to get form object.

```tsx
import { useForm } from "react-hook-form";

const Form = () => {
  const form = useForm();
  console.log(form);
  // ....
  // ....

  // ....
};
```

By logging and inspecting this object, we can see the methods and properties it has, we can find the `register` method to register the input fields with react hook form, basically, we have a bunch of functions to programmatically control our form.

Back to our code, let's destructure our form object and grab the register function, lets's call it and give it an argument which is the name of an input field, like the name.

```tsx
import { useForm } from "react-hook-form";

const Form = () => {
  const { register } = useForm();
  console.log(register("name"));
};
```

Here we got an object with four properties, `name` `onBlur` `onChange` `ref`. React hook form, use ref object to get values from input fields, so there is no re-rendering here.

Back to our component, instead of `onChange` and `value` attributes, we're going to type braces and call the register function and give it a key like "name", this function returns an object, so if we spread that object, all of its properties will be added to the input fields.

```tsx
<input { ...register('name') } id="name" type="text" className="form-control" />
<input { ...register('age') } id="age" type="number" className="form-control"/>
```

Now we no longer need the state Hook to make a person object, and we don't need handleSubmit for now. We simply call useForm, grab an object and destructure it.

In that object we also have a function called `handleSubmit`, and as an argument we give it **submitHandler**, it is just a function that receives the data in this form, so here we can pass an arrow function to log the data, so when we submit this form, react Hook form will run that arrow function, we will get the result from person object.

Also, In real worl applications we wanna a function to handle all the logic when submitting a form

```tsx
import { useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => console.log(data);
  // PS: we'll have an error in data, bcs ts compiler doesn't know the type of it
  // We need to wrap it in parenthesis and annotate it with `FieldValues`, which is defined in the react hook Form library.
  // You can see its type by hovering over `data var on the `onSubmit` attribute in the form element.

return (
  // now we can pass onSubmit instead of arrow function
  <form onSubmit={handleSubmit(onSubmit)}>
    // ... // ... // ...
  </form>;
)};
```

```tsx
import { FieldValues, useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm();
  console.log(register("name")); // name of input field
  const onSubmit = (data: FieldValues) => console.log(data);
  // PS: we'll have an error in data, bcs ts compiler doesn't know the type of it
  // We need to wrap it in parenthesis and annotate it with `FieldValues`, which is defined in the react hook Form library.
  // You can see its type by hovering over `data var on the `onSubmit` attribute in the form element.

  return (
    // now we can pass onSubmit instead of arrow function
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <form onSubmit={handleSubmit(data => console.log(data))}> */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age")}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
```

# Applying Validation

As a part of Submitting a form; the user should submit a value and it should be at least 3 char long.

As second arguments her we can pass an object that have the standard HTML attribute for data validation. when trying to submit the form we won't see the object, bcs react Hook form only call the handler function if the form is valid.

```tsx
<input
  {...(register("name"), { required: true, minLength: 3 })}
  id="name"
  type="text"
  className="form-control"
/>
```

To show an error message to the user, first we wanna grab a property called `formState`, in this object we have properties like: `errors`, `isLoading`, `isValid` `isValidating`...

error object will be empty at first, but when submitting the form without supplying a name we'll have an error for the name **field** of type **required**, if we type single char, we"ll have an error of type length.

```tsx
const {
  register,
  handleSubmit,
  formState: { error },
} = useForm();

console.log(formState);
console.log(formState.errors);
{
  /* The result: 
{name: {…}}
  name: message: ""
    ref: input#name.form-control
    type: "minLength"
    [[Prototype]]: Object
    [[Prototype]]: Object
*/
}
```

    PS: we can destructure our `formState` since we're using it in multiple places, that's what we call  `nested Destructure`.

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
```

We can use this object to show validation messages to the user for example we can add paragraph for each type of error.

```tsx
<input
  {...(register("name"), { required: true, minLength: 3 })}
  id="name"
  type="text"
  className="form-control"
/>;

{
  errors.name?.type === "required" && (
    <p className="text-danger">The name field is required</p>
  );
}
{
  errors.name?.type === "minLength" && (
    <p className="text-danger">The name must be at least 3 char</p>
  );
}
{
  /*PS: text-danger class was added from bootstrap to make the text red*/
}
```

    PS: this question mark is called optional chaining in js, the reason we needs it is because errors object can be empty, if they don't have name property and then we try to access the type property, we'll get a runtime error.

    PS: To see the name of our input fields we need to give ts compiler an interface to define the shape of this form.

```tsx
{
  /* you can call it anything but FormData is a common name */
  /* we can say that our form has 2 fields */
  /* after that we pass to the form hook, the interface that represent the sape of this form */
}

interface FormData {
  name: string;
  age: number;
}

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>();
```

And now Here's our complete code:

```tsx
import { FieldValues, useForm } from "react-hook-form";

const Form = () => {
  interface FormData {
    name: string;
    age: number;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  console.log(errors);
  const onSubmit = (data: FieldValues) => console.log(data);
  // PS: we'll have an error in data, bcs ts compiler doesn't know the type of it
  // We need to wrap it in parenthesis and annotate it with `FieldValues`, which is defined in the react hook Form library.
  // You can see its type by hovering over `data var on the `onSubmit` attribute in the form element.

  return (
    // now we can pass onSubmit instead of arrow function
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <form onSubmit={handleSubmit(data => console.log(data))}> */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name", { required: true, minLength: 3 })}
          id="name"
          type="text"
          className="form-control"
        />
        {/* this expression is evaluated only if we have a property called name */}
        {/* otherwise, its ignored  */}
        {errors.name?.type === "required" && (
          <p className="text-danger">The name field is required</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">The name must be at least 3 char</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age")}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
```

# Schema based Validation with Zod

```tsx

```

# Questions

1. Hmmm...

```

```
