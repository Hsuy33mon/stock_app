"use client";

import { useRouter } from "next/navigation";
// If "@/..." alias isn't configured, switch to the relative import below:
// import CustomerForm from "../../components/forms/CustomerForm";
import CustomerForm from "@/app/v2/components/forms/CustomerForm";

export default function NewCustomerPage() {
    const r = useRouter();

    return (
        <main style={{ padding: 24 }}>
            <h1>New Customer</h1>
            <CustomerForm
                onSaved={(doc) => {
                    if (!doc?._id) {
                        alert("Create succeeded but missing _id in response");
                        return;
                    }
                    // Correct route: /v2/customer/:id
                    r.push(`/v2/customer/${doc._id}`);
                }}
            />
        </main>
    );
}
