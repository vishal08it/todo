import { DELETE_TODO } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import React from "react";

export default function DeleteTodo({ todo, onCancel,onComplete }) {
  // use this to determine if `useEffect()` hook needs to run again;
  const [deleteTodo] = useMutation(DELETE_TODO);
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteTodo = async () => {
    try {
      const { data } = await deleteTodo({
        variables: { id: todo.Id },
      });
      // upon success, remove book's id from localStorage
      if (data && data.delete_Todos_by_pk) {
        onCancel();
        onComplete()
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="my-4">
        <p>Are you sure you want to delete this todo?</p>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="flex items-center px-4 py-2 bg-transparent border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-600 uppercase"
        >
          no
        </button>
        <button onClick={handleDeleteTodo} className="flex items-center px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-delete-600 uppercase">
          yes
        </button>
      </div>
    </div>
  );
}
