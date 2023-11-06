const allocations = [
  {
    id_service: "svc-001",
    id_stall: "st-qs-001",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T08:30:00.000+07:00",
    end_time: "2023-08-21T09:30:00.000+07:00",
    estimated_time: "2023-08-21T10:00:00.000+07:00",
    car: "B 1234 CD",
    status: "finished",
    kilometer: 30000,
    note: "Perlu cek suara mesin",
    service_advisor: 422312,
    foreman: 345795,
    teknisi: [
      452212,
      957765
    ]
  },
  {
    id_service: "svc-002",
    id_stall: "st-qs-002",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T10:15:00.000+07:00",
    end_time: "2023-08-21T10:15:00.000+07:00",
    estimated_time: "2023-08-21T12:45:00.000+07:00",
    car: "D 5678 EF",
    status: "onprogress",
    kilometer: 45000,
    note: "Penggantian oli dan filter",
    service_advisor: 305839,
    foreman: 703216,
    teknisi: [
      672931,
      112684
    ]
  },
  {
    id_service: "svc-003",
    id_stall: "st-pm-003",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T10:00:00.000+07:00",
    end_time: "2023-08-21T11:00:00.000+07:00",
    estimated_time: "2023-08-21T12:00:00.000+07:00",
    car: "F 9876 GH",
    status: "wash",
    kilometer: 60000,
    note: "Service rutin dan cuci mobil",
    service_advisor: 920342,
    foreman: 466673,
    teknisi: [
      135324,
      667433
    ]
  },
  {
    id_service: "svc-004",
    id_stall: "st-pm-002",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T11:45:00.000+07:00",
    end_time: "2023-08-21T12:45:00.000+07:00",
    estimated_time: "2023-08-21T13:35:00.000+07:00",
    car: "G 5432 IJ",
    status: "enginedressing",
    kilometer: 75000,
    note: "Perawatan eksterior mobil",
    service_advisor: 120392,
    foreman: 703216,
    teknisi: [
      957765
    ]
  },
  {
    id_service: "svc-005",
    id_stall: "st-gr-003",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T12:30:00.000+07:00",
    end_time: "2023-08-21T13:30:00.000+07:00",
    estimated_time: "2023-08-21T13:00:00.000+07:00",
    car: "H 6789 KL",
    status: "onprogress",
    kilometer: 82000,
    note: "",
    service_advisor: 342125,
    foreman: 667433,
    teknisi: [
      533457
    ]
  },
  {
    id_service: "svc-006",
    id_stall: "st-gr-004",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T11:15:00.000+07:00",
    end_time: "2023-08-21T14:15:00.000+07:00",
    estimated_time: "2023-08-21T13:45:00.000+07:00",
    car: "I 1234 MN",
    status: "onprogress",
    kilometer: 92000,
    note: "Menunggu suku cadang",
    service_advisor: 643589,
    foreman: 703216,
    teknisi: [
      667433
    ]
  },
  {
    id_service: "svc-007",
    id_stall: "st-qs-001",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T12:00:00.000+07:00",
    end_time: "2023-08-21T15:00:00.000+07:00",
    estimated_time: "2023-08-21T14:30:00.000+07:00",
    car: "J 5678 OP",
    status: "onprogress",
    kilometer: 105000,
    note: "Pengecekan sistem kelistrikan",
    service_advisor: 422312,
    foreman: 345795,
    teknisi: [
      452212,
      957765
    ]
  },
  {
    id_service: "svc-008",
    id_stall: "st-qs-002",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T14:45:00.000+07:00",
    end_time: "2023-08-21T16:45:00.000+07:00",
    estimated_time: "2023-08-21T16:15:00.000+07:00",
    car: "K 1234 QR",
    status: "wash",
    kilometer: 118000,
    note: "Cuci mobil dan detailing",
    service_advisor: 305839,
    foreman: 703216,
    teknisi: [
      672931,
      112684
    ]
  },
  {
    id_service: "svc-009",
    id_stall: "st-gr-001",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T08:15:00.000+07:00",
    end_time: "2023-08-21T09:15:00.000+07:00",
    estimated_time: "2023-08-21T10:45:00.000+07:00",
    car: "L 5678 ST",
    status: "finished",
    kilometer: 132000,
    note: "Pergantian kampas rem",
    service_advisor: 120392,
    foreman: 466673,
    teknisi: [
      135324,
      667433
    ]
  },
  {
    id_service: "svc-010",
    id_stall: "st-pm-001",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T08:45:00.000+07:00",
    end_time: "2023-08-21T10:45:00.000+07:00",
    estimated_time: "2023-08-21T10:45:00.000+07:00",
    car: "M 1234 UV",
    status: "enginedressing",
    kilometer: 135000,
    note: "Perawatan eksterior dan mesin",
    service_advisor: 920342,
    foreman: 703216,
    teknisi: [
      957765
    ]
  },
  {
    id_service: "svc-011",
    id_stall: "st-qs-003",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T09:30:00.000+07:00",
    end_time: "2023-08-21T11:30:00.000+07:00",
    estimated_time: "2023-08-21T11:00:00.000+07:00",
    car: "N 5678 WX",
    status: "onprogress",
    kilometer: 145000,
    note: "Pemeriksaan sistem AC",
    service_advisor: 422312,
    foreman: 345795,
    teknisi: [
      452212,
      957765
    ]
  },
  {
    id_service: "svc-012",
    id_stall: "st-qs-001",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T11:00:00.000+07:00",
    end_time: "2023-08-21T12:15:00.000+07:00",
    estimated_time: "2023-08-21T11:45:00.000+07:00",
    car: "O 1234 YZ",
    status: "waiting",
    kilometer: 158000,
    note: "Menunggu suku cadang",
    service_advisor: 305839,
    foreman: 703216,
    teknisi: [
      672931,
      112684
    ]
  },
  {
    id_service: "svc-013",
    id_stall: "st-fi-002",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T11:00:00.000+07:00",
    end_time: "2023-08-21T13:00:00.000+07:00",
    estimated_time: "2023-08-21T12:30:00.000+07:00",
    car: "P 5678 AB",
    status: "wash",
    kilometer: 162000,
    note: "Service rutin dan cuci mobil",
    service_advisor: 920342,
    foreman: 466673,
    teknisi: [
      135324,
      667433
    ]
  },
  {
    id_service: "svc-014",
    id_stall: "st-pm-002",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T13:00:00.000+07:00",
    end_time: "2023-08-21T14:45:00.000+07:00",
    estimated_time: "2023-08-21T14:15:00.000+07:00",
    car: "Q 1234 CD",
    status: "enginedressing",
    kilometer: 175000,
    note: "Perawatan eksterior mobil",
    service_advisor: 120392,
    foreman: 703216,
    teknisi: [
      957765
    ]
  },
  {
    id_service: "svc-015",
    id_stall: "st-gr-003",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T13:30:00.000+07:00",
    end_time: "2023-08-21T15:30:00.000+07:00",
    estimated_time: "2023-08-21T15:00:00.000+07:00",
    car: "R 5678 EF",
    status: "homeservice",
    kilometer: 180000,
    note: "Service di lokasi pelanggan",
    service_advisor: 342125,
    foreman: 667433,
    teknisi: [
      533457
    ]
  },
  {
    id_service: "svc-016",
    id_stall: "st-gr-004",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T08:00:00.000+07:00",
    end_time: "2023-08-21T09:45:00.000+07:00",
    estimated_time: "2023-08-21T09:15:00.000+07:00",
    car: "S 1234 GH",
    status: "waiting",
    kilometer: 192000,
    note: "Menunggu suku cadang",
    service_advisor: 643589,
    foreman: 703216,
    teknisi: [
      667433
    ]
  },
  {
    id_service: "svc-017",
    id_stall: "st-qs-001",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T09:30:00.000+07:00",
    end_time: "2023-08-21T10:30:00.000+07:00",
    estimated_time: "2023-08-21T10:00:00.000+07:00",
    car: "T 5678 IJ",
    status: "onprogress",
    kilometer: 205000,
    note: "Pemeriksaan sistem kelistrikan",
    service_advisor: 422312,
    foreman: 345795,
    teknisi: [
      452212
    ]
  },
  {
    id_service: "svc-018",
    id_stall: "st-qs-002",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T10:15:00.000+07:00",
    end_time: "2023-08-21T11:15:00.000+07:00",
    estimated_time: "2023-08-21T10:45:00.000+07:00",
    car: "U 1234 KL",
    status: "wash",
    kilometer: 218000,
    note: "Cuci mobil dan detailing",
    service_advisor: 305839,
    foreman: 703216,
    teknisi: [
      672931
    ]
  },
  {
    id_service: "svc-019",
    id_stall: "st-fi-001",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T11:00:00.000+07:00",
    end_time: "2023-08-21T12:00:00.000+07:00",
    estimated_time: "2023-08-21T11:30:00.000+07:00",
    car: "V 5678 MN",
    status: "finished",
    kilometer: 225000,
    note: "Pergantian kampas rem",
    service_advisor: 920342,
    foreman: 466673,
    teknisi: [
      135324
    ]
  },
  {
    id_service: "svc-020",
    id_stall: "st-qs-003",
    tgl_service: "2023-08-21T00:00:00.000+07:00",
    start_time: "2023-08-21T11:45:00.000+07:00",
    end_time: "2023-08-21T12:45:00.000+07:00",
    estimated_time: "2023-08-21T12:15:00.000+07:00",
    car: "W 1234 UV",
    status: "enginedressing",
    kilometer: 235000,
    note: "Perawatan eksterior mobil",
    service_advisor: 120392,
    foreman: 703216,
    teknisi: [
      957765
    ]
  }
]

export const getAllAllocations = async () => {
  return allocations
}