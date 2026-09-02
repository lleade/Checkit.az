import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/container/Container";
import ProductCard from "../components/products/ProductCard";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import CategoryFilters from "../components/categories/CategoryFilters";
import Pagination from "../components/common/Pagination";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FilterIcon,
  ChevronDownIcon,
  CloseIcon,
} from "../components/common/Icons";

import { getFilterValue } from "../data/filterExtractors";
import { categoryFilters } from "../data/filters";
import { categories } from "../data/categories";
import { footerCategories, footerLinks } from "../data/footer";

import { useProducts } from "../context/ProductsContext";

const PRODUCTS_PER_PAGE = 20;

const sortLabels = {
  "price-desc": "Bahadan ucuza",
  "price-asc": "Ucuzdan bahaya",
  newest: "Yeni yüklənənlər",
};

export default function CategoryPage() {
  const { categorySlug, subcategorySlug } = useParams();

  const { products, loading, error } = useProducts();

  const [selectedFilters, setSelectedFilters] = useState({});

  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });

  const [sortOption, setSortOption] = useState("price-desc");

  const [currentPage, setCurrentPage] = useState(1);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [isSortOpen, setIsSortOpen] = useState(false);

  const category = categories.find((item) => item.slug === categorySlug);

  const subcategory = subcategorySlug
    ? category?.subcategories.find((item) => item.slug === subcategorySlug)
    : null;

  const filterConfig = categoryFilters[categorySlug] || [];

  const subcategoryNameMap = useMemo(() => {
    if (!category) return {};

    return Object.fromEntries(
      category.subcategories.map((sub) => [sub.slug, sub.name]),
    );
  }, [category]);

  const relevantSlugs = useMemo(() => {
    if (!category) return [];

    if (subcategorySlug) {
      return [subcategorySlug];
    }

    return category.subcategories.map((item) => item.slug);
  }, [category, subcategorySlug]);

  const baseProducts = useMemo(() => {
    return products.filter((product) =>
      relevantSlugs.includes(product.category),
    );
  }, [products, relevantSlugs]);

  const categoryProducts = useMemo(() => {
    const min = priceRange.min !== "" ? Number(priceRange.min) : null;
    const max = priceRange.max !== "" ? Number(priceRange.max) : null;

    return baseProducts
      .filter((product) => {
        if (min !== null && product.price < min) {
          return false;
        }

        if (max !== null && product.price > max) {
          return false;
        }

        return Object.entries(selectedFilters).every(([key, values]) => {
          if (!values || values.length === 0) {
            return true;
          }

          const productValue = getFilterValue(product, key);

          return productValue && values.includes(String(productValue));
        });
      })
      .sort((a, b) => {
        if (sortOption === "price-asc") {
          return a.price - b.price;
        }

        if (sortOption === "price-desc") {
          return b.price - a.price;
        }

        return b.id - a.id;
      });
  }, [baseProducts, selectedFilters, priceRange, sortOption]);

  const totalPages = Math.max(
    1,
    Math.ceil(categoryProducts.length / PRODUCTS_PER_PAGE),
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;

    return categoryProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [categoryProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedFilters,
    priceRange,
    sortOption,
    categorySlug,
    subcategorySlug,
  ]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setIsSortOpen(false);
  };

  const notFound = !category || (subcategorySlug && !subcategory);

  if (notFound) {
    return (
      <>
        <Header />

        <Container className="py-20">
          <h1 className="text-2xl font-bold">Kateqoriya tapılmadı</h1>
        </Container>

        <Footer categories={footerCategories} links={footerLinks} />

        <MobileBottomNav />
      </>
    );
  }

  /* SKELETON */
  if (loading) {
    return (
      <>
        <Header />

        <main className="bg-gray-50 pb-20 pt-4 sm:pb-8 sm:pt-6">
          <Container>
            <div className="animate-pulse">
              {/* Breadcrumbs */}
              <div className="mb-6 flex gap-2">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-4 w-4 rounded bg-gray-200" />
                <div className="h-4 w-28 rounded bg-gray-200" />
              </div>

              <div className="flex flex-col gap-6 lg:flex-row">
                {/* Sidebar */}
                <aside className="hidden w-[240px] shrink-0 lg:block">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="mb-6 h-6 w-28 rounded bg-gray-200" />

                    <div className="space-y-5">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index}>
                          <div className="mb-3 h-4 w-24 rounded bg-gray-200" />
                          <div className="h-9 w-full rounded-lg bg-gray-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>

                {/* Products */}
                <section className="min-w-0 flex-1">
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <div className="h-9 w-48 rounded bg-gray-200" />
                      <div className="mt-2 h-4 w-28 rounded bg-gray-100" />
                    </div>

                    {/* Sort */}
                    <div className="hidden h-10 w-[200px] rounded-full bg-gray-200 lg:block" />
                  </div>

                  {/* Product cards */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
                      >
                        {/* Image */}
                        <div className="aspect-square bg-gray-200" />

                        {/* Info */}
                        <div className="p-4">
                          <div className="mb-3 h-3 w-20 rounded bg-gray-100" />

                          <div className="mb-2 h-4 w-full rounded bg-gray-200" />
                          <div className="mb-4 h-4 w-4/5 rounded bg-gray-200" />

                          <div className="mb-4 h-6 w-24 rounded bg-gray-200" />

                          <div className="h-10 w-full rounded-xl bg-gray-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </Container>
        </main>

        <Footer categories={footerCategories} links={footerLinks} />

        <MobileBottomNav />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />

        <Container className="py-20 text-center text-sm text-red-500">
          Məhsulları yükləmək mümkün olmadı: {error}
        </Container>

        <Footer categories={footerCategories} links={footerLinks} />

        <MobileBottomNav />
      </>
    );
  }

  const pageTitle = subcategory ? subcategory.name : category.name;

  return (
    <>
      <Header />

      <main className="pb-20 pt-4 sm:pb-8 sm:pt-6">
        <Container>
          {/* Breadcrumbs */}
          <Breadcrumbs
            categorySlug={categorySlug}
            subcategorySlug={subcategorySlug}
          />

          {/* Main layout */}
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden w-[240px] shrink-0 lg:block">
              <CategoryFilters
                products={baseProducts}
                filterConfig={filterConfig}
                subcategoryNameMap={subcategoryNameMap}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </aside>

            {/* Products */}
            <section className="min-w-0 flex-1">
              {/* Mobile / Tablet Controls */}
              <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
                {/* Filter Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-primary bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  <FilterIcon className="h-5 w-5 text-primary" />

                  <span>Filtrlər</span>

                  <ChevronDownIcon className="h-4 w-4 text-primary" />
                </button>

                {/* Mobile / Tablet Sort */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex h-10 w-[185px] items-center justify-between rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                  >
                    <span>{sortLabels[sortOption]}</span>

                    <ChevronDownIcon
                      className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${
                        isSortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isSortOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[220px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xl">
                      <button
                        type="button"
                        onClick={() => handleSortChange("price-desc")}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                          sortOption === "price-desc"
                            ? "bg-gray-100 font-medium text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex h-5 w-5 items-center justify-center">
                          {sortOption === "price-desc" ? "✓" : ""}
                        </span>
                        Bahadan ucuza
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSortChange("price-asc")}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                          sortOption === "price-asc"
                            ? "bg-gray-100 font-medium text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex h-5 w-5 items-center justify-center">
                          {sortOption === "price-asc" ? "✓" : ""}
                        </span>
                        Ucuzdan bahaya
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSortChange("newest")}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                          sortOption === "newest"
                            ? "bg-gray-100 font-medium text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex h-5 w-5 items-center justify-center">
                          {sortOption === "newest" ? "✓" : ""}
                        </span>
                        Yeni yüklənənlər
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Page Header */}
              <div className="mb-5 flex items-start justify-between sm:mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {pageTitle}
                  </h1>

                  <p className="mt-1 text-sm text-gray-500 sm:mt-2">
                    {categoryProducts.length} məhsul tapıldı
                  </p>
                </div>

                {/* Desktop Sort */}
                <div className="relative hidden lg:block">
                  <button
                    type="button"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex h-10 w-[200px] items-center justify-between rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 cursor-pointer"
                  >
                    <span>{sortLabels[sortOption]}</span>

                    <ChevronDownIcon
                      className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${
                        isSortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isSortOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[220px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xl">
                      <button
                        type="button"
                        onClick={() => handleSortChange("price-desc")}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                          sortOption === "price-desc"
                            ? "bg-gray-100 font-medium text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex h-5 w-5 items-center justify-center">
                          {sortOption === "price-desc" ? "✓" : ""}
                        </span>
                        Bahadan ucuza
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSortChange("price-asc")}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                          sortOption === "price-asc"
                            ? "bg-gray-100 font-medium text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex h-5 w-5 items-center justify-center">
                          {sortOption === "price-asc" ? "✓" : ""}
                        </span>
                        Ucuzdan bahaya
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSortChange("newest")}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                          sortOption === "newest"
                            ? "bg-gray-100 font-medium text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex h-5 w-5 items-center justify-center">
                          {sortOption === "newest" ? "✓" : ""}
                        </span>
                        Yeni yüklənənlər
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Products */}
              {paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <p className="py-20 text-center text-sm text-gray-500">
                  Bu kateqoriyada məhsul tapılmadı
                </p>
              )}
            </section>
          </div>
        </Container>
      </main>

      {/* Mobile / Tablet Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setIsMobileFiltersOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/40"
          />

          {/* Left Panel */}
          <div className="absolute left-0 top-0 flex h-full w-[min(380px,90vw)] flex-col bg-white shadow-2xl">
            {/* Drawer Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Filtrlər
              </h2>

              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex-1 overflow-y-auto p-4">
              <CategoryFilters
                products={baseProducts}
                filterConfig={filterConfig}
                subcategoryNameMap={subcategoryNameMap}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </div>
        </div>
      )}

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </>
  );
}

