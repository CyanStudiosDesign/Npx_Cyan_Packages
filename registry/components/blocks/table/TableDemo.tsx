import React from "react";
import { Table } from "./Table";
import { TableCaption } from "./TableCaption";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableFooter } from "./TableFooter";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function TableDemo() {
  return (
    <div
      className="
      flex
      min-h-screen
      w-full
      flex-col
      items-center
      justify-center
      gap-6
      bg-canvas
      text-fg"
    >
      <Table className="w-[500px] border-collapse text-fg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Method</TableHead>

            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>

              <TableCell>{invoice.paymentStatus}</TableCell>

              <TableCell>{invoice.paymentMethod}</TableCell>

              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell children={undefined}></TableCell>
            <TableCell children={undefined}></TableCell>

            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
    </div>
  );
}
