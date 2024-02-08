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

To handle submit event, we need to go to the form, and handle **`onSubmit`** the same way we handle click event.

one thing you need to pay attention to is after submitting the form, the page will be reloaded by default bcs the page will be submitted to the server, and every message loged on the console will disappear, we need to prevent that by using `event.preventDefault();`.

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
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

# Accessing input Fields with useRef

**`useRef`** is another Hook in React that we can use to reference a DOM element, we can use this Hook to reference an input field and read its value when the form get submitted.

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
  // - all input field has value property
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
  <br> &emsp; So to tell Ts compiler we're referencing HTML input element, here when calling this Hook we use the code provided below, `HTMLInputElement` is one of the standard interfaces defined in old browsers that represent html input element.

```tsx
useRef<HTMLInputElement>(null);
```

- We initialized every ref object with null! well, the current property of ref object, references a DOM node, the initial value that we pass will be used to set the current property.
  <br> &emsp; Initially when we create a ref obj we don't have access to DOM node, because the DOM is created after React renders our component, so we really don't have intial value to provide there.
  <br> &emsp; When React render our component and create the DOM, it will set the current property to a DOM node and it will set it back to null when the node is removed from the screen.
  <br> &emsp; So it should be null or an existing DOM node, if we don't supply an initial value there, the current property will be undefined and it may cause some issues that's why we should initialize the ref object with null.

- Bonus:

```tsx
event.preventDefault();
console.log("event", event);
console.log("nameRef", nameRef);
console.log("ageRef", ageRef);
if (nameRef.current) person.name = nameRef.current.value;
if (ageRef.current) person.age = parseInt(ageRef.current.value);
console.log("person", person);
```

- Result

```cmd
SyntheticBaseEvent {_reactName: 'onSubmit', _targetInst: null, type: 'submit', nativeEvent: SubmitEvent, target: form, ...}
nameRef > {current: input#name.form-control}
ageRef > {current: input#age.form-control}
person > {name: 'Med', age: 23}
```

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
  value={person.age}
  // the input field now will always rely on the val in our state var
  // and that's to make react the only source of truth.
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
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
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

Here we got an object with four properties, `name` `onBlur` `onChange` `ref`. React hook form use ref object to get values from input fields, so there is no re-rendering here.

Back to our component, instead of `onChange` and `value` attributes, we're going to type braces and call the register function and give it a key like "name", this function returns an object, so if we spread that object, all of its properties will be added to the input fields.

```tsx
<input { ...register('name') } id="name" type="text" className="form-control" />
<input { ...register('age') } id="age" type="number" className="form-control"/>
```

Now we no longer need the state Hook to make a person object, and we don't need handleSubmit for now. We simply call useForm, grab an object and destructure it.

In that object we also have a function called `handleSubmit`, and as an argument we give it **submitHandler**, it is just a function that receives the data in this form, so here we can pass an arrow function to log the data, so when we submit this form, react Hook form will run that arrow function, we will get the result from person object.

Also, In real world applications we wanna a function to handle all the logic when submitting a form

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
  // You can see its type by hovering over `data` var on the `onSubmit` attribute in the form element.

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
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};
```

# Applying Validation

As a part of Submitting a form, the user should submit a value and it should be at least 3 char long.

As second arguments her we can pass an object that have the standard HTML attribute for data validation. when trying to submit the form we won't see the data object, bcs react Hook form only call the handler function if the form is valid, at this point we wanna show an an error message to the user.

```tsx
<input
  {...register("name", { required: true, minLength: 3 })}
  id="name"
  type="text"
  className="form-control"
/>
```

To show an error message to the user, first we wanna grab a property called `formState`, in this object we have properties like: `errors`, `isLoading`, `isValid` `isValidating`...

error object will be empty at first, but when submitting the form without supplying a name we'll have an error for the **name field** of type **required**, if we type single char, we'll have an error of type length.

```tsx
const {
  register,
  handleSubmit,
  formState: { error }, // nested Destructure
} = useForm();
```

```tsx
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

We can use this object to show validation messages to the user for example we can add paragraph for each type of error.

```tsx
<input
  {...(register("name"), { required: true, minLength: 3 })}
  id="name"
  type="text"
  className="form-control"
/>;

{
  // optional chaining: ?
  errors.name?.type === "required" && (
    <p className="text-danger">The name field is required</p>
  );
}
{
  // optional chaining: ?
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
  /* after that we pass to the form hook, the interface that represent the shape of this form */
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

interface FormData {
  name: string;
  age: number;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  console.log(errors);
  const onSubmit = (data: FieldValues) => console.log(data);
  // PS: we'll have an error in data, bcs ts compiler doesn't know the type of it
  // We need to wrap it in parenthesis and annotate it with `FieldValues`, which is defined in the react hook Form library.
  // You can see its type by hovering over `data` var on the `onSubmit` attribute in the form element.

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
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};
```

