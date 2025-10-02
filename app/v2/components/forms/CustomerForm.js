"use client";
import { useState } from "react";

export default function CustomerForm({ initial = null, onSaved }) {
    const APIBASE = process.env.NEXT_PUBLIC_API_URL; // e.g. "/fin-customer/api"
    const [form, setForm] = useState({
        name: initial?.name ?? "",
        dateOfBirth: initial?.dateOfBirth ? initial.dateOfBirth.slice(0, 10) : "",
        memberNumber: initial?.memberNumber ?? "",
        interests: initial?.interests ?? "",
    });
    const [saving, setSaving] = useState(false);

    const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            name: form.name,
            dateOfBirth: form.dateOfBirth,                  // "YYYY-MM-DD"
            memberNumber: Number(form.memberNumber),        // ensure number
            interests: form.interests || "",
        };

        // Teacher’s style: POST to create (singular). If your API folder is plural, change to `${APIBASE}/customers`.
        const res = await fetch(`${APIBASE}/customer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        setSaving(false);
        if (!res.ok) {
            const msg = await res.text().catch(() => "");
            alert(`Save failed: ${res.status} ${msg}`);
            return;
        }
        const data = await res.json();
        onSaved?.(data);
    };

    return (
        <form onSubmit={submit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
            <input placeholder="Name" value={form.name} onChange={update("name")} required />
            <input type="date" value={form.dateOfBirth} onChange={update("dateOfBirth")} required />
            <input type="number" placeholder="Member Number" value={form.memberNumber} onChange={update("memberNumber")} required />
            <input placeholder="Interests (comma separated)" value={form.interests} onChange={update("interests")} />
            <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </form>
    );
}
