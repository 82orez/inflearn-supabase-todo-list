"use client";

import { useRef, useState } from "react";
import { Checkbox, IconButton } from "@material-tailwind/react";
import CreateIcon from "@mui/icons-material/Create";
import { BsTrash3 } from "react-icons/bs";
import { LuSave } from "react-icons/lu";

// @ts-ignore
export default function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={"border-2 w-full flex justify-center items-center gap-2"}>
      {/* @ts-ignore*/}
      <Checkbox checked={completed} color={"indigo"} onChange={(e) => setCompleted(e.target.checked)} />
      <div className={"grow"}>
        {isEditing ? (
          <input
            type="text"
            className={"w-full border-b border-black"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"할 일을 입력해 주세요."}
            ref={inputRef}
          />
        ) : (
          <div className={`${completed && "line-through"}`}>{value}</div>
        )}
      </div>
      {isEditing ? (
        <>
          {/*@ts-ignore*/}
          <IconButton
            onClick={() => {
              setIsEditing(false);
            }}>
            <LuSave className={"text-xl"} />
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
      <IconButton color={"teal"}>
        <BsTrash3 className={"text-xl"} />
      </IconButton>
      Del
    </div>
  );
}
