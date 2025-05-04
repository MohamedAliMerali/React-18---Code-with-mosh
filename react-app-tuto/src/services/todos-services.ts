import create from "./http-service";

export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default create("/todos");
