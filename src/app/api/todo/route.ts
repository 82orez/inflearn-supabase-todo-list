import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const search = new URL(request.url).searchParams.get("search") || "";

  const todos = await prisma.todo.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive", // 대소문자 구분 없이 검색
      },
    },
    orderBy: { created_at: "asc" },
  });

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { title, completed } = await request.json();

  const newTodo = await prisma.todo.create({
    data: {
      title,
      completed,
    },
  });

  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const { id, title, completed } = await request.json();

  // 현재 데이터베이스에 저장된 기존 할 일 데이터를 가져옵니다.
  const existingTodo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!existingTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  // title 이 변경된 경우에만 updated_at을 업데이트합니다.
  // ? 새로운 변수 data 에 client 에서 넘어온 completed 값만 먼저 넣어줍니다.
  // 기존 할 일에 변경이 있을 경우에만 data 를 updated 한다.
  const data: any = { completed };
  if (title !== existingTodo.title) {
    data.title = title;
    data.updated_at = new Date(); // 현재 시간으로 updated_at을 업데이트
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data,
  });

  return NextResponse.json(updatedTodo);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.todo.delete({ where: { id } });

  return NextResponse.json({ message: "Note deleted successfully" });
}
