import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import Container from "../components/container/Container";
import ProductCard from "../components/products/ProductCard";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  ArrowLeft,
  ArrowRight,
  BookmarkIcon,
} from "../components/common/Icons";
import { categories } from "../data/categories";
import { footerCategories, footerLinks } from "../data/footer";
import { useProducts } from "../context/ProductsContext";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";

function ProductPageSkeleton() {
  return (
    <>
      <Header />

      <main className="bg-gray-50 py-8 lg:py-12">
        <Container>
          <div className="animate-pulse">
            {/* Breadcrumbs */}
            <div className="mb-6 flex gap-2">
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-4 w-4 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
            </div>

            {/* Product */}
            <div className="grid gap-8 rounded-2xl bg-white p-5 shadow-sm lg:grid-cols-2 lg:gap-12 lg:p-8">
              {/* Images */}
              <div className="w-full">
                <div className="h-[320px] rounded-2xl bg-gray-200 sm:h-[380px]" />

                <div className="mt-4 grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="aspect-square rounded-xl bg-gray-200"
                    />
                  ))}
                </div>
              </div>

              {/* Product info */}
              <div className="flex flex-col">
                {/* Brand + SKU */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-10 w-24 rounded-lg bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </div>

                {/* Title */}
                <div className="mb-2 h-8 w-full rounded bg-gray-200" />
                <div className="mb-2 h-8 w-4/5 rounded bg-gray-200" />

                {/* Stock */}
                <div className="mb-5 mt-3 h-5 w-24 rounded bg-gray-200" />

                {/* Specs */}
                <div className="mb-5 rounded-xl bg-gray-100 p-4">
                  <div className="mb-4 h-4 w-40 rounded bg-gray-200" />

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="h-4 w-32 rounded bg-gray-200"
                      />
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5 border-t border-gray-100 pt-4">
                  <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
                  <div className="h-10 w-40 rounded bg-gray-200" />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <div className="h-[52px] flex-1 rounded-xl bg-gray-200" />
                  <div className="h-[52px] w-[52px] rounded-xl bg-gray-200" />
                </div>

                {/* Advantages */}
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                  <div>
                    <div className="mb-2 h-4 w-32 rounded bg-gray-200" />
                    <div className="h-3 w-20 rounded bg-gray-200" />
                  </div>

                  <div>
                    <div className="mb-2 h-4 w-28 rounded bg-gray-200" />
                    <div className="h-3 w-20 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-8 h-8 w-52 rounded bg-gray-200" />

              <div className="space-y-4">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-11/12 rounded bg-gray-200" />
                <div className="h-4 w-4/5 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </div>
            </section>

            {/* Specifications */}
            <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-8 h-8 w-64 rounded bg-gray-200" />

              <div className="overflow-hidden rounded-xl border border-gray-200">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="grid grid-cols-1 gap-3 border-b border-gray-200 px-5 py-4 last:border-b-0 sm:grid-cols-2 sm:gap-6"
                  >
                    <div className="h-4 w-32 rounded bg-gray-200" />
                    <div className="h-4 w-40 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </section>

            {/* Similar products */}
            <section className="mt-10">
              <div className="mb-6 h-8 w-48 rounded bg-gray-200" />

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl bg-white"
                  >
                    <div className="h-48 bg-gray-200" />

                    <div className="space-y-3 p-4">
                      <div className="h-4 w-full rounded bg-gray-200" />
                      <div className="h-4 w-3/4 rounded bg-gray-200" />
                      <div className="h-6 w-24 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const { products, loading: productsLoading } = useProducts();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const product = products.find((item) => Number(item.id) === Number(id));

  useEffect(() => {
    setSelectedImage(0);
    setShowDescription(false);
    setShowSpecifications(false);
  }, [id]);

  const isFavorite = favorites.some(
    (item) => Number(item.id) === Number(product?.id),
  );

  if (productsLoading) {
    return <ProductPageSkeleton />;
  }

  // Товар не найден
  if (!product) {
    return (
      <>
        <Header />

        <main className="min-h-[60vh] bg-white">
          <Container className="py-20">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Məhsul tapılmadı
              </h1>

              <p className="mt-3 text-gray-500">
                Bu ID ilə məhsul mövcud deyil.
              </p>
            </div>
          </Container>
        </main>

        <Footer categories={footerCategories} links={footerLinks} />

        <MobileBottomNav />
      </>
    );
  }

  // Фотографии
  const images = Array.isArray(product.images)
    ? product.images.filter(Boolean)
    : [product.images].filter(Boolean);

  const currentImage = images[selectedImage] || images[0];

  // Родительская категория
  const parentCategory = categories.find((category) =>
    category.subcategories?.some((sub) => sub.slug === product.category),
  );

  // Все подкатегории этой категории
  const categorySlugs = parentCategory
    ? parentCategory.subcategories.map((sub) => sub.slug)
    : [product.category];

  // Товары из той же подкатегории
  const sameSubcategoryProducts = products.filter(
    (item) =>
      item.category === product.category &&
      Number(item.id) !== Number(product.id),
  );

  // Товары из других подкатегорий той же категории
  const sameCategoryProducts = products.filter(
    (item) =>
      Number(item.id) !== Number(product.id) &&
      item.category !== product.category &&
      categorySlugs.includes(item.category),
  );

  // Максимум 10 похожих товаров
  const similarProducts = [
    ...sameSubcategoryProducts,
    ...sameCategoryProducts,
  ].slice(0, 10);

  return (
    <>
      <Header />

      <main className="bg-gray-50 py-8 lg:py-12">
        <Container>
          <Breadcrumbs product={product} />

          {/* TOP PRODUCT SECTION */}
          <div className="grid gap-8 rounded-2xl bg-white p-5 shadow-sm lg:grid-cols-2 lg:gap-12 lg:p-8">
            {/* LEFT - IMAGES */}
            <div className="w-full">
              {/* Main image */}
              <div className="relative flex h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 sm:h-[380px]">
                {currentImage && (
                  <img
                    src={currentImage}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                )}

                {/* Left arrow */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-white"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}

                {/* Right arrow */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-white"
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-3">
                  {images.slice(0, 5).map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square w-full cursor-pointer overflow-hidden rounded-xl border bg-white p-2 transition-all duration-200 ${
                        selectedImage === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-gray-200 hover:border-primary"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT - PRODUCT INFO */}
            <div className="flex flex-col lg:py-1">
              {/* Brand + SKU */}
              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                {product.brand && (
                  <div className="flex h-10 min-w-24 items-center justify-center rounded-lg border border-gray-100 bg-white px-3">
                    <img
                      src={`/img/brands/${product.brand.toLowerCase()}.avif`}
                      alt={product.brand}
                      className="max-h-6 max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display =
                          "block";
                      }}
                    />

                    <span className="hidden text-xs font-semibold text-gray-700">
                      {product.brand}
                    </span>
                  </div>
                )}

                {product.sku && (
                  <span className="text-xs text-gray-400">
                    SKU: {product.sku}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 lg:text-[28px]">
                {product.title}
              </h1>

              {/* Stock */}
              <div className="mb-4">
                {product.stock ? (
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Stokda var
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-red-500">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Stokda yoxdur
                  </span>
                )}
              </div>

              {/* Short specs */}
              {product.specs?.length > 0 && (
                <div className="mb-5 rounded-xl bg-gray-50 p-4">
                  <h2 className="mb-3 text-sm font-semibold text-gray-900">
                    Əsas xüsusiyyətlər
                  </h2>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {product.specs.map((spec, index) => (
                      <div
                        key={`${spec}-${index}`}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mb-5 border-t border-gray-100 pt-4">
                {product.originalPrice && (
                  <div className="mb-1 flex items-center gap-3">
                    <span className="text-base text-gray-400 line-through">
                      {product.originalPrice} ₼
                    </span>

                    {product.discount && (
                      <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-500">
                        -{product.discount} ₼
                      </span>
                    )}
                  </div>
                )}

                <div className="text-3xl font-bold text-primary">
                  {product.price} ₼
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={!product.stock}
                  onClick={() => addToCart(product)}
                  className={`flex-1 cursor-pointer rounded-xl py-3.5 font-semibold text-white transition ${
                    product.stock
                      ? "bg-primary hover:opacity-90"
                      : "cursor-not-allowed bg-gray-300"
                  }`}
                >
                  {product.stock ? "Səbətə at" : "Stokda yoxdur"}
                </button>

                {/* Favorite */}
                <button
                  type="button"
                  disabled={!product.stock}
                  onClick={() => toggleFavorite(product)}
                  className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border transition ${
                    !product.stock
                      ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300"
                      : isFavorite
                        ? "cursor-pointer border-primary bg-primary/10 text-primary"
                        : "cursor-pointer border-gray-200 bg-white text-gray-500 hover:border-primary hover:text-primary"
                  }`}
                  aria-label="Seçilmişlərə əlavə et"
                >
                  <BookmarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Advantages */}
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">
                    Pulsuz çatdırılma
                  </p>

                  <p className="mt-1 text-xs">Ölkədaxili</p>
                </div>

                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">Rəsmi zəmanət</p>

                  <p className="mt-1 text-xs">Etibarlı alış</p>
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          {product.description?.length > 0 && (
            <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm lg:p-8">
              <h2 className="mb-8 text-2xl font-bold text-gray-900">
                Məhsul haqqında
              </h2>

              <div
                className={`relative overflow-hidden ${
                  showDescription ? "" : "max-h-[230px]"
                }`}
              >
                <div className="space-y-6">
                  {product.description.map((item, index) => (
                    <div key={index}>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="leading-7 text-gray-600">{item.text}</p>
                    </div>
                  ))}
                </div>

                {!showDescription && (
                  <div className="absolute inset-x-0 bottom-0 flex h-28 items-end justify-center bg-gradient-to-t from-white via-white/90 to-transparent pb-4">
                    <button
                      type="button"
                      onClick={() => setShowDescription(true)}
                      className="cursor-pointer font-semibold text-primary transition hover:opacity-70"
                    >
                      Daha çox göstər
                    </button>
                  </div>
                )}
              </div>

              {showDescription && product.description.length > 1 && (
                <button
                  type="button"
                  onClick={() => setShowDescription(false)}
                  className="mt-6 cursor-pointer font-semibold text-primary transition hover:opacity-70"
                >
                  Daha az göstər
                </button>
              )}
            </section>
          )}

          {/* SPECIFICATIONS */}
          {product.specifications &&
            Object.keys(product.specifications).length > 0 && (
              <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm lg:p-8">
                <h2 className="mb-8 text-2xl font-bold text-gray-900">
                  Texniki xüsusiyyətlər
                </h2>

                <div
                  className={`relative overflow-hidden ${
                    showSpecifications ? "" : "max-h-[230px]"
                  }`}
                >
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    {Object.entries(product.specifications).map(
                      ([key, value], index, entries) => (
                        <div
                          key={key}
                          className={`grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-2 sm:gap-6 ${
                            index !== entries.length - 1
                              ? "border-b border-gray-200"
                              : ""
                          }`}
                        >
                          <div className="font-medium text-gray-500">{key}</div>

                          <div className="font-medium text-gray-900">
                            {value}
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  {!showSpecifications && (
                    <div className="absolute inset-x-0 bottom-0 flex h-32 items-end justify-center bg-gradient-to-t from-white via-white/95 to-transparent pb-4">
                      <button
                        type="button"
                        onClick={() => setShowSpecifications(true)}
                        className="cursor-pointer font-semibold text-primary transition hover:opacity-70"
                      >
                        Daha çox göstər
                      </button>
                    </div>
                  )}
                </div>

                {showSpecifications &&
                  Object.entries(product.specifications).length > 1 && (
                    <button
                      type="button"
                      onClick={() => setShowSpecifications(false)}
                      className="mt-6 cursor-pointer font-semibold text-primary transition hover:opacity-70"
                    >
                      Daha az göstər
                    </button>
                  )}
              </section>
            )}

          {/* SIMILAR PRODUCTS */}
          {similarProducts.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Oxşar Məhsullar
              </h2>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {similarProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </>
  );
}
