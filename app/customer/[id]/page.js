export default async function Home({ params }) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL; // e.g. https://your-domain/fin-customer/api

    const data = await fetch(`${API_BASE}/customer/${params.id}`, { cache: "no-store" });
    if (!data.ok) {
        return (
            <div className="m-4">
                <h1>Customer</h1>
                <p className="text-red-700">Not found</p>
            </div>
        );
    }
    const customer = await data.json();

    return (
        <div className="m-4">
            <h1>Customer</h1>
            <p className="font-bold text-xl text-blue-800">{customer.name}</p>
            <p>Member Number: {customer.memberNumber}</p>
            <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
            <p>Interests: {customer.interests}</p>
        </div>
    );
}
