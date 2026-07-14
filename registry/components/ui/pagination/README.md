# Pagination

A reusable Pagination component built with React, TypeScript, and Tailwind CSS.

---

## File Structure

```txt
pagination/
├── Pagination.tsx
├── PaginationButton.tsx
├── PaginationPrevious.tsx
├── PaginationNext.tsx
└── README.md
```

---

## Installation

Copy the `pagination` folder into your project.

```txt
src/
└── components/
    └── ui/
        └── pagination/
            ├── Pagination.tsx
            ├── PaginationButton.tsx
            ├── PaginationPrevious.tsx
            ├── PaginationNext.tsx
            └── README.md
```

---

## Basic Usage

```tsx
"use client";

import { useState } from "react";
import Pagination from "@/components/ui/pagination/Pagination";

export default function Page() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
    />
  );
}
```

---

## Props

### Pagination

| Prop         | Type                   |
| ------------ | ---------------------- |
| currentPage  | number                 |
| totalPages   | number                 |
| onPageChange | (page: number) => void |

---

## Example

```tsx
"use client";

import { useState } from "react";
import Pagination from "@/components/ui/pagination/Pagination";

export default function Example() {
  const [page, setPage] = useState(1);

  return (
    <>
      <p>Current Page: {page}</p>

      <Pagination
        currentPage={page}
        totalPages={5}
        onPageChange={setPage}
      />
    </>
  );
}
```

---

## Registry Example

```tsx
{
  id: "pagination",
  name: "Pagination",
  category: "UI",
  preview: <Pagination />,
}
```
