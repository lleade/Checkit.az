import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import Container from "../components/container/Container";
import ProductCard from "../components/products/ProductCard";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { footerCategories, footerLinks } from "../data/footer";
import { useProducts } from "../context/ProductsContext";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const { products, loading, error } = useProducts();

  const results = useMemo(() => {
    if (!query || !Array.isArray(products)) {
      return [];
    }

    const q = query.toLowerCase();

    return products.filter((product) => {
      const title = String(product.title ?? "").toLowerCase();
      const brand = String(product.brand ?? "").toLowerCase();
      const sku = String(product.sku ?? "").toLowerCase();

      return title.includes(q) || brand.includes(q) || sku.includes(q);
    });
  }, [query, products]);

  return (
    <>
      <Header />

      <main className="min-h-[60vh] py-6">
        <Container>
          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Header */}
          <div className="mb-6">
            {loading ? (
              <>
                <div className="h-9 w-80 animate-pulse rounded-lg bg-gray-200" />

                <div className="mt-3 h-4 w-32 animate-pulse rounded bg-gray-200" />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900">
                  "{query}" üzrə axtarış nəticələri
                </h1>

                {!error && (
                  <p className="mt-2 text-sm text-gray-500">
                    {results.length} məhsul tapıldı
                  </p>
                )}
              </>
            )}
          </div>

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => (
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
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-20 text-center">
              <p className="text-sm text-red-500">
                Məhsulları yükləmək mümkün olmadı.
              </p>

              <p className="mt-2 text-xs text-gray-400">{error}</p>
            </div>
          )}

          {/* Results */}
          {!loading && !error && results.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && !error && results.length === 0 && (
            <p className="py-20 text-center text-sm text-gray-500">
              {query
                ? "Axtarışınıza uyğun məhsul tapılmadı"
                : "Axtarış sorğusu daxil edin"}
            </p>
          )}
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </>
  );
}
