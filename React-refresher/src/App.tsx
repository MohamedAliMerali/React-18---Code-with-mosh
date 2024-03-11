import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  id: string;
}
interface Post {
  title: string;
  id: string;
}

function Users() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Getting data!");
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setUsers(response.data);
      console.log(">>", response.data);
    });
  }, []);

  return (
    <ul>
      {posts.map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default Users;
