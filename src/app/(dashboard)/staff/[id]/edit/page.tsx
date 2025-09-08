"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StaffForm from "../../../../../../components/StaffForm";
import { staffMembers as initialStaffMembers } from "../../../../../../data/data";

type StaffMember = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  gender: string;
  staffId: string;
  phoneNumber: string;
  role: string;
  designation: string;
  officialEmail?: string;
};

export default function EditStaffPage() {
  const { id } = useParams();
  const router = useRouter();
  const [staff, setStaff] = useState<StaffMember | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("staffMembers");
    const members: StaffMember[] = stored
      ? JSON.parse(stored)
      : initialStaffMembers;

    const member = members.find((m) => m.id === Number(id));
    if (member) setStaff(member);
  }, [id]);

  const handleUpdate = (data: Partial<StaffMember>) => {
    const stored = localStorage.getItem("staffMembers");
    const members: StaffMember[] = stored
      ? JSON.parse(stored)
      : initialStaffMembers;

    const updated = members.map((m) =>
      m.id === Number(id) ? { ...m, ...data } : m
    );

    localStorage.setItem("staffMembers", JSON.stringify(updated));
    router.push("/staff");
  };

  if (!staff) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm text-gray-700">
      <StaffForm initialData={staff} onSubmit={handleUpdate} />
    </div>
  );
}
