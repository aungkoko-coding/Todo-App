import TodoItem from "../../reusable/TodoItem/TodoItem";
import { mock_data } from "../mock-data";

const Next30Days = () => {
  return (
    <section className="my-5">
      <h1 className="text-xl font-bold">Next 30 Days Todo</h1>
      <div className="bg-paper my-2 rounded shadow p-2">
        <ul className="my-2 divide-y-2">
          {mock_data.todoList.map((todo) => (
            <li key={todo.id}>
              <TodoItem data={todo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Next30Days;