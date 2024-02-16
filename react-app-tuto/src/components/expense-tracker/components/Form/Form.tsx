import { zodResolver } from "@hookform/resolvers/zod";
import CATEGORY from "../../data/category";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";

const Form = ({ onSubmit }: { onSubmit: (data: FieldValues) => void }) => {
  const schema = z.object({
    description: z.string().min(3, {
      message: "Description must be at least 3 charecters long",
    }),
    amount: z
      .number({ invalid_type_error: "Age Field is required" })
      .min(1, { message: "Amount must be at least 1$" }),
    category: z.string().min(1),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      className="mb-4"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <input
          {...register("description")}
          className="form-control"
          type="text"
          id="description"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="amount">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          className="form-control"
          type="number"
          id="amount"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="category">
          Category
        </label>
        <select
          {...register("category")}
          className="form-control"
          id="category"
        >
          <option value=""></option>
          {CATEGORY.map((categ) => (
            <option key={categ.toLowerCase()} value={categ.toLowerCase()}>
              {categ}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
