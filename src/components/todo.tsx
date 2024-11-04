"use client";

import { useRef, useState } from "react";
import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import CreateIcon from "@mui/icons-material/Create";
import { BsTrash3 } from "react-icons/bs";
import { LuSave } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/app/react-query-provider";

// @ts-ignore
export default function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const inputRef = useRef<HTMLInputElement>(null);

  const updatedTodoMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.put("/api/todo", {
        id: todo.id,
        title: value,
        completed: completed,
      });
      return res.data;
    },
    onSuccess: () => {
      setIsEditing(false);
      // @ts-ignore
      queryClient.invalidateQueries(["todos"]).then();
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.delete("/api/todo", {
        data: {
          id: todo.id,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["todos"]).then();
    },
  });

  return (
    <div className={"border-2 w-full flex justify-center items-center gap-2"}>
      {/* @ts-ignore*/}
      <Checkbox
        checked={completed}
        color={"indigo"}
        onChange={(e) => {
          setCompleted(e.target.checked);
          updatedTodoMutation.mutate();
        }}
      />
      <div className={"grow"}>
        {isEditing ? (
          <input type="text" className={"w-full border-b border-black"} value={value} onChange={(e) => setValue(e.target.value)} ref={inputRef} />
        ) : (
          <p className={`${completed && "line-through"}`}>{value}</p>
        )}
      </div>
      {isEditing ? (
        <>
          {/*@ts-ignore*/}
          <IconButton
            onClick={() => {
              updatedTodoMutation.mutate();
            }}>
            {updatedTodoMutation.isPending ? (
              // @ts-ignore
              <Spinner />
            ) : (
              <LuSave className={"text-xl"} />
            )}
          </IconButton>
          Save
        </>
      ) : (
        <>
          {/*@ts-ignore*/}
          <IconButton
            color="amber"
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}>
            <CreateIcon />
          </IconButton>
          Edit
        </>
      )}
      {/* @ts-ignore*/}
      <IconButton color={"teal"} onClick={() => deleteTodoMutation.mutate()}>
        {deleteTodoMutation.isPending ? (
          // @ts-ignore
          <Spinner />
        ) : (
          <BsTrash3 className={"text-xl"} />
        )}
      </IconButton>
      Del
    </div>
  );
}
