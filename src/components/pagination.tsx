import { cn } from "@/lib/utils";
import useIsSmallScreen from "@/hooks/useIsSmallScreen";

const PaginationButtons = ({ totalPages, currentPage, onPageChange }: any) => {
  const isSmallScreen = useIsSmallScreen();

  const MAX_BUTTONS = isSmallScreen ? 1 : 3;

  const getPages = () => {
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(MAX_BUTTONS / 2));
    let endPage = Math.min(totalPages, startPage + MAX_BUTTONS - 1);

    if (startPage > 1) {
      pages.push(
        <button
          className="hover:underline hover:underline-offset-2"
          key={1}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="elipsis-start">...</span>);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "hover:underline hover:underline-offset-2",
            page === currentPage
              ? " bg-[#101727] rounded-full w-9 h-9 p-1 text-white flex justify-center items-center"
              : ""
          )}
        >
          {page}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="elipsis-end">...</span>);
      }
      pages.push(
        <button
          className="hover:underline hover:underline-offset-2"
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <>
      <button
        className={cn(
          "hover:underline hover:underline-offset-2 cursor-pointer",
          currentPage <= 1 ? "hover:no-underline opacity-35" : ""
        )}
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Anterior
      </button>
      <div
        className={cn(
          "flex gap-4 justify-center min-w-64",
          isSmallScreen ? "min-w-32" : ""
        )}
      >
        {getPages()}
      </div>
      <button
        className={cn(
          "hover:underline hover:underline-offset-2",
          currentPage >= totalPages ? "hover:no-underline opacity-35" : ""
        )}
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Siguiente
      </button>
    </>
  );
};

export default PaginationButtons;
