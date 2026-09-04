import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import Container from "../components/container/Container";
import {
  UserIcon,
  HeartIcon,
  CartIcon,
  LocationIcon,
  CameraIcon,
  LogoutIcon,
} from "../components/common/Icons";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { useLocationContext } from "../context/LocationContext";
import { footerCategories, footerLinks } from "../data/footer";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { cartCount } = useCart();
  const { location } = useLocationContext();
  const savedUser = JSON.parse(localStorage.getItem("user") || "null");
  const [name, setName] = useState(savedUser?.name || "");
  const [email] = useState(savedUser?.email || "");
  const [phone, setPhone] = useState(savedUser?.phone || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");
  const [saved, setSaved] = useState(false);

  // Если пользователь не вошёл
  if (localStorage.getItem("isLoggedIn") !== "true") {
    navigate("/");
    return null;
  }

  // Выбор фотографии
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Проверяем, что это изображение
    if (!file.type.startsWith("image/")) {
      alert("Zəhmət olmasa şəkil seçin.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;

      setAvatar(image);
      localStorage.setItem("avatar", image);
    };

    reader.readAsDataURL(file);
  };

  // Сохранение профиля
  const handleSave = () => {
    const user = {
      ...savedUser,
      name,
      email,
      phone,
    };

    localStorage.setItem("user", JSON.stringify(user));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  // Выход
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8 pb-28 md:py-12 md:pb-12">
        <Container>
          {/* Заголовок */}
          <div className="mb-8">
            <p className="mb-2 text-sm text-gray-400">Hesab</p>

            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Mənim hesabım
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Şəxsi məlumatlarınızı və hesabınızı idarə edin.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            {/* Левая карточка */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary ring-4 ring-gray-50">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Profil şəkli"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserIcon className="h-6 w-6" />
                    )}
                  </div>

                  {/* Кнопка камеры */}
                  <label
                    htmlFor="avatar"
                    className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:bg-primary-dark"
                  >
                    <CameraIcon />

                    <input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <h2 className="mt-5 text-lg font-bold text-gray-900">
                  {name || "İstifadəçi"}
                </h2>

                <p className="mt-1 max-w-full truncate text-sm text-gray-500">
                  {email}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Profil şəklini dəyişmək üçün kameraya klikləyin
                </p>
              </div>

              {/* Быстрые ссылки */}
              <div className="mt-7 space-y-2">
                <Link
                  to="/favorites"
                  className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary">
                      <HeartIcon className="h-6 w-6" />
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                      Bəyəndiklərim
                    </span>
                  </div>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                    {favorites.length}
                  </span>
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary">
                      <CartIcon className="h-6 w-6" />
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                      Səbətim
                    </span>
                  </div>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                    {cartCount}
                  </span>
                </Link>

                <Link
                  to="/location"
                  className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary">
                      <LocationIcon className="h-6 w-6" alt />
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                      Çatdırılma ünvanı
                    </span>
                  </div>

                  <span className="text-xs text-gray-400">
                    {location ? "Seçilib" : "Seç"}
                  </span>
                </Link>
              </div>

              {/* Выход */}
              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                <LogoutIcon />
                Çıxış
              </button>
            </div>

            {/* Правая часть */}
            <div className="space-y-6">
              {/* Личная информация */}
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-7">
                  <h2 className="text-lg font-bold text-gray-900">
                    Şəxsi məlumatlar
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Hesabınızdakı məlumatları yeniləyin.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {/* Имя */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Ad və soyad
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adınızı daxil edin"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Телефон */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Telefon
                    </label>

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+994 XX XXX XX XX"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      E-mail
                    </label>

                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500"
                    />

                    <p className="mt-2 text-xs text-gray-400">
                      E-mail hesabın giriş məlumatıdır və dəyişdirilə bilməz.
                    </p>
                  </div>
                </div>

                {/* Сохранить */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    Yadda saxla
                  </button>

                  {saved && (
                    <span className="text-sm font-medium text-green-600">
                      Məlumatlar yadda saxlanıldı ✓
                    </span>
                  )}
                </div>
              </div>

              {/* Заказы */}
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Sifarişlərim
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Sifariş tarixçəniz burada görünəcək.
                    </p>
                  </div>

                  <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
                    <CartIcon className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-gray-200 px-5 py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <CartIcon className="h-6 w-6" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-gray-700">
                    Hələ sifarişiniz yoxdur
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    İlk sifarişinizi verdikdən sonra burada görünəcək.
                  </p>

                  <Link
                    to="/"
                    className="mt-5 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    Alış-verişə başla
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </div>
  );
}
