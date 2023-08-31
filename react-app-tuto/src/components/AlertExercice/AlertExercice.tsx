interface AlertProps {
  alertText: string;
  onClose: () => void
}

const AlertExercice = ({ alertText, onClose}: AlertProps) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show">
      <strong>{"ma Negga " + alertText}</strong>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default AlertExercice;
