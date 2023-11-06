'use client'

import TableActionCell from "@/components/TableActionCell";
import { createColumnHelper } from "@tanstack/react-table";
import { RiwayatServiceContext } from "./context";
import { formatTglWaktu } from "@/app/helper";
import { gettingOptions } from "./RiwayatClient";

const timeOption = {
  hour: "numeric",
  minute: "numeric",
  hour12: false,
  timeZone: 'Asia/Jakarta',
}

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor("id_service", {
    cell: (info) => info.getValue(),
    header: "ID Service",
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
  columnHelper.accessor("tgl_service", {
    cell: (info) => formatTglWaktu(info.getValue()),
    header: "Tanggal Service",
  }),
  columnHelper.accessor("mulai", {
    cell: (info) => formatTglWaktu(info.getValue(),timeOption),
    header: "Mulai",
  }),
  columnHelper.accessor("estimasi_waktu", {
    cell: (info) => formatTglWaktu(info.getValue(),timeOption),
    header: "Estimasi Selesai",
  }),
  columnHelper.accessor("selesai", {
    cell: (info) => info.getValue()
      ? formatTglWaktu(info.getValue(),timeOption)
      : '...',
    header: "Selesai",
  }),
  columnHelper.accessor("nama_sa", {
    cell: (info) => info.getValue(),
    header: "SA",
  }),
  columnHelper.accessor("nama_foreman", {
    cell: (info) => info.getValue(),
    header: "Foreman",
  }),
  columnHelper.accessor("nama_teknisi", {
    cell: (info) => info.getValue(),
    header: "Teknisi",
  }),
  columnHelper.accessor("kilometer", {
    cell: (info) => info.getValue(),
    header: "Kilometer",
  }),
  columnHelper.accessor("note", {
    cell: (info) => info.getValue() ?? '...',
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