'use client'

import React, { useContext } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  ButtonGroup,
  Flex,
  Box,
  IconButton,
  Tooltip,
} from "@chakra-ui/react"

import {
  TriangleDownIcon,
  TriangleUpIcon,
  Search2Icon,
} from "@chakra-ui/icons"

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from "@tanstack/react-table"
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiFilePlus, FiPlus, FiRotateCw } from "react-icons/fi"
import ModalForm from "./ModalForm"

export default function DataTable({ data, columns, form, context }) {
  const [sorting, setSorting] = React.useState([])
  const [filtering, setFiltering] = React.useState('')
  const {
    isOpen,
    onClose,
    title,
    handleAddActions,
  } = useContext(context)

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onFilteringChange: setFiltering,
    initialState: {
      pagination: {
        pageSize: 20,
      }
    },
    state: {
      sorting,
      globalFilter: filtering,
    },
  });

  return (
    <>
      <Stack mt='2' overflow='hidden' >
        <Flex align='center' justify='space-between'>
          <InputGroup size='md' w='80' borderColor='blue.700' my='2'>
            <InputLeftElement width='4.5rem'>
              <Search2Icon color='gray.500' />
            </InputLeftElement>
            <Input
              pl='4.5rem'
              type='text'
              placeholder='Pencarian data'
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </InputGroup>
          <ButtonGroup spacing='2' colorScheme='linkedin' size='sm'>
            <Tooltip
              label='Tambah Data'
            >
              <IconButton
                icon={< FiPlus />}
                aria-label='Tambah Data'
                onClick={handleAddActions}
              />
            </Tooltip>
            <Tooltip
              label='Sekarkan Tabel'
            >
              <IconButton
                icon={< FiRotateCw />}
                aria-label='Segarkan Tabel'
                onClick={() => table.reset()}
                />
            </Tooltip>
          </ButtonGroup>
        </Flex>
        <Box overflowX='scroll' >
          <Table colorScheme='facebook' variant='striped'>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                    const meta = header.column.columnDef.meta;
                    return (
                      <Th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        isNumeric={meta?.isNumeric}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        <chakra.span pl="4">
                          {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "desc" ? (
                              <TriangleDownIcon aria-label="sorted descending" />
                            ) : (
                              <TriangleUpIcon aria-label="sorted ascending" />
                            )
                          ) : null}
                        </chakra.span>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                    const meta = cell.column.columnDef.meta;
                    return (
                      <Td key={cell.id} isNumeric={meta?.isNumeric}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex mt='6' align='center' justify='space-between'>
          <Box>
            Menampilkan {table.getState().pagination.pageSize} data
          </Box>
          <ButtonGroup spacing='2' colorScheme='facebook' size='sm'>
            <IconButton
              leftIcon={< FiChevronsLeft />}
              onClick={() => table.setPageIndex(0)}
              isDisabled={!table.getCanPreviousPage()}
            />
            <IconButton
              leftIcon={< FiChevronLeft />}
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
            />
            <Flex align='center'>
              {`${table.getState().pagination.pageIndex + 1} dari ${table.getPageCount()}`}
            </Flex>
            <IconButton
              rightIcon={< FiChevronRight />}
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            />
            <IconButton
              rightIcon={< FiChevronsRight />}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              isDisabled={!table.getCanNextPage()}
            />
          </ButtonGroup>
        </Flex>
      </Stack>

      <ModalForm isOpen={isOpen} onClose={onClose} modalTitle={title}>
        <form.type {...form.props} context={context} />
      </ModalForm>
    </>
  );
}