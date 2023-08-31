import { useState } from "react";
import ShoppingCart from "../ShoppingCart";
import NavBar from "../NavBar";

// Sharing states between components
const ShoppingApp = () => {
  // in a real world application, instead of string we have objects
  // that contain Ids and several details about our products
  const [cartItems, setCartItems] = useState([
    "Product1",
    "Product2",
    "Product3",
  ]);

  return (
    <div>
      <NavBar cartItemsCount={cartItems.length}></NavBar>
      <ShoppingCart cartItems={cartItems}></ShoppingCart>
    </div>
  );
};

export default ShoppingApp;
