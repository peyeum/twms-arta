'use client'

import TableActionCell from "@/components/TableActionCell";
import { createColumnHelper } from "@tanstack/react-table";
import { MobilContext } from "./context";

const columnHelper = createColumnHelper()
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
  columnHelper.accessor("nama_customer", {
    cell: (info) => info.getValue(),
    header: "Owner",
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
    const mobil = row.original
    return (
      <>
        <TableActionCell data={mobil} context={MobilContext} />
      </>
    )
  },
    header: 'Actions'
  }),
];

export default columns