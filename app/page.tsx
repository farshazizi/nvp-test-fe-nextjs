"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "../lib/api";
import { Employee } from "@/models/employee";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const req = await fetch(`${API_URL}/employees`);
    const res = await req.json();
    return res.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
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
