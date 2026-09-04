import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Favorites from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LocationPage from "./pages/LocationPage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import BrandPage from "./pages/BrandPage";
import BrandsPage from "./pages/BrandsPage";
import ProductsPage from "./pages/ProductsPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./components/common/ScrollToTop";
import PageLoader from "./components/ui/PageLoader";

export default function App() {
  return (
    <BrowserRouter>
      <PageLoader />
      <ScrollToTop />

      <Routes>
        {/* Главная */}
        <Route path="/" element={<Home />} />

        {/* Товар */}
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Избранное */}
        <Route path="/favorites" element={<Favorites />} />

        {/* Корзина */}
        <Route path="/cart" element={<CartPage />} />

        {/* Оформление заказа */}
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Локация */}
        <Route path="/location" element={<LocationPage />} />

        {/* Категории */}
        <Route path="/category/:categorySlug" element={<CategoryPage />} />

        <Route
          path="/category/:categorySlug/:subcategorySlug"
          element={<CategoryPage />}
        />

        {/* Поиск */}
        <Route path="/search" element={<SearchPage />} />

        {/* Профиль */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Бренды */}
        <Route path="/brands" element={<BrandsPage />} />

        <Route path="/brand/:slug" element={<BrandPage />} />

        {/* Списки товаров */}
        <Route path="/products/:filterType" element={<ProductsPage />} />

        {/* Блог */}
        <Route path="/blog/:id" element={<BlogPage />} />

        {/* Про нас */}
        <Route path="/haqqimizda" element={<AboutPage />} />

        {/* Часто задаваемые вопросы */}
        <Route path="/faq" element={<FAQPage />} />

        {/* 404 страница */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
