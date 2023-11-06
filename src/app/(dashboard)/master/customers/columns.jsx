'use client'

import TableActionCell from "@/components/TableActionCell";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomerContext } from "./context";

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor("id_customer", {
    cell: (info) => info.getValue(),
    header: "ID Customer",
  }),
  columnHelper.accessor("nama", {
    cell: (info) => info.getValue(),
    header: "Nama"
  }),
  columnHelper.accessor("alamat", {
    cell: (info) => info.getValue(),
    header: "Alamat",
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
    const customer = row.original
    return (
      <>
        <TableActionCell data={customer} context={CustomerContext} />
      </>
    )
  },
    header: 'Actions'
  }),
];

export default columns