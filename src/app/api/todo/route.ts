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
    orderBy: { created_at: "desc" },
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

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { title, completed },
  });

  return NextResponse.json(updatedTodo);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.todo.delete({ where: { id } });

  return NextResponse.json({ message: "Note deleted successfully" });
}
