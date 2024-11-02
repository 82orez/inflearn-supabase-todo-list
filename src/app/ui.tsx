"use client";

import { Button, Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";
import Todo from "@/components/todo";
import AddIcon from "@mui/icons-material/Add";

export default function Ui() {
  return (
    <div className={"border-2 w-2/3 mx-auto flex flex-col items-center py-10 h-screen"}>
      <div className={"text-xl"}>TODO LIST</div>

      {/*@ts-ignore*/}
      <Input label="Search TODO" icon={<SearchIcon />} placeholder={"Search TODO"} />

      <Todo id={1} />

      {/*@ts-ignore*/}
      <Button color={"blue-gray"} className={"flex items-center"}>
        <AddIcon className={"mr-2"} />
        <div className={"text-md"}>Add Todo</div>
      </Button>
    </div>
  );
}
