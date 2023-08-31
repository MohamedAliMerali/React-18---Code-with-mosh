import { useState } from "react";

function Drink() {
  const [drink, setDrink] = useState({
    name: "Americano",
    price: 15,
    count: 5,
  });

  const handleClick = () => {
    // // 1st way
    // const newDrink = {
    //   name: "Americano",
    //   price: 15,
    //   count: drink.count + 1,
    // };
    // setDrink(newDrink);

    // // 2nd way
    // setDrink({
    //     name: drink.name,
    //     price: drink.price,
    //     count: drink.count + 1,
    // });

    // 3rd way, the best one
    setDrink({
      ...drink,
      count: drink.count + 1,
    });
  };

  return (
    <div>
      <button onClick={handleClick}> Click Me to updtae drinks </button>
      {drink.count}
    </div>
  );
}

export default Drink;
