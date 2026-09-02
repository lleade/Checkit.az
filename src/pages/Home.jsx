import Container from "../components/container/Container";
import Header from "../components/layout/Header";
import HeroSection from "../components/hero/HeroSection";
import ProductSection from "../components/products/ProductSection";
import BlogSection from "../components/blog/BlogSection";
import AboutSection from "../components/layout/AboutSection";
import SocialBar from "../components/layout/SocialBar";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";

import { blogs } from "../data/blogs";
import { footerCategories, footerLinks } from "../data/footer";
import { categories } from "../data/categories";
import { brands } from "../data/brands";

import { useProducts } from "../context/ProductsContext";

function HeroSkeleton() {
  return (
    <div className="grid gap-4 py-6 lg:grid-cols-[240px_1fr]">
      {/* Categories */}
      <div className="hidden rounded-2xl border border-gray-200 bg-white p-3 lg:block">
        <div className="space-y-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl px-3 py-3"
            >
              <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />
              <div
                className="h-4 animate-pulse rounded bg-gray-200"
                style={{
                  width: `${80 + (index % 3) * 20}px`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="h-[300px] animate-pulse rounded-2xl bg-gray-200 sm:h-[350px] lg:h-[400px]" />
    </div>
  );
}

function ProductSkeleton() {
  return (
    <section className="py-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
          >
            <div className="aspect-square animate-pulse bg-gray-200" />

            <div className="p-4">
              <div className="mb-2 h-4 w-4/5 animate-pulse rounded bg-gray-200" />
              <div className="mb-3 h-4 w-3/5 animate-pulse rounded bg-gray-100" />
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { products, loading, error } = useProducts();

  const popularOffers =
    products.filter((product) => product.featured).length > 0
      ? products.filter((product) => product.featured)
      : products.slice(0, 6);

  const bestSellers =
    products.filter((product) => product.bestseller).length > 0
      ? products.filter((product) => product.bestseller)
      : products.slice(10, 16);

  const recommended =
    products.filter((product) => product.recommended).length > 0
      ? products.filter((product) => product.recommended)
      : products.slice(20, 26);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pb-24 md:pb-0">
        <Container>
          {loading ? (
            <>
              <HeroSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : error ? (
            <div className="py-20 text-center text-red-500">
              Məhsulları yükləmək mümkün olmadı
            </div>
          ) : (
            <>
              <HeroSection
                categories={categories}
                products={products}
                brands={brands}
              />

              {popularOffers.length > 0 && (
                <ProductSection
                  title="Populyar Təkliflər"
                  products={popularOffers}
                  animateImmediately
                  filterType="featured"
                />
              )}

              {bestSellers.length > 0 && (
                <ProductSection
                  title="Ən Çox Satılanlar"
                  products={bestSellers}
                  filterType="bestseller"
                />
              )}

              {recommended.length > 0 && (
                <ProductSection
                  title="Tövsiyə olunanlar"
                  products={recommended}
                  filterType="recommended"
                />
              )}
            </>
          )}

          {/* Static */}
          <BlogSection blogs={blogs} />
        </Container>
      </main>

      <AboutSection />
      <SocialBar />

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </div>
  );
}
