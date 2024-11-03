"use client";

import { Button, Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";
import Todo from "@/components/todo";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/app/react-query-provider";

export default function Ui() {
  const [searchInput, setSearchInput] = useState("");
  // const queryClient = useQueryClient();

  const fetchTodos = async () => {
    const res = await axios(`/api/todo?search=${searchInput}`);
    return res.data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["todos", searchInput],
    queryFn: fetchTodos,
  });

  const createTodoMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/todo", {
        title: "New todo",
        completed: false,
      });
      return res.data;
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["todos"]).then();
      console.log(data);
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <div className={"border-2 w-2/3 mx-auto flex flex-col items-center py-10 h-screen"}>
      <div className={"text-xl"}>TODO LIST</div>

      {/*@ts-ignore*/}
      <Input
        label="Search TODO"
        icon={<SearchIcon />}
        placeholder={"Search TODO"}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      {/*@ts-ignore*/}
      {data.map((todo) => (
        <Todo key={todo.id} id={todo.id} title={todo.title} />
      ))}

      {/*@ts-ignore*/}
      <Button color={"blue-gray"} className={"flex items-center"} onClick={() => createTodoMutation.mutate()}>
        <AddIcon className={"mr-2"} />
        <div className={"text-md"}>Add Todo</div>
      </Button>
    </div>
  );
}
