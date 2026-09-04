import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import Container from "../components/container/Container";
import Pagination from "../components/common/Pagination";
import { brands } from "../data/brands";
import { footerCategories, footerLinks } from "../data/footer";

export default function BrandsPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const brandsPerPage = 24;
  const totalPages = Math.ceil(brands.length / brandsPerPage);
  const startIndex = (currentPage - 1) * brandsPerPage;
  const currentBrands = brands.slice(startIndex, startIndex + brandsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBrandClick = (slug) => {
    navigate(`/brand/${slug}`);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-6 lg:py-8">
        <Container>
          {/* Заголовок */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
              Bütün brendlər
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Sevdiyiniz brendi seçin və məhsullara baxın
            </p>
          </div>

          {/* Сетка брендов */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {currentBrands.map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                onClick={() => handleBrandClick(brand.slug)}
              />
            ))}
          </div>

          {/* Пагинация */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </>
  );
}

/* =========================================================
   Карточка бренда
========================================================= */

function BrandCard({ brand, onClick }) {
  const [imageError, setImageError] = useState(false);

  // Если картинка не загрузилась —
  // показываем первые буквы названия бренда
  const initials = brand.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      onClick={onClick}
      className="
        group
        flex
        cursor-pointer
        flex-col
        items-center
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        text-center
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-primary/20
        hover:shadow-md
      "
    >
      {/* Логотип */}
      <div
        className="
          flex
          h-16
          w-full
          items-center
          justify-center
        "
      >
        {!imageError && brand.logo ? (
          <img
            src={brand.logo}
            alt={brand.name}
            className="
              max-h-14
              max-w-[130px]
              object-contain
              transition-transform
              duration-200
              group-hover:scale-105
            "
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-xl font-bold text-gray-400">{initials}</span>
        )}
      </div>

      {/* Название + кнопка */}
      <h2 className="mt-3 truncate text-sm font-bold text-gray-900">
        {brand.name}
      </h2>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="
          mt-2
          cursor-pointer
          rounded-full
          bg-gray-100
          px-3
          py-1
          text-xs
          font-medium
          text-gray-600
          transition-colors
          duration-200
          hover:bg-gray-200
        "
      >
        Məhsullara bax
      </button>
    </div>
  );
}
