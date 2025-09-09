"use client";
import { useState } from "react";
import Link from "next/link";
import AuthShell from "../../../../components/AuthSchell";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import SuccessModal from "../../../../components/SuccessModal";

export default function Page() {
  const [form, setForm] = useState({ token: "", password: "" });
  const [ok, setOk] = useState(false);
  const change = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/reset", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.ok) setOk(true);
  };

  return (
    <AuthShell
      image="/forgot.jpg"
      title="Reset password"
      topRight={
        <Link href="/login" className="rounded-md border px-3 py-1 text-sm">
          Sign In
        </Link>
      }
    >
      {ok && <SuccessModal message="Password successfully changed" />}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-gray-600">Reset code</label>
          <Input
            value={form.token}
            onChange={(e) => change("token", e.target.value)}
            placeholder="Enter reset code..."
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">
            New password
          </label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => change("password", e.target.value)}
            placeholder="********"
            required
          />
        </div>
        <Button>Change password</Button>
      </form>
    </AuthShell>
  );
}
