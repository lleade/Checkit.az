import { ArrowLeft } from "./Icons";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  // Если страница всего одна, пагинация не нужна — ничего не показываем

  const getPageNumbers = () => {
    // Функция формирует номера страниц, которые будут показаны

    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  // Вызываем функцию и получаем готовые номера страниц

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 && (
        // Кнопка "Предыдущая" показывается только если мы не на первой странице

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          className="
            group flex h-11 items-center gap-2 rounded-xl border border-gray-200
            bg-white px-4 text-sm font-semibold text-gray-700
            shadow-sm transition-all duration-200
            hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md
            active:translate-y-0
          "
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Əvvəlki
        </button>
      )}

      {/* Pages */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              // Уникальный key для каждого многоточия

              className="flex h-11 min-w-10 items-center justify-center text-sm font-semibold text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
          flex h-11 min-w-12 items-center cursor-pointer justify-center rounded-xl
          px-3 text-sm font-semibold
          border transition-all duration-200
          ${
            page === currentPage
              ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
              : // Если это текущая страница — выделяем её

                "border-gray-200 bg-white text-gray-700 shadow-sm hover:border-primary/30 hover:bg-gray-50 hover:text-primary hover:shadow-md"
            // Если это другая страница — обычный стиль
          }
        `}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          className="
            group flex h-11 items-center cursor-pointer gap-2 rounded-xl
            bg-primary px-5 text-sm font-semibold text-white
            shadow-sm transition-all duration-200
            hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md
            active:translate-y-0
          "
        >
          Sonrakı
        </button>
      )}
    </nav>
  );
}
