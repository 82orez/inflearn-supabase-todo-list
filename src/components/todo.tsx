"use client";

import { Checkbox, IconButton } from "@material-tailwind/react";
import CreateIcon from "@mui/icons-material/Create";
import { BsTrash3 } from "react-icons/bs";
import { useState } from "react";
import { LuSave } from "react-icons/lu";

interface Props {
  id: number;
}

export default function Todo({ id }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [value, setValue] = useState("hello world TG");

  return (
    <div className={"border-2 w-full flex justify-center items-center gap-2"}>
      {/* @ts-ignore*/}
      <Checkbox checked={completed} onClick={() => setCompleted(!completed)} />

      <div className={"grow"}>
        {isEditing ? (
          <input
            type="text"
            className={"w-full border-b border-black"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"할 일을 입력해 주세요."}
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
        </>
      ) : (
        <>
          {/*@ts-ignore*/}
          <IconButton
            onClick={() => {
              setIsEditing(true);
            }}>
            <CreateIcon />
          </IconButton>
        </>
      )}

      {/* @ts-ignore*/}
      <IconButton>
        <BsTrash3 className={"text-xl"} />
      </IconButton>
    </div>
  );
}
