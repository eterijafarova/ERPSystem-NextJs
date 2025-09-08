import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!email || !password)
    return NextResponse.json({ error: "bad data" }, { status: 400 });

  const exists = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (exists)
    return NextResponse.json({ error: "email taken" }, { status: 409 });

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return NextResponse.json({ ok: true });
}
