"use client";

import { useRouter } from "next/navigation";
import StaffForm from "../../../../../components/StaffForm";
import { staffMembers as initialStaffMembers } from "../../../../../data/data";

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

export default function AddStaffPage() {
  const router = useRouter();

  const handleAdd = (data: Partial<StaffMember>) => {
    const stored = localStorage.getItem("staffMembers");
    const members: StaffMember[] = stored
      ? JSON.parse(stored)
      : initialStaffMembers;

    const newMember: StaffMember = {
      id: Date.now(),
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      gender: data.gender ?? "Male",
      staffId: data.staffId ?? "",
      phoneNumber: data.phoneNumber ?? "",
      role: data.role ?? "",
      designation: data.designation ?? "",
      email: data.email,
      officialEmail: data.officialEmail,
    };

    members.push(newMember);
    localStorage.setItem("staffMembers", JSON.stringify(members));
    router.push("/staff");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm text-gray-700">
      <h2 className="text-xl font-semibold mb-6">Add New Staff</h2>
      <StaffForm onSubmit={handleAdd} />
    </div>
  );
}
