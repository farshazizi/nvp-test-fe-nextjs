"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../lib/api";
import { Employee } from "@/models/employee";
import NotificationButton from "../../components/NotificationButton";
import Link from "next/link";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // redirect ke login
      return;
    }

    const fetchEmployees = async () => {
      const res = await fetch(`${API_URL}/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setEmployees(data.data || []);
    };

    fetchEmployees();
  }, [router]);

  return (
    <div className="p-6 max-w-2xl mx-auto relative">
      <NotificationButton />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Employee List</h1>

        <Link
          href="/create"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          + Add Employee
        </Link>
      </div>

      <div>
        {employees.map((employee: Employee) => (
          <div
            key={employee.id}
            className="p-3 border rounded flex justify-between"
          >
            <span>{employee.name}</span>
            <Link
              href={`/employee/${employee.id}`}
              className="text-blue-600 underline"
            >
              Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
