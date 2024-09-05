'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface Field {
  name: string
  format: string
}

export interface TableData {
  fields: Field[]
  rows: Record<string, string | number | null>[]
}

export function DynamicTable({ data }: { data: TableData }) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [visibleColumns, setVisibleColumns] = useState<string[]>(data.fields.map(field => field.name))
  const [searchTerm, setSearchTerm] = useState('')

  const sortedRows = React.useMemo(() => {
    let sortableItems = [...data.rows]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key] ?? '';
        const bValue = b[sortConfig.key] ?? '';
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data.rows, sortConfig]);

  const filteredRows = sortedRows.filter(row =>
    Object.values(row).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const toggleColumn = (columnName: string) => {
    setVisibleColumns(prev =>
      prev.includes(columnName)
        ? prev.filter(col => col !== columnName)
        : [...prev, columnName]
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 flex flex-col h-full"
    >
      <div className="flex justify-between">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mr-2"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {data.fields.map((field) => (
              <DropdownMenuCheckboxItem
                key={field.name}
                checked={visibleColumns.includes(field.name)}
                onCheckedChange={() => toggleColumn(field.name)}
              >
                {field.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border flex-grow overflow-hidden flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              {data.fields.map((field) => (
                visibleColumns.includes(field.name) && (
                  <TableHead key={field.name} className="cursor-pointer" onClick={() => requestSort(field.name)}>
                    {field.name}
                    {sortConfig?.key === field.name && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                    )}
                  </TableHead>
                )
              ))}
            </TableRow>
          </TableHeader>
        </Table>
        <div className="overflow-auto flex-grow">
          <Table>
            <TableBody>
              <AnimatePresence>
                {filteredRows.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {data.fields.map((field) => (
                      visibleColumns.includes(field.name) && (
                        <TableCell key={field.name}>
                          {row[field.name] !== null ? row[field.name] : 'N/A'}
                        </TableCell>
                      )
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  )
}