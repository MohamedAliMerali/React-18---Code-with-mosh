//  Here we have two options:
// 1st: to pass all the cartItems as an array: cartItems: string[]
// 2nd: pass only the count

// If we only needs the count it is better to pass it, but if it needs
// the cartItems, then we it is better to pass all of them here
interface Props {
  cartItemsCount: number;
}

const NavBar = ({ cartItemsCount }: Props) => {
  return <div>NavBar: {cartItemsCount}</div>;
};

export default NavBar;
