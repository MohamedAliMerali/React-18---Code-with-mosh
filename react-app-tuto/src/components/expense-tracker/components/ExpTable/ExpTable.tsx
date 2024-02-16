import Button from "../Button";

interface Expenses {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface ExpensesData {
  expenses: Expenses[];
  onDelete: (id: number) => void;
}

const ExpTable = ({ expenses, onDelete }: ExpensesData) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense: Expenses) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>
              <Button
                className={"btn btn-outline-danger"}
                handleClick={() => onDelete(expense.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            $
            {expenses.reduce((acc, item) => {
              return acc + item.amount;
            }, 0)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpTable;
