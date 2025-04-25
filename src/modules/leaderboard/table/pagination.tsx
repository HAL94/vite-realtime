import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function LeaderboardPagination({
  totalPages,
  currentPage,
  onUpdatePage,
}: {
  totalPages: number;
  currentPage: number;
  onUpdatePage: (page: number) => void;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, page) => (
          <PaginationItem key={page} className="cursor-pointer">
            <PaginationLink
              isActive={page + 1 === currentPage}
              onClick={() => onUpdatePage(page + 1)}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className="cursor-pointer">
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
