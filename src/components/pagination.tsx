import { cn } from "@/lib/utils";
import useIsSmallScreen from "@/hooks/useIsSmallScreen";
import PaginationButton from "./pagination-button";
import PaginationNavButton from "./pagination-nav-button";

interface PaginationButtonsProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationButtons = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationButtonsProps) => {
  const isSmallScreen = useIsSmallScreen();
  const maxButtons = isSmallScreen ? 1 : 3;

  const getPages = () => {
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (startPage > 1) {
      pages.push(
        <PaginationButton
          key={1}
          page={1}
          onClick={() => onPageChange(1)}
          isActive={false}
        />
      );
      if (startPage > 2) {
        pages.push(<span key="elipsis-start">...</span>);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <PaginationButton
          key={page}
          page={page}
          onClick={() => onPageChange(page)}
          isActive={page === currentPage}
        />
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="elipsis-end">...</span>);
      }
      pages.push(
        <PaginationButton
          key={totalPages}
          page={totalPages}
          onClick={() => onPageChange(totalPages)}
          isActive={false}
        />
      );
    }

    return pages;
  };

  return (
    <>
      <PaginationNavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        label="Anterior"
      />
      <div
        className={cn(
          "flex gap-4 justify-center min-w-64",
          isSmallScreen ? "min-w-32" : ""
        )}
      >
        {getPages()}
      </div>
      <PaginationNavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        label="Siguiente"
      />
    </>
  );
};

export default PaginationButtons;
