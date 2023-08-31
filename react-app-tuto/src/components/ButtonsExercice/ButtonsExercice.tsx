// Interface
interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger"; // .....
  //   color?: string;
  onClickButton: (children: string) => void;
}

const ButtonsExercice = ({ children, color = "primary", onClickButton }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={() => onClickButton(children)}
    >
      {children}
    </button>
  );
};
// // My sol
// function ButtonsExercice({ text, DynamicClass, onClickButton }: Props) {
//   return (
//     <button
//         type="button"
//         className={"btn " + DynamicClass}
//         onClick={() => onClickButton(children)}>
//       {text}
//     </button>
//   );
// }

// App
// function App() {
//     const DynamicClass = "btn-primary";
//     return (
//       <ButtonsExercice
//         text="Ma bro"
//         DynamicClass={DynamicClass}
//       ></ButtonsExercice>
//     );
//   }

export default ButtonsExercice;
