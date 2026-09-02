import { useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../components/container/Container";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import ProductCard from "../components/products/ProductCard";
import Pagination from "../components/common/Pagination";

import { footerCategories, footerLinks } from "../data/footer";
import { useProducts } from "../context/ProductsContext";

export default function ProductsPage() {
  const { filterType } = useParams();

  const { products, loading, error } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 24;

  let title = "";
  let filteredProducts = [];

  if (filterType === "featured") {
    title = "Populyar Təkliflər";
    filteredProducts = products.filter((product) => product.featured);
  }

  if (filterType === "bestseller") {
    title = "Ən Çox Satılanlar";
    filteredProducts = products.filter((product) => product.bestseller);
  }

  if (filterType === "recommended") {
    title = "Tövsiyə olunanlar";
    filteredProducts = products.filter((product) => product.recommended);
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="bg-gray-50 py-8 lg:py-12">
        <Container>
          {/* Заголовок */}
          <div className="mb-8">
            {loading ? (
              <>
                <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200" />

                <div className="mt-3 h-4 w-24 animate-pulse rounded bg-gray-200" />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {title}
                </h1>

                {!error && (
                  <p className="mt-2 text-sm text-gray-500">
                    {filteredProducts.length} məhsul
                  </p>
                )}
              </>
            )}
          </div>

          {/* Skeleton */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {Array.from({ length: 24 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
                >
                  {/* Image */}
                  <div className="aspect-square w-full animate-pulse bg-gray-200" />

                  {/* Content */}
                  <div className="p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                    <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-200" />

                    <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-200" />

                    <div className="mt-5 h-6 w-1/2 animate-pulse rounded bg-gray-200" />

                    <div className="mt-4 h-10 w-full animate-pulse rounded-xl bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* Ошибка */
            <div className="py-20 text-center text-red-500">
              Məhsulları yükləmək mümkün olmadı
            </div>
          ) : !title ? (
            /* Неправильный filterType */
            <div className="rounded-2xl bg-white py-20 text-center">
              <h2 className="text-xl font-bold text-gray-900">
                Səhifə tapılmadı
              </h2>

              <p className="mt-2 text-gray-500">
                Bu məhsul bölməsi mövcud deyil.
              </p>
            </div>
          ) : currentProducts.length === 0 ? (
            /* Нет товаров */
            <div className="rounded-2xl bg-white py-20 text-center">
              <h2 className="text-xl font-bold text-gray-900">
                Məhsul tapılmadı
              </h2>

              <p className="mt-2 text-gray-500">
                Bu bölmədə hazırda məhsul yoxdur.
              </p>
            </div>
          ) : (
            <>
              {/* Товары */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </div>
  );
}
