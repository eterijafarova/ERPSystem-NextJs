import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  const rec = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!rec || rec.used || rec.expiresAt < new Date()) {
    return NextResponse.json({ error: "invalid token" }, { status: 400 });
  }
  await prisma.user.update({
    where: { email: rec.email },
    data: { password },
  });
  await prisma.passwordResetToken.update({
    where: { token },
    data: { used: true },
  });
  return NextResponse.json({ ok: true });
}
