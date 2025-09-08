"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import AuthShell from "../../../../components/AuthSchell";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import ModalSuccess from "../../../../components/ModalSuccess";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ok, setOk] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      setOk(true);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <AuthShell
      image="/login.jpg"
      title="Please Sign In"
      topRight={
        <Link href="/signup" className="rounded-md border px-3 py-1 text-sm">
          Sign Up
        </Link>
      }
    >
      {ok && (
        <ModalSuccess
          message="Successfully signed in!"
          onClose={() => (window.location.href = "/dashboard")}
        />
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-gray-600">
            Email address
          </label>
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">Password</label>
          <div className="flex items-center gap-2">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-blue-600">
            I forgot my password
          </Link>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button>Sign In</Button>
      </form>
    </AuthShell>
  );
}
