import Link from "next/link";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || !title.length) {
    throw new Error("Invalid title");
  }

  await prisma.todo.create({ data: { title, isComplete: false } });
  redirect("/");
}

export default function AnotherPage() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl text-center">Create todo</h1>
        <Link href="/" className="text-orange-400 hover:underline">
          Home
        </Link>
      </header>
      <form action={createTodo} className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          className="px-2 py-1 border border-slate-400 rounded outline-none bg-transparent focus-within:border-slate-100"
        />
        <div className="flex gap-2 justify-end items-center">
          <Link
            href=".."
            className="px-2 py-1 border border-blue-400 rounded text-blue-400"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-2 py-1 border border-blue-400 rounded text-blue-400"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
