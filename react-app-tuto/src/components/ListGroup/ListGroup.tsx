import { useState } from "react";
import styles from "./ListGroup.module.css"; //or like that below this
// import "./ListGroup.module.css";
// import "./ListGroup.css";
// you need to change that when making your css file as module

// ///////////////////////////////////////////////////////////////////////////
// CSS Modules

// Passing Data and Functions via Props
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

// function ListGroup(props: Props), we destructure the Props parameter
function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      {/*Do not forget to replace the List with the heading dynamically*/}
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      {/* <ul className="list-group"> 
      you need to chnage the className value*/}
      <ul className={[styles.listGroup, "list-group"].join(" ")}>
        {/* PS: styles.list-group: this won't work bcs its not valid property 
        name in js or ts, we can't acces it with dot notation */}
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

// ///////////////////////////////////////////////////////////////////////////
//
// import { useState } from "react";

// function ListGroup() {
//   const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

//   const [selectedIndex, setSelectedIndex] = useState(-1);

//   if (items.length === 0)
//     return (
//       <>
//         <h1>List</h1>
//         <p>No item found</p>
//       </>
//     );

//   return (
//     <>
//       <h1>List</h1>
//       <ul className="list-group">
//         {items.map((item, index) => (
//           <li
//             className={
//               selectedIndex === index
//                 ? "list-group-item active"
//                 : "list-group-item"
//             }
//             key={item}
//             onClick={() => {
//               setSelectedIndex(index);
//             }}
//           >
//             {item}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }
// //
// //
// //
// // import { Fragment } from "react";

// const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

// function ListGroup() {
//   return (
//     <>
//       <h1>List</h1>
//       <ul>
//         {items.map((item) => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//     </>
//   );
// }
//
//
//
// function ListGroup() {
//   return (
//    <Fragment>
//     <ul className="list-group">
//       <li className="list-group-item">An item</li>
//       <li className="list-group-item">A second item</li>
//       <li className="list-group-item">A third item</li>
//       <li className="list-group-item">A fourth item</li>
//       <li className="list-group-item">And a fifth one</li>
//     </ul>
//    </Fragment>
//   );
// }

export default ListGroup;
