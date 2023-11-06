'use client'

import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id_mobil", {
    cell: (info) => info.getValue(),
    header: "ID Mobil",
  }),
  columnHelper.accessor("nopol", {
    cell: (info) => info.getValue(),
    header: "Plat Nomor Polisi"
  }),
  columnHelper.accessor("model", {
    cell: (info) => info.getValue(),
    header: "Model",
  }),
  // columnHelper.accessor("id_customer", {
  //   cell: (info) => info.getValue(),
  //   header: "ID Customer",
  // }),
];

export default function ReactTable() {
  return (
    <DataTable  columns={columns} data={data} />
  )
}
