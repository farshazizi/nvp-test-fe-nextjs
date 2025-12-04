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
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          salary: Number(form.salary),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("API Error:", err);
        return;
      }

      const data = await res.json();
      console.log("Employee created:", data);

      router.push("/employee");
    } catch (error) {
      console.error("Failed to create employee", error);
    }
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
