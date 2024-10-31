"use client";

import { Input } from "@material-tailwind/react";
import { IoSearchCircle } from "react-icons/io5";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function Ui() {
  return (
    <div className={"border-2 w-2/3 mx-auto flex flex-col items-center py-10"}>
      <h1 className={"text-xl"}>TODO LIST</h1>

      <div className="w-72">
        <Input
          label="Input With Icon"
          icon={<IoSearchCircle />}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
      </div>

      <div className="w-72">
        <Input
          label="Input With Icon"
          icon={<CheckBoxIcon />}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
      </div>
    </div>
  );
}
