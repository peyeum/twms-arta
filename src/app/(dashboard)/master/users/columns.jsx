'use client'

import TableActionCell from "@/components/TableActionCell";
import { createColumnHelper } from "@tanstack/react-table";
import { UsersContext } from "./context";

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor("id_employee", {
    cell: (info) => info.getValue(),
    header: "ID User",
  }),
  columnHelper.accessor("nama", {
    cell: (info) => info.getValue(),
    header: "Nama"
  }),
  columnHelper.accessor("jabatan", {
    cell: (info) => info.getValue(),
    header: "Jabatan",
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
    const user = row.original
    return (
      <>
        <TableActionCell data={user} context={UsersContext} />
      </>
    )
  },
    header: 'Actions'
  }),
];

export default columns