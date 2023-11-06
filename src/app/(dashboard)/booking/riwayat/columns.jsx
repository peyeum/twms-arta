'use client'

import TableActionCell from "@/components/TableActionCell";
import { createColumnHelper } from "@tanstack/react-table";
import { RiwayatServiceContext } from "./context";
import { formatTglWaktu } from "@/app/helper";

const timeOption = {
  hour: "numeric",
  minute: "numeric",
  hour12: false,
  timeZone: 'Asia/Jakarta',
}

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor("id_booking", {
    cell: (info) => info.getValue(),
    header: "ID Booking",
  }),
  columnHelper.accessor("platnopol", {
    cell: (info) => info.getValue() ?? '...',
    header: "Mobil",
  }),
  columnHelper.accessor("nama_stall", {
    cell: (info) => info.getValue() ?? '...',
    header: "Stall",
  }),
  columnHelper.accessor("nama_status", {
    cell: (info) => info.getValue() ?? '...',
    header: "Status",
  }),
  columnHelper.accessor("tgl_booking", {
    cell: (info) => formatTglWaktu(new Date(info.getValue())),
    header: "Tanggal",
  }),
  columnHelper.accessor("appointment", {
    cell: (info) => formatTglWaktu(info.getValue(),timeOption),
    header: "Appointment",
  }),
  columnHelper.accessor("note", {
    cell: (info) => info.getValue(),
    header: "Catatan"
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
    const mobil = row.original
    return (
      <>
        <TableActionCell data={mobil} context={RiwayatServiceContext} />
      </>
    )
  },
    header: 'Actions'
  }),
];

export default columns