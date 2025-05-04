import axios, { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { User } from "../../services/user-service";

function Test() {
  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>- {user.name}</div>
      ))}
      {error ? <div>- {error}</div> : null}
    </div>
  );
}

export default Test;
