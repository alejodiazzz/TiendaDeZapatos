"use client";

import { deleteProduct } from "@/app/admin/actions";
import { useState } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.")) {
      setIsDeleting(true);
      await deleteProduct(id);
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500 disabled:opacity-50"
    >
      {isDeleting ? "..." : "Eliminar"}
    </button>
  );
}
