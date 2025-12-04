"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Employee } from "@/models/employee";
import { API_URL } from "../../../lib/api";

export default function Detail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<Employee | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/employees/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const json = await res.json();

        if (isMounted) {
          setForm(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch employee", error);
      }
    };

    if (id) load(); // pastikan id sudah ada

    return () => {
      isMounted = false;
    };
  }, [id]);

  const update = async () => {
    if (!form) return;

    await fetch(`${API_URL}/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        name: form.name,
        age: form.age === "" ? null : Number(form.age),
        position: form.position,
        salary: form.salary === "" ? null : Number(form.salary),
      }),
    });

    router.push("/employee");
  };

  const remove = async () => {
    await fetch(`${API_URL}/employees/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    router.push("/employee");
  };

  if (!form) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Employee Detail</h2>

        <button
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Back
        </button>
      </div>

      <input
        className="border p-2 w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        className="border p-2 w-full"
        value={form.age}
        onChange={(e) =>
          setForm({
            ...form,
            age: e.target.value === "" ? "" : Number(e.target.value),
          })
        }
      />

      <input
        className="border p-2 w-full"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      />

      <input
        type="number"
        className="border p-2 w-full"
        value={form.salary}
        onChange={(e) =>
          setForm({
            ...form,
            salary: e.target.value === "" ? "" : Number(e.target.value),
          })
        }
      />

      <div className="flex gap-2 pt-2">
        <button
          onClick={update}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Update
        </button>

        <button
          onClick={remove}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
