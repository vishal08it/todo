import { ADD_TODO, UPDATE_TO_BY_PK } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";

export default function UpdateTodo({ todo, onCancel, onComplete }) {
  const [title, setTitle] = useState("");
  const [descrition, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [updateTodo] = useMutation(UPDATE_TO_BY_PK);
  const handleSubmit = async () => {
    try {
      const { data } = await updateTodo({
        variables: {
          id: {
            Id: todo.Id,
          },
          data: {
            Title: title,
            Description: descrition,
            Due_Date: dueDate,
            Status: status,
          },
        },
      });
      if (data && data.update_Todos_by_pk) {
        onCancel();
        onComplete();
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (todo) {
      setTitle(todo?.Title);
      setDescription(todo?.Description);
      setDueDate(todo?.Due_Date);
      setStatus(todo?.Status);
    }
  }, [todo]);
  const options = [
    { value: "New", label: "New" },
    { value: "Started", label: "Started" },
    { value: "Completed", label: "Completed" },
  ];
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          className="bg-gray-700 text-white px-4 py-2 mb-2 w-full rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="description"
          className="bg-gray-700 text-white px-4 py-2 mb-2 w-full rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          type="text"
          placeholder="Description"
          value={descrition}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex flex-row bg-gray-700 rounded items-center   mb-2">
          <div className="text-white  w-24 mx-2">Due Date:</div>
          <input
            name="dueDate"
            className="bg-gray-700 text-white px-4 py-2  w-full rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            type="datetime-local"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 mb-2 w-full rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-50"
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <div className="p-2 bg-red-400 text-white rounded m-3 flex justify-between items-center">
            {" "}
            <p>{error}</p>
            <XMarkIcon
              className="h-5 w-5 text-white"
              onClick={() => setError("")}
            />
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 mt-6 rounded-lg w-full "
            type="submit"
          >
            Update
          </button>
        </div>

        {success && (
          <div className="mt-2">
            {" "}
            <SuccessWidget
              message={success}
              onClickSuccess={() => setSuccess(null)}
            />
          </div>
        )}
      </form>
    </div>
  );
}
