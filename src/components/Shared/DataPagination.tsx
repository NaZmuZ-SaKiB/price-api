"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type TProps = {
  limit: number;
  page: number;
  total: number;
  className?: ClassValue;
};

const DataPagination = ({ limit, page, total, className }: TProps) => {
  const totalPages = Math.ceil(total / limit);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handlePageChange = (page: number) => {
    params.delete("page");
    params.append("page", page.toString());

    router.replace(`${pathName}?${params}`);
  };

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row justify-between lg:items-center gap-3",
        className
      )}
    >
      <Pagination className="justify-start">
        <PaginationContent className="flex-wrap gap-2">
          <PaginationItem
            className={cn("group cursor-pointer rounded-none border", {
              hidden: page === 1,
            })}
          >
            <PaginationPrevious
              className="duration-0"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) {
                  handlePageChange(page - 1);
                }
              }}
            />
          </PaginationItem>

          <RenderPaginationItems
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            currentPage={page}
          />

          <PaginationItem
            className={cn("group cursor-pointer rounded-none border", {
              hidden: page === totalPages,
            })}
          >
            <PaginationNext
              className="duration-0"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) {
                  handlePageChange(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <p className="text-sm shrink-0">
        Showing {limit} of {total} ({Math.ceil(total / limit)} Pages).
      </p>
    </div>
  );
};

export default DataPagination;

const RenderPaginationItems = ({
  totalPages,
  currentPage,
  handlePageChange,
}: {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}) => {
  const items = [];
  const maxVisiblePages = 5;
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxPagesBeforeCurrentPage = Math.floor(maxVisiblePages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxVisiblePages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  for (let page = startPage; page <= endPage; page++) {
    items.push(
      <PaginationItem
        key={`pagination-${page}`}
        className={cn("cursor-pointer rounded-none border", {})}
        onClick={() => handlePageChange(page)}
      >
        <PaginationLink className="duration-0 hover:text-inherit">
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (startPage > 1) {
    items.unshift(
      <PaginationItem
        key="ellipsis-start"
        className={cn("cursor-pointer rounded-none ", {})}
      >
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  if (endPage < totalPages) {
    items.push(
      <PaginationItem
        key="ellipsis-end"
        className={cn("cursor-pointer rounded-none ", {})}
      >
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  return items;
};
