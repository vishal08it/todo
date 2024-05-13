import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import DeleteTodo from "./Todo/DeleteTodo";
import UpdateTodo from "./Todo/UpdateTodo";
import { useState } from "react";

export default function TodosTable({ todos, refetch }) {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todo, setTodo] = useState(null);

  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTodos = todos?.filter((todo) =>
    todo?.Title.toLowerCase().includes(filter.toLowerCase())
  );

  const pageCount = Math.ceil(filteredTodos?.length / itemsPerPage);
  const paginatedTodos = filteredTodos?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClickDelete = (data) => {
    setTodo(data);
    setIsDelete(!isDelete);
  };
  const handleClickUpdate = (data) => {
    setTodo(data);
    setIsEdit(!isEdit);
  };
  const handleRefetch = () => {
    refetch();
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="overflow-x-auto my-2 text-slate-600 rounded">
      <div className="flex justify-end mb-2">
        <input
          type="text"
          placeholder="Filter by title..."
          className="border border-gray-500 px-2 py-1 rounded"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-700 rounded">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Title</th>
            <th className="border border-gray-400 px-4 py-2">Description</th>
            <th className="border border-gray-400 px-4 py-2">Due Date</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTodos?.map((todo, index) => {
            return (
              <tr key={todo?.Id}>
                <td className="border border-gray-400 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {todo?.Title}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {todo?.Description}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {new Date(todo?.Due_Date).toLocaleDateString()}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {todo?.Status}
                </td>
                <td className="border border-gray-400 px-4 py-2 flex  gap-2">
                  <PencilSquareIcon
                    className="text-emerald-500 h-5 w-5 "
                    onClick={() => handleClickUpdate(todo)}
                  />

                  <TrashIcon
                    className="text-red-500 h-5 w-5 "
                    onClick={() => handleClickDelete(todo)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-2 flex justify-end">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page ? "bg-gray-300" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <Modal isOpen={isEdit} onClose={handleClickUpdate} title={"Update Todo"}>
        <UpdateTodo
          onCancel={handleClickUpdate}
          todo={todo}
          onComplete={handleRefetch}
        />
      </Modal>
      <Modal
        isOpen={isDelete}
        onClose={handleClickDelete}
        title={"Delete Todo"}
      >
        <DeleteTodo
          onCancel={handleClickDelete}
          todo={todo}
          onComplete={handleRefetch}
        />
      </Modal>
    </div>
  );
}
