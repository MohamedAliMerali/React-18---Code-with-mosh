import { useRef } from "react";
import CATEGORY from "../../data/category";

interface Props {
  onChange: (selectedCateg: string) => void;
}

const Filter = ({ onChange }: Props) => {
  const categRef = useRef<HTMLSelectElement>(null);
  return (
    <div className="mb-4">
      <select
        ref={categRef}
        className="form-control"
        id="category"
        onChange={() => {
          if (categRef.current) onChange(categRef.current.value);
        }}
      >
        <option value="">All categories</option>
        {CATEGORY.map((categ) => (
          <option key={categ.toLowerCase()} value={categ.toLowerCase()}>
            {categ}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
