import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import Container from "../components/container/Container";
import ProductCard from "../components/products/ProductCard";
import { brands } from "../data/brands";
import { footerCategories, footerLinks } from "../data/footer";
import { useProducts } from "../context/ProductsContext";

export default function BrandPage() {
  const { slug } = useParams();

  const { products, loading } = useProducts();

  const brand = brands.find((item) => item.slug === slug);

  const brandProducts = brand
    ? products.filter(
        (product) => product.brand?.toLowerCase() === brand.name.toLowerCase(),
      )
    : [];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-8 lg:py-12">
        <Container>
          {loading ? (
            <div className="py-20 text-center text-gray-500">Yüklənir...</div>
          ) : !brand ? (
            <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900">
                Brend tapılmadı
              </h1>
            </div>
          ) : (
            <>
              {/* Brand header */}
              <div className="mb-8 flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex h-20 w-28 items-center justify-center rounded-xl border border-gray-100 bg-white p-3">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-14 max-w-full object-contain"
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                    {brand.name}
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    {brandProducts.length} məhsul
                  </p>
                </div>
              </div>

              {/* Products */}
              {brandProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {brandProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Bu brendə aid məhsul yoxdur
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Hazırda bu brend üzrə məhsul tapılmadı.
                  </p>
                </div>
              )}
            </>
          )}
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </>
  );
}
