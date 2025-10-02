"use client";
import { useState } from "react";
import { BASE } from "@/app/v2/_base";

export default function CustomerForm({ initial = null, onSaved }) {
    const [form, setForm] = useState({
        name: initial?.name ?? "",
        dateOfBirth: initial?.dateOfBirth ? initial.dateOfBirth.slice(0, 10) : "",
        memberNumber: initial?.memberNumber ?? "",
        interests: initial?.interests ?? "",
    });
    const [saving, setSaving] = useState(false);

    const update = (k) => (e) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...form,
            memberNumber: Number(form.memberNumber),
        };

        let res;
        if (initial?._id) {
            // teacher's style: PUT with _id in body
            res = await fetch(`${BASE}/api/customer`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: initial._id, ...payload }),
            });
        } else {
            res = await fetch(`${BASE}/api/customer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        }

        setSaving(false);
        if (!res.ok) {
            alert("Save failed");
            return;
        }
        const data = await res.json();
        onSaved?.(data);
    };

    return (
        <form onSubmit={save} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
            <input placeholder="Name" value={form.name} onChange={update("name")} required />
            <input type="date" value={form.dateOfBirth} onChange={update("dateOfBirth")} required />
            <input type="number" placeholder="Member Number" value={form.memberNumber} onChange={update("memberNumber")} required />
            <input placeholder="Interests (comma separated)" value={form.interests} onChange={update("interests")} />
            <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </form>
    );
}
