# Table

A reusable compound Table component built with React and Tailwind CSS.

The component is split into multiple building blocks, allowing you to compose tables in a clean and flexible way.

## Preview

| Invoice | Status | Method | Amount |
|----------|----------|----------|----------|
| INV001 | Paid | Credit Card | $250.00 |
| INV002 | Pending | PayPal | $150.00 |
| INV003 | Unpaid | Bank Transfer | $350.00 |

---

## File Structure

```txt
table/
├── Table.tsx
├── TableHeader.tsx
├── TableBody.tsx
├── TableRow.tsx
├── TableHead.tsx
├── TableCell.tsx
├── TableFooter.tsx
├── TableCaption.tsx
├── TableDemo.tsx
└── README.md
```

---

## Features

- Compound component pattern
- Fully composable
- Custom styling through className
- Tailwind CSS based
- Supports headers, body, footer, and captions
- TypeScript support

---

## Installation

Copy the `table` folder into your project.

```txt
src/
└── components/
    └── ui/
        └── table/
            ├── Table.tsx
            ├── TableHeader.tsx
            ├── TableBody.tsx
            ├── TableRow.tsx
            ├── TableHead.tsx
            ├── TableCell.tsx
            ├── TableFooter.tsx
            ├── TableCaption.tsx
            ├── TableDemo.tsx
            └── README.md
```

---

## Basic Usage

```tsx
import { Table } from "./Table";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";

export default function Example() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

---

## Complete Example

```tsx
<Table className="w-[500px]">
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>

  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell />
      <TableCell />
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>

<TableCaption>
  A list of your recent invoices.
</TableCaption>
```

---

## Components

### Table

Root table container.

| Prop | Type |
|--------|--------|
| children | ReactNode |
| className | string |

---

### TableHeader

Wrapper around the table header.

| Prop | Type |
|--------|--------|
| children | ReactNode |
| className | string |

---

### TableBody

Wrapper around the table body.

| Prop | Type |
|--------|--------|
| children | ReactNode |
| className | string |

---

### TableRow

Represents a single row.

| Prop | Type |
|--------|--------|
| children | ReactNode |
| className | string |

---

### TableHead

Represents a header cell.

| Prop | Type |
|--------|--------|
| children | ReactNode |
| className | string |

---

### TableCell

Represents a body cell.

| Prop | Type |
|--------|--------|
| children | ReactNode |
| className | string |

---

### TableFooter

Wrapper around the table footer.

| Prop | Type |
|--------|--------|
| children | ReactNode |
| className | string |

---

### TableCaption

Displays a caption below the table.

| Prop | Type |
|--------|--------|
| children | ReactNode |
| className | string |

---

## Demo Component

The package includes a ready-made demo component.

```tsx
import TableDemo from "./TableDemo";

export default function Example() {
  return <TableDemo />;
}
```

---

## Registry Example

```tsx
{
  id: "table",
  name: "Table",
  category: "Blocks",
  preview: <TableDemo />,
}
```

This allows users to preview the entire table component directly from your component registry.

---

## Dependencies

```tsx
import { cn } from "@/lib/utils";
```

Used for merging default and custom class names.

---

## Notes

- Built using the Compound Component Pattern.
- Each table section is a separate reusable component.
- Designed for design systems and component libraries.
- Supports custom Tailwind styling through className props.