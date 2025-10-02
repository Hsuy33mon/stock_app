import Customer from "@/models/Customer";

export async function GET(_req, { params }) {
    console.log(params)
    const doc = await Customer.findById(params.id);
    if (!doc) return new Response("Customer not found", { status: 404 });
    return Response.json(doc);
}

export async function DELETE(_req, { params }) {
    const deleted = await Customer.findByIdAndDelete(params.id);
    if (!deleted) return new Response("Customer not found", { status: 404 });
    return Response.json({ ok: true });
}
