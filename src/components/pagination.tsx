const PaginationButtons = ({ totalPages, currentPage, onPageChange }: any) => {
  const MAX_BUTTONS = 3;

  const getPages = () => {
    const pages = [];

    if (currentPage > 1) {
      pages.push(
        <button key="prev" onClick={() => onPageChange(currentPage - 1)}>
          Anterior
        </button>
      );
    }

    let startPage = Math.max(1, currentPage - Math.floor(MAX_BUTTONS / 2));
    let endPage = Math.min(totalPages, startPage + MAX_BUTTONS - 1);

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)}>
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
          className={page === currentPage ? "active" : ""}
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
        <button key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <button key="next" onClick={() => onPageChange(currentPage + 1)}>
          Siguiente
        </button>
      );
    }

    return pages;
  };

  return <div className="flex gap-2 justify-center">{getPages()}</div>;
};

export default PaginationButtons;
