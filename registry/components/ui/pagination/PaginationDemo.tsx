"use client";

import { useState } from "react";
import Pagination from "./Pagination";

export default function PaginationDemo() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
    />
  );
}