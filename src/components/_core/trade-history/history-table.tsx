"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarIcon, CheckCircle, Filter } from "lucide-react";
import { format } from "date-fns";
import { PeriodPopover } from "./period-popover";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ChartDialog } from "./chart-dialog";

// Sample data matching the image
const tableData = [
  {
    id: 1,
    asset: "Apples (OTC)",
    info: "80%",
    chart: "M",
    openingQuote: "1.50056",
    openingTime: "22-06-2024 17:31:03",
    closingQuote: "1.50056",
    closingTime: "22-06-2024 17:30:00",
    amount: "$1.00",
    income: "$1.80",
  },
  {
    id: 2,
    asset: "Apples (OTC)",
    info: "80%",
    chart: "M",
    openingQuote: "1.50056",
    openingTime: "22-06-2024 17:31:03",
    closingQuote: "1.50056",
    closingTime: "22-06-2024 17:30:00",
    amount: "$1.00",
    income: "$1.80",
  },
  {
    id: 3,
    asset: "Apples (OTC)",
    info: "80%",
    chart: "M",
    openingQuote: "1.50056",
    openingTime: "22-06-2024 17:31:03",
    closingQuote: "1.50056",
    closingTime: "22-06-2024 17:30:00",
    amount: "$1.00",
    income: "$1.80",
  },
];

export default function HistoryTable() {
  const [accountType, setAccountType] = useState("demo");
  const [period, setPeriod] = useState<Date | string>("all-time");

  return (
    <div className="min-h-screen text-white px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Controls */}
        <div className="flex items-end gap-4 mb-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Account type</Label>
            <Select value={accountType} onValueChange={setAccountType}>
              <SelectTrigger className="w-40 bg-transparent border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="demo">Demo Account</SelectItem>
                <SelectItem value="live">Live Account</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Period</Label>
            <PeriodPopover />
          </div>

          <Button className="flex items-center gap-2 bg-[#4C66EB]">
            <div>Appply</div>
            <CheckCircle className="" />
          </Button>
        </div>

        {/* Data Table */}
        <div className="rounded-lg overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-700/50">
                <TableHead className="text-gray-300 font-medium">
                  Asset
                </TableHead>
                <TableHead className="text-gray-300 font-medium">
                  Info
                </TableHead>
                <TableHead className="text-gray-300 font-medium">
                  Charts
                </TableHead>
                <TableHead className="text-gray-300 font-medium">
                  Opening quote
                </TableHead>
                <TableHead className="text-gray-300 font-medium">
                  Closing quote
                </TableHead>
                <TableHead className="text-gray-300 font-medium">
                  Amount
                </TableHead>
                <TableHead className="text-gray-300 font-medium">
                  Income
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-gray-700 hover:bg-gray-700/30"
                >
                  <TableCell className="font-medium text-white py-4">
                    <div>
                      <div>{row.asset}</div>
                      <div className="text-xs text-gray-400">Stock</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{row.info}</TableCell>
                  <TableCell>
                    {/* <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-xs font-medium">
                      {row.chart}
                    </div> */}
                    <ChartDialog />
                  </TableCell>
                  <TableCell className="text-white">
                    <div>
                      <div>{row.openingQuote}</div>
                      <div className="text-xs text-gray-400">
                        {row.openingTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    <div>
                      <div>{row.closingQuote}</div>
                      <div className="text-xs text-gray-400">
                        {row.closingTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-green-400 font-medium">
                    {row.amount}
                  </TableCell>
                  <TableCell className="text-green-400 font-medium">
                    {row.income}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
