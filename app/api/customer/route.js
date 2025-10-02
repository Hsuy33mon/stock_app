import Customer from "@/models/Customer";

export async function GET() {
    return Response.json(await Customer.find().sort({ createdAt: -1 }));
}

export async function POST(request) {
    const body = await request.json();
    console.log(body)
    const doc = new Customer(body);
    await doc.save();
    return Response.json(doc);
}

export async function PUT(request) {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const doc = await Customer.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!doc) return new Response("Customer not found", { status: 404 });
    return Response.json(doc);
}

export async function PATCH(request) {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const doc = await Customer.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!doc) return new Response("Customer not found", { status: 404 });
    return Response.json(doc);
}
