//
// import ListGroup from "./components/ListGroup";
//
// that's ugly, we can use index.ts file instead
// import ListGroup from "./components/ListGroup/ListGroup";
//
// import Alert from "./components/Alert";
// import ListGroup from "./components/ListGroup";
// import Message from "./Message";

// ///////////////////////////////////////////////////////////////////////////
import Form from "./components/Form";

function App() {
  return (
    <>
      <Form></Form>
    </>
  );
}
// ///////////////////////////////////////////////////////////////////////////
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
