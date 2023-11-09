import Link from "next/link";
import { redirect } from "next/navigation";
import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, isChecked: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { isComplete: isChecked } });
}

async function clearTodos() {
  "use server";

  await prisma.todo.deleteMany({}).then(getTodos);
  redirect("/");
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl text-center">Todo App</h1>
        <Link href="/another" className="text-orange-400 hover:underline">
          Create todos
        </Link>
      </header>
      {todos.length > 0 && (
        <div className="flex justify-between items-start">
          <ul className="pl-4">
            {todos.map((todo) => (
              <TodoItem key={todo.id} {...todo} onToggleTodo={toggleTodo} />
            ))}
          </ul>
          <form action={clearTodos}>
            <button
              type="submit"
              className="mb-4 px-2 py-1 border border-blue-400 rounded text-blue-400"
            >
              Clear Todos
            </button>
          </form>
        </div>
      )}
    </>
  );
}
