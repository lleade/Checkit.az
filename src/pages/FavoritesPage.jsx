import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/container/Container";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import { footerCategories, footerLinks } from "../data/footer";
import { BookmarkIcon } from "../components/common/Icons";
import ProductCard from "../components/products/ProductCard";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <>
      <Header />

      <main className="min-h-[60vh] bg-white py-8">
        <Container>
          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Bəyəndiklərim</h1>

            <p className="mt-2 text-sm text-gray-500">
              {favorites.length > 0
                ? `${favorites.length} məhsul yadda saxlanılıb`
                : "Hələ heç bir məhsul yadda saxlanılmayıb"}
            </p>
          </div>

          {/* Если избранное пустое */}
          {favorites.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-gray-100 px-6 text-center">
              <BookmarkIcon className="mb-4 h-16 w-16 text-gray-300" />

              <h2 className="text-xl font-bold text-gray-900">
                Sevimlilər boşdur
              </h2>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                Bəyəndiyiniz məhsulları yadda saxlayın və onları daha sonra
                asanlıqla tapa bilərsiniz.
              </p>

              <Link
                to="/"
                className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Məhsullara bax
              </Link>
            </div>
          ) : (
            /* Избранные товары */
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />
      <MobileBottomNav />
    </>
  );
}
