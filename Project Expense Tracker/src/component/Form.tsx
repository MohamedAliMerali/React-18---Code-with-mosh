import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Button from "./Button";

const schema = z.object({
  descreption: z.string().min(3, {
    message: "Descreption must be at least 3 charecters long",
  }),
  amount: z
    .number({ invalid_type_error: "Amount Field must be a number" })
    .min(1, { message: "Amount must be at least 1" }),
  category: z.string().min(1, { message: "Please select an option" }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // {descreption: 'Milk', amount: 5, category: 'groceries'}
  const [expenses, setExpenses] = useState<FieldValues[]>([
    { descreption: "Milk", amount: 10, category: "groceries" },
    { descreption: "Eggs", amount: 5, category: "groceries" },
    { descreption: "Hammer", amount: 30, category: "utilities" },
    { descreption: "Movie", amount: 15, category: "entertainment" },
  ]);
  const [selectedCateg, setSelectedCateg] = useState("all");

  const onSubmit = (data: FieldValues) => {
    console.log("data", data);
    // desc, amount, categ
    setExpenses([...expenses, data]);
  };

  const handleDelete = (indexToDelete: number) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses];
      updatedExpenses.splice(indexToDelete, 1);
      return updatedExpenses;
    });
  };

  return (
    <>
      <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="form-label" htmlFor="descreption">
            Descreption:
          </label>
          <input
            {...register("descreption")}
            className="form-control"
            id="descreption"
            type="text"
          />
          {errors.descreption && (
            <p className="text-danger">{errors.descreption.message}</p>
          )}
        </div>
        <div>
          <label className="form-label" htmlFor="amount">
            Amount:
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            className="form-control"
            id="amount"
            type="number"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div>
          <label className="form-label" htmlFor="category">
            Category:
          </label>

          <select
            {...register("category")}
            className="form-select"
            id="category"
            name="category"
          >
            <option value="" selected disabled>
              Select a category
            </option>
            <option value="groceries">Groceries</option>
            <option value="utilities">utilities</option>
            <option value="entertainment">Entertainment</option>
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <div>
          <button className="btn btn-primary mt-3" type="submit">
            Submit
          </button>
        </div>
      </form>

      <div className="m-3">
        <select
          className="form-select"
          id="selectedCateg"
          name="category"
          onChange={(event) => {
            console.log(event.target.value);
            setSelectedCateg(event.target.value);
          }}
        >
          <option value="all">All categories</option>
          <option value="groceries">Groceries</option>
          <option value="utilities">utilities</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Descreption</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {/* {descreption: 'Milk', amount: 5, category: 'groceries'} */}
            {/* {selectedCateg === "all"
              ? expenses.map((exp, index) => (
                  <tr key={index}>
                    <td>{exp.descreption}</td>
                    <td>${exp.amount}</td>
                    <td>{exp.category}</td>
                    <td></td>
                  </tr>
                ))
              : expenses
                  .filter((exp) => exp.category === selectedCateg)
                  .map((exp, index) => (
                    <tr key={index}>
                      <td>{exp.descreption}</td>
                      <td>${exp.amount}</td>
                      <td>{exp.category}</td>
                      <td></td>
                    </tr>
                  ))
                } 
            */}

            {expenses
              .filter(
                (exp) =>
                  selectedCateg === "all" || exp.category === selectedCateg
              )
              .map((exp, index) => (
                <tr key={index}>
                  <td>{exp.descreption}</td>
                  <td>${exp.amount}</td>
                  <td>{exp.category}</td>
                  <td>
                    <Button onClick={() => handleDelete(index)}></Button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>
                $
                {expenses
                  .filter(
                    (exp) =>
                      selectedCateg === "all" || exp.category === selectedCateg
                  )
                  .reduce((acc, exp) => acc + exp.amount, 0)}
              </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Form;
