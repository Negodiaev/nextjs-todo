"use client";

type TTodoItemProps = {
  id: string;
  title: string;
  isComplete: boolean;
  onToggleTodo: (id: string, isChecked: boolean) => void;
};

export function TodoItem({
  id,
  title,
  isComplete,
  onToggleTodo,
}: TTodoItemProps) {
  return (
    <li className="flex items-center gap-1">
      <input
        type="checkbox"
        id={id}
        className="cursor-pointer peer"
        defaultChecked={isComplete}
        onChange={(e) => onToggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="peer-checked:line-through peer-checked:text-slate-400"
      >
        {title}
      </label>
    </li>
  );
}
