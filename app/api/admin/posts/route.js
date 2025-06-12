import { NextResponse } from "next/server";

export async function GET() {
  const posts = [
    {
      name: "Tri Do",
      email: "trido@gmail.com",
      website: "https://trido.com",
      message: "This is a sample post message.",
    },
    {
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      website: "https://janedoe.com",
      message: "Another sample post message.",
    },
    {
      name: "John Smith",
      email: "johnsmith@gmail.com",
      website: "https://johnsmith.com",
      message: "Yet another sample post message.",
    },
  ];

  return NextResponse.json(posts);
}
