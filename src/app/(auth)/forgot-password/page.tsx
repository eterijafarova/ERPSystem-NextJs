"use client";
import { useState } from "react";
import Link from "next/link";
import AuthShell from "../../../../components/AuthSchell";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import SuccessModal from "../../../../components/SuccessModal";

export default function Page() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/forgot", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    if (res.ok) setSent(true);
  };

  return (
    <AuthShell
      image="/forgot.jpg"
      title="Forgot your password?"
      subtitle="Kindly enter the email address linked to this account and we will send you a code to enable you change your password."
      topRight={
        <Link href="/signup" className="rounded-md border px-3 py-1 text-sm">
          Sign Up
        </Link>
      }
    >
      {sent && <SuccessModal message="Reset code sent (check console)" />}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-gray-600">
            Email address
          </label>
        </div>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
        />
        <Button>Send</Button>
        <p className="text-xs text-gray-500">
          Already have a code?{" "}
          <Link className="text-blue-600" href="/reset-password">
            Reset here
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
