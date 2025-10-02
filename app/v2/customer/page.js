"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CustomerHome() {
    const APIBASE = process.env.NEXT_PUBLIC_API_URL; // e.g. "/fin-customer/api"
    const { register, handleSubmit, reset } = useForm();
    const [customers, setCustomers] = useState([]);

    // edit state
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // load all
    async function fetchCustomers() {
        // 👉 if your API folder is plural, use `${APIBASE}/customers`
        const res = await fetch(`${APIBASE}/customer`, { cache: "no-store" });
        if (!res.ok) {
            console.error("Failed to load customers:", await res.text());
            return;
        }
        const c = await res.json();
        setCustomers(c);
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    // click 📝 -> load one and prefill form
    const startEdit = (id) => async () => {
        // 👉 if plural: `${APIBASE}/customers/${id}`
        const res = await fetch(`${APIBASE}/customer/${id}`, { cache: "no-store" });
        if (!res.ok) {
            alert("Failed to load customer");
            return;
        }
        const doc = await res.json();
        // input[type=date] needs YYYY-MM-DD
        reset({
            name: doc.name ?? "",
            dateOfBirth: (doc.dateOfBirth || "").slice(0, 10),
            memberNumber: doc.memberNumber ?? "",
            interests: doc.interests ?? "",
        });
        setEditMode(true);
        setEditingId(doc._id);
    };

    // create/update submit
    const onSubmit = async (data) => {
        const payload = {
            name: data.name,
            dateOfBirth: data.dateOfBirth,              // "YYYY-MM-DD"
            memberNumber: Number(data.memberNumber),    // ensure number
            interests: data.interests || "",
        };

        let res;
        if (editMode && editingId) {
            // 👉 if plural: `${APIBASE}/customers`
            res = await fetch(`${APIBASE}/customer`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: editingId, ...payload }),
            });
        } else {
            // 👉 if plural: `${APIBASE}/customers`
            res = await fetch(`${APIBASE}/customer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        }

        if (!res.ok) {
            const msg = await res.text();
            alert(`Save failed: ${msg}`);
            return;
        }

        // success
        reset({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
        setEditMode(false);
        setEditingId(null);
        fetchCustomers();
    };

    // delete
    const deleteById = (id) => async () => {
        if (!confirm("Are you sure?")) return;
        // 👉 if plural: `${APIBASE}/customers/${id}`
        const res = await fetch(`${APIBASE}/customer/${id}`, { method: "DELETE" });
        if (!res.ok) {
            alert("Delete failed");
            return;
        }
        fetchCustomers();
    };

    // cancel edit
    const cancelEdit = () => {
        reset({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
        setEditMode(false);
        setEditingId(null);
    };

    return (
        <div className="flex flex-row gap-4">
            {/* Left: Create/Edit form */}
            <div className="flex-1 w-64">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                value={editMode ? "Update" : "Add"}
                                className={`${editMode ? "bg-blue-800 hover:bg-blue-700" : "bg-green-800 hover:bg-green-700"
                                    } text-white font-bold py-2 px-4 rounded-full`}
                            />
                            {editMode && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                                >
                                    Cancel
                                </button>
                            )}
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
                            {/* link to THIS section's detail page */}
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
