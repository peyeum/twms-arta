'use client'

import TableActionCell from "@/components/TableActionCell";
import { createColumnHelper } from "@tanstack/react-table";
import { StallsContext } from "./context";

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor("id_stall", {
    cell: (info) => info.getValue(),
    header: "ID Stall",
  }),
  columnHelper.accessor("nama_stall", {
    cell: (info) => info.getValue(),
    header: "Nama Stall"
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    header: "Status",
  }),
  columnHelper.accessor("stall_pic", {
    cell: (info) => info.getValue(),
    header: "PIC",
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
    const stall = row.original
    return (
      <>
        <TableActionCell data={stall} context={StallsContext} />
      </>
    )
  },
    header: 'Actions'
  }),
];

export default columns