"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { getProductById, updateProduct } from "@/lib/api";
import { Product } from "@/types/product";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(id).then(setProduct);
    }
  }, [id]);

  async function handleUpdate(data: Product) {
    await updateProduct(id, data);
    router.push("/");
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm initialData={product} onSubmit={handleUpdate} />
    </div>
  );
}
