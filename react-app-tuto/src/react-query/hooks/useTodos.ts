import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Todos } from "../../services/todos-services";

const useTodos = () => {
  const fetchTodos = () =>
    // we add <Todos[]> to be specific of the returned type of this func
    // since any is not desired type in Ts, we need to be more specific
    // so we can take advantage of tS. generic type arg will do the job.
    axios
      .get<Todos[]>("https://jsonplaceholder.typicode.com/todos")
      // returns a response object, we don't wanna store that
      .then((res) => res.data); // we wanna store the actual data

  // query object
  return useQuery<Todos[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};

export default useTodos;
