interface Props {
  onClick: () => void;
}

const Button = ({ onClick }: Props) => {
  return (
    <button className="btn btn-outline-danger" onClick={onClick}>
      Delete
    </button>
  );
};

export default Button;
