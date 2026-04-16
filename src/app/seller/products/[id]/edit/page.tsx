import { fetchProductById } from "@/lib/data";
import EditProductForm from "@/app/seller/products/[id]/edit/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ⭐ unwrap the promise
  const { id } = await params;

  console.log("FINAL ID:", id);

  const product = await fetchProductById(id);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Edit Product</h1>
      <EditProductForm product={product} />
    </div>
  );
}
