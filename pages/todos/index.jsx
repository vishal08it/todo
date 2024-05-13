import { TODOS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import CreateTodo from "../components/Todo/CreateTodo";
import TodosTable from "../components/TodosTable";

export default function index() {
  const [todos, setTodos] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [user, setUser] = useState("");

  const { loading, error, data, refetch } = useQuery(TODOS, {
    variables: {
      id: user,
    },
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "network-only",
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      setUser(id);
      if (data && data.Todos) {
        setTodos(data.Todos);
      }
    }
  }, [data]);

  const handleClickAdd = () => {
    setIsAdd(!isAdd);
  };
  return (
    <>
      {" "}
      <div className="bg-gradient-to-b from-blue-100 to-gray-100  shadow-lg min-h-screen">
        <Navbar onAdd={handleClickAdd} />
        <div className=" mx-4 mt-8">
          <TodosTable todos={todos} refetch={refetch} />
        </div>
      </div>
      <Modal isOpen={isAdd} onClose={handleClickAdd} title={"Add Todo"}>
        <CreateTodo onCancel={handleClickAdd} onComplete={refetch} />
      </Modal>
    </>
  );
}
