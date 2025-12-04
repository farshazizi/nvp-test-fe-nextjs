"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../lib/api";

export default function Create() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    age: "",
    position: "",
    salary: "",
  });

  const submit = async () => {
    await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        age: Number(form.age),
        salary: Number(form.salary),
      }),
    });

    router.push("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-3">
      <h2 className="text-xl font-bold">Add Employee</h2>

      <input
        className="border p-2 w-full"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Age"
        type="number"
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Position"
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Salary"
        type="number"
        onChange={(e) => setForm({ ...form, salary: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Submit
      </button>
    </div>
  );
}
