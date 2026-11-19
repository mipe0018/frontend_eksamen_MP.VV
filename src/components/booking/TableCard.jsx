import Image from "next/image";

export default function TableCard({ table }) {
  return (
   <div className="relative mx-auto w-full max-w-40">
  <Image
    src={table.image}
    alt={`Bord ${table.id}`}
    className="w-full h-auto"
  />

<span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-medium">
  {table.id}
</span>
</div>
  );
}