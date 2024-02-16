interface Props {
  children: string;
  className: string;
  handleClick: () => void;
}

const Button = ({ children, className, handleClick }: Props) => {
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
