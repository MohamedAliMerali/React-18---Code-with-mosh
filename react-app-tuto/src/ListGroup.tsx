// import { Fragment } from "react";

let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
// items = [];

function ListGroup() {
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
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
//
//
//
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
