"use client";
import { useState } from "react";
import Link from "next/link";
import AuthShell from "../../../../components/AuthSchell";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import ModalSuccess from "../../../../components/ModalSuccess";
export default function Page() {
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const change = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.ok) setOk(true);
  };

  return (
    <AuthShell
      image="/login.jpg"
      title="Create account"
      topRight={
        <Link href="/login" className="rounded-md border px-3 py-1 text-sm">
          Sign In
        </Link>
      }
    >
      {ok && (
        <ModalSuccess
          message="Successfully signed up!"
          onClose={() => (window.location.href = "/dashboard")}
        />
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-gray-600">Full name</label>
          <Input
            value={form.name}
            onChange={(e) => change("name", e.target.value)}
            placeholder="Name Surname"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">
            Email address
          </label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => change("email", e.target.value)}
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">Password</label>
          <div className="flex items-center gap-2">
            <Input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => change("password", e.target.value)}
              placeholder="********"
              required
            />
            <button
              type="button"
              className="text-xs text-blue-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <Button>Sign Up</Button>
      </form>
    </AuthShell>
  );
}
