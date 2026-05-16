"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string);
  const category = formData.get("category") as string;
  const sizes = (formData.get("sizes") as string).split(",").map(s => parseInt(s.trim())).filter(s => !isNaN(s));
  const colors = (formData.get("colors") as string).split(",").map(c => c.trim()).filter(c => c !== "");
  const image = formData.get("image") as string;
  const code = formData.get("code") as string;
  const style = formData.get("style") as string;
  const featured = formData.get("featured") === "on";

  const productData = {
    name,
    price,
    category,
    sizes,
    colors,
    image,
    code,
    style,
    featured,
  };

  if (id) {
    await prisma.product.update({
      where: { id },
      data: productData,
    });
  } else {
    await prisma.product.create({
      data: productData,
    });
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}
