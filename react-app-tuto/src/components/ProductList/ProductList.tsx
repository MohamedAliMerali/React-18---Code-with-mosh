import { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  // We refer to the fucntion that we pass here a callback function, because React is going to call this function back.
  useEffect(() => {
    console.log("Fetching products in", category);
    setProducts(["Clothing", "Household"]);
  }, [category]);

  return <div>ProductList</div>;
};

export default ProductList;

// // App component
// function App() {
//     const [category, setCategory] = useState("");

//     return (
//       <div>
//         <select
//           name=""
//           id=""
//           className="form-select"
//           onChange={(event) => setCategory(event.target.value)}
//         >
//           <option value=""></option>
//           <option value="Clothing">Clothing</option>
//           <option value="Household">Household</option>
//         </select>
//         <ProductList category={category} />
//       </div>
//     );
//   }
