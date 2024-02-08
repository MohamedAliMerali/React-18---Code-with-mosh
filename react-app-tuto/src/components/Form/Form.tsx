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

// //////////////////////////////////////////////////////////////////////////
// import { FieldValues, useForm } from "react-hook-form";

// const Form = () => {
//   interface FormData {
//     name: string;
//     age: number;
//   }

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }, // nested Destructure
//   } = useForm<FormData>();

//   console.log(errors);
//   const onSubmit = (data: FieldValues) => console.log(data);
//   // PS: we'll have an error in data, bcs ts compiler doesn't know the type of it
//   // We need to wrap it in parenthesis and annotate it with `FieldValues`, which is defined in the react hook Form library.
//   // You can see its type by hovering over `data var on the `onSubmit` attribute in the form element.

//   return (
//     // now we can pass onSubmit instead of arrow function
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* <form onSubmit={handleSubmit(data => console.log(data))}> */}
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">
//           Name
//         </label>
//         <input
//           {...register("name", { required: true, minLength: 3 })}
//           id="name"
//           type="text"
//           className="form-control"
//         />
//         {/* this expression is evaluated only if we have a property called name */}
//         {/* otherwise, its ignored  */}
//         {errors.name?.type === "required" && (
//           <p className="text-danger">The name field is required</p>
//         )}
//         {errors.name?.type === "minLength" && (
//           <p className="text-danger">The name must be at least 3 char</p>
//         )}
//       </div>
//       <div className="mb-3">
//         <label htmlFor="age" className="form-label">
//           Age
//         </label>
//         <input
//           {...register("age")}
//           id="age"
//           type="number"
//           className="form-control"
//         />
//       </div>
//       <button className="btn btn-primary">Submit</button>
//     </form>
//   );
// };

// //////////////////////////////////////////////////////////////////////////
// // using useState instead of useRef
// import { FormEvent, useState } from "react";

// const Form = () => {
//   const [person, setPerson] = useState({ name: "", age: "" });

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();
//     console.log(person);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">
//           Name
//         </label>
//         <input
//           onChange={(event) =>
//             setPerson({ ...person, name: event.target.value })
//           }
//           value={person.name}
//           // the input field now will always rely on the val in our state var
//           // and that to make react the only source of truth.
//           id="name"
//           type="text"
//           className="form-control"
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="age" className="form-label">
//           Age
//         </label>
//         <input
//           onChange={(event) =>
//             setPerson({ ...person, age: event.target.value })
//           }
//           value={person.age}
//           id="age"
//           type="number"
//           className="form-control"
//         />
//       </div>
//       <button className="btn btn-primary">Submit</button>
//     </form>
//   );
// };

// //////////////////////////////////////////////////////////////////////////
// // using useRef
// import { FormEvent, useRef } from "react";

// const Form = () => {
//   const nameRef = useRef<HTMLInputElement>(null);
//   const ageRef = useRef<HTMLInputElement>(null);
//   const person = { name: "", age: 0 };

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault(); // default behaviour is to releaod the page
//     if (nameRef.current !== null) person.name = nameRef.current.value;
//     if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
//     console.log(person);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">
//           Name
//         </label>
//         <input id="name" ref={nameRef} type="text" className="form-control" />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="age" className="form-label">
//           Age
//         </label>
//         <input id="age" ref={ageRef} type="number" className="form-control" />
//       </div>
//       <button className="btn btn-primary">Submit</button>
//     </form>
//   );
// };

export default Form;
