import { tables } from "../../data/tables";
import TableCard from "./TableCard";

export default function TableGrid() {
  return (
    <div className="grid grid-cols-5 gap-x-4 gap-y-10 pt-14 pb-10">
      {tables.map((table) => (
        <TableCard key={table.id} table={table} />
      ))}
    </div>
  );
}