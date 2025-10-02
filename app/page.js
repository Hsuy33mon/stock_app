import Box from "@mui/material/Box";
import Link from "next/link";

export default function BoxBasic() {
  return (
    <main>
      <Box component="section" className="border border-gray-800 m-5 text-center">
        <h1 className="text-3xl text-violet-950">Stock Management v1.0</h1>
        <ul>
          <li><Link href="/v2/product">Products</Link></li>
          <li><Link href="/v2/category">Category</Link></li>
          <li><Link href="/v2/customer">Customer</Link></li>
        </ul>

      </Box>
    </main>
  );
}