# Schema based Validation with Zod

As our form get more complex, we'll end up with a lot of validation rules, all over the place, in that case it's better to use a technique called, Schema based validation.

There is a various libraries out there that allow us to define all of our validation rules in a single place which we called **`schema`**, for exp we have:

- Joi
- Yup
- Zod

We're using Zod here because it has been tranding lately. we're just going to see the basics because there is more in Zod then we can see in this Course. here's how to install Zod

```cmd
npm i zod@3.20.6
```

We import { z } from zod, using the 'z' we can define the shape or schema for our form and all the validations rules.

Then we call `Z.object` mehtod and as an argument we pass a configuration object with properties that represent the shape of our form(name, age for our exp here), and we add the type and the rules for each, zod has many helper methods that allow us to define various validation rules, for exp we can say this number has to be positive or negative or whatever...

this will return an object that we can store in a constant called `schema`, we can call it anything but schema is a common name.

```tsx
import { z } from "zod";
```

```tsx
const schema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 charecters",
  }),
  age: z
    .number({ invalid_type_error: "Age Field is required" })
    .min(18, { message: "Age must be at least 18" }),
});
```

Now, we can see some duplication in our code, there is 2 places where we defined the shape of our form, something great about zod is there is a method where it allows us to extract the type from a schema object, no need to type that interface by hand. so using the type we can defined the shape of our object. we store the result in a `type` called **FormData**.

if you hover your mouse over `FormData` you can see that FormData represent an object with 2 properties, name(string) and age(number), so TS Type is similair to TS Interface.

```tsx
type FormData = z.infer<typeof schema>; // return TS type, similair to an interface.
```

That was the first step, using Zod we defined a schema for our form, now we need to integrate react hook form with zod. using the terminal, you need to install **`hookform/resolvers`**, this library include **`resolvers`** for various schema based validation libraries.

```cmd
npm i @hookform/resolvers
```

Now, on the top, we import **`zodResolvers`** from '@hookform/resolvers/zod', now when calling form hook we pass a configuration object, we set **resolvers** to **zodresolvers** function that we imported, then we pass our schema object.

```tsx
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

z.object({
  name: z.string.min(3)
  age: z.number.min(18)
})

type FormData = z.infer<typeof schema>;

.
.
.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

```

Now, we need to consolidate our error messages, first we need to remove the validation rules bcs all validation rules are defined in our schema.
Also, we don't need seperate paragrpah elements for different error messages, instead, we're going to have only one with changing the boolean expression, we no longer needs to check for the type, we just wanna check for a property called name in the error object, if we have that then, instead of hard coding the paragraph we render it dynamically from `error.name.message`. so zod will take care of generating error messages based on that schema that we defined.

```tsx
{
  errors.name && <p className="text-danger">{errors.name.message}</p>;
}
{
  errors.age && <p className="text-danger">{errors.age.message}</p>;
}
```

we can also customize the error messages in case you don't like the default ones, to get a more friendly error message.

for teh age field, when we submit the form without a number, we'll get the error **expected number, received nan**, to provide more friendly message, we pass an object to the number method from z as you can see below, wihtout forgetting the message for minAge.

```tsx
const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 charecters." }),
  age: z
    .number({ invalid_type_error: "Age Field is required" })
    .min(18, { message: "Age must be at least 18" }),
});
```

    PS: in the age field, you'll get an error that says 'expected number, received string' the reason for this is bcs the value property of input fields always returns a string, we need to instruct react hook form to interpret this value as a number, where we register the age field.

```tsx
{...register("age", { valueAsNumber: true })}
```

Now, Here's The complete Code

```tsx
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 charecters." }),
  age: z
    .number({ invalid_type_error: "Age Field is required" })
    .min(18, { message: "Age must be at least 18" }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  console.log(errors);
  const onSubmit = (data: FieldValues) => console.log(data);
  // PS: we'll have an error in data, bcs ts compiler doesn't know the type of it
  // We need to wrap it in parenthesis and annotate it with `FieldValues`, which is defined in the react hook Form library.
  // You can see its type by hovering over `data` var on the `onSubmit` attribute in the form element.

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
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};
```

# Disabling the Submit Button

Last thing we're going to do is disabling the submit button if the form is invalid,back to our code where we're grabing the errors from our form state, we also have a property called `isValid` which we can use to tell if our form is valid or not.

```tsx
const {
  register,
  handleSubmit,
  formState: { errors }, // Here
} = useForm<FormData>({ resolver: zodResolver(schema) });
```

Down to our button, we can set the `disabled` attribute to `!isValid` so the button will be disabled if the form is not valid,

```tsx
<button disabled={!isValid} className="btn btn-primary" type="submit">
  Submit
</button>
```

# Questions

1. Hmmm...

```

```
