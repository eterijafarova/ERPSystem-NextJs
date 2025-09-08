import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({
    where: { email: (email || "").toLowerCase() },
  });
  if (!user) return NextResponse.json({ ok: true });

  const token = Math.random().toString(36).slice(2, 8).toUpperCase();
  const expires = new Date(Date.now() + 1000 * 60 * 15);
  await prisma.passwordResetToken.create({
    data: { email: user.email, token, expiresAt: expires },
  });

  console.log("[RESET CODE]:", token);
  return NextResponse.json({ ok: true, code: token });
}
