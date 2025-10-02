"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
    const APIBASE = process.env.NEXT_PUBLIC_API_URL;
    const { register, handleSubmit, reset } = useForm();
    const [customers, setCustomers] = useState([]);

    const startEdit = (id) => async () => {
        // TODO (same idea as your product page)
        // 1) fetch(`${APIBASE}/customer/${id}`) -> reset(form with returned values)
        // 2) on submit, call PUT/PATCH to `${APIBASE}/customer` with {_id, ...updates}
    };

    async function fetchCustomers() {
        const res = await fetch(`${APIBASE}/customer`, { cache: "no-store" });
        const c = await res.json();
        setCustomers(c);
    }

    const createCustomer = (data) => {
        const payload = {
            name: data.name,
            dateOfBirth: data.dateOfBirth,            // "YYYY-MM-DD" from date input
            memberNumber: Number(data.memberNumber),  // ensure number
            interests: data.interests || "",
        };
        fetch(`${APIBASE}/customer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }).then(() => {
            reset();
            fetchCustomers();
        });
    };

    const deleteById = (id) => async () => {
        if (!confirm("Are you sure?")) return;
        await fetch(`${APIBASE}/customer/${id}`, { method: "DELETE" });
        fetchCustomers();
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="flex flex-row gap-4">
            {/* Left: Create form */}
            <div className="flex-1 w-64 ">
                <form onSubmit={handleSubmit(createCustomer)}>
                    <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
                        <div>Name:</div>
                        <div>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="border border-black w-full"
                            />
                        </div>

                        <div>Date of Birth:</div>
                        <div>
                            <input
                                type="date"
                                {...register("dateOfBirth", { required: true })}
                                className="border border-black w-full"
                            />
                        </div>

                        <div>Member Number:</div>
                        <div>
                            <input
                                type="number"
                                {...register("memberNumber", { required: true })}
                                className="border border-black w-full"
                            />
                        </div>

                        <div>Interests:</div>
                        <div>
                            <input
                                type="text"
                                placeholder="movies, football, gym"
                                {...register("interests")}
                                className="border border-black w-full"
                            />
                        </div>

                        <div className="col-span-2">
                            <input
                                type="submit"
                                value="Add"
                                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            />
                        </div>
                    </div>
                </form>
            </div>

            {/* Right: List */}
            <div className="border m-4 bg-slate-300 flex-1 w-64">
                <h1 className="text-2xl">Customers ({customers.length})</h1>
                <ul className="list-disc ml-8">
                    {customers.map((c) => (
                        <li key={c._id}>
                            <button className="border border-black p-1/2" onClick={startEdit(c._id)}>📝</button>{" "}
                            <button className="border border-black p-1/2" onClick={deleteById(c._id)}>❌</button>{" "}
                            <Link href={`/customer/${c._id}`} className="font-bold">
                                {c.name}
                            </Link>{" "}
                            - Member #{c.memberNumber} | {new Date(c.dateOfBirth).toLocaleDateString()} | {c.interests}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
