//
let count = 0;

const PureMessage = () => {
  console.log("Message called:", count);
  count++;
  return <div>Message {count}</div>;
};

export default PureMessage;
