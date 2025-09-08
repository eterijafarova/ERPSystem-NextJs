"use client";

import { useState, useEffect } from "react";

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
  photo?: string;
};

type StaffFormProps = {
  initialData?: Partial<StaffMember>;
  onSubmit: (data: Partial<StaffMember>) => void;
};

export default function StaffForm({ initialData, onSubmit }: StaffFormProps) {
  const [form, setForm] = useState<Partial<StaffMember>>(initialData || {});
  const [photo, setPhoto] = useState<string | undefined>(initialData?.photo);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setPhoto(initialData.photo);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
      setForm((prev) => ({ ...prev, photo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, photo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div>
        <h3 className="text-lg font-semibold mb-4">Edit Staff Profile</h3>
        <div className="grid grid-cols-3 gap-6 items-start">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border mb-3">
              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No Photo
                </div>
              )}
            </div>
            <label className="cursor-pointer text-blue-600">
              Upload Photo
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
            <p className="text-xs text-gray-500 text-center mt-2">
              Allowed format JPG, JPEG, and PNG <br />
              Max file size 2MB
            </p>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              value={form.phoneNumber || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg"
            />
            <select
              name="gender"
              value={form.gender || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              name="phoneNumber2"
              placeholder="Enter phone number"
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="text"
              name="staffId"
              placeholder="Staff ID"
              value={form.staffId || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg"
            />
            <select
              name="designation"
              value={form.designation || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="">Select designation</option>
              <option value="I.T">I.T</option>
              <option value="Admin Staff">Admin Staff</option>
              <option value="Human Resources Staff">
                Human Resources Staff
              </option>
              <option value="All Staff">All Staff</option>
            </select>
            <input
              type="text"
              name="officialEmail"
              placeholder="Official email"
              value={form.officialEmail || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg col-span-2"
            />
            <button
              type="submit"
              className="col-span-2 mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Assign Role</h3>
        <div className="grid grid-cols-3 gap-4 items-end">
          <input
            type="text"
            value={form.staffId || ""}
            readOnly
            className="border px-3 py-2 rounded-lg bg-gray-100"
          />
          <select
            name="role"
            value={form.role || ""}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">Select role</option>
            <option value="Admin">Admin</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
