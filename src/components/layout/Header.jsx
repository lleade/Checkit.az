import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import Container from "../container/Container";
import CategorySidebar from "../hero/CategorySidebar";
import ContactModal from "../common/ContactModal";
import ProfileModal from "../common/ProfileModal";
import {
  CategoriesIcon,
  SearchIcon,
  MessageIcon,
  HeartIcon,
  CartIcon,
  UserIcon,
  LogoutIcon,
} from "../common/Icons";
import { categories } from "../../data/categories";
import { useProducts } from "../../context/ProductsContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

const THEME = {
  light: {
    header:
      "sticky top-0 z-50 border-b border-gray-100 bg-white text-gray-900 duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
    input:
      "w-full rounded-full border border-gray-200 bg-white py-2.5 pl-5 pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
    actionButton: "bg-primary text-white hover:bg-primary-dark",
    iconButton: "border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
    searchIcon: "text-gray-400",
  },

  dark: {
    header:
      "sticky top-0 z-50 border-b border-gray-800 bg-[#111827] text-white shadow-lg shadow-black/10 duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
    input:
      "w-full rounded-full border border-white/15 bg-white/10 py-2.5 pl-5 pr-12 text-sm text-white placeholder:text-gray-400 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20",
    actionButton: "bg-white text-[#111827] hover:bg-gray-100",
    iconButton: "border-white/15 bg-white/5 text-white hover:bg-white/10",
    searchIcon: "text-gray-300",
  },
};

function IconButton({ children, label, className = "", onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

const MAX_SUGGESTIONS = 6;

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { products } = useProducts();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const [userEmail, setUserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const [isScrolled, setIsScrolled] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  const { favorites } = useFavorites();
  const { cartCount } = useCart();

  const categoriesRef = useRef(null);
  const contactRef = useRef(null);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  // Открытие контактов из Footer
  useEffect(() => {
    const handleOpenContact = () => {
      setContactOpen(true);
    };

    window.addEventListener("open-contact", handleOpenContact);

    return () => {
      window.removeEventListener("open-contact", handleOpenContact);
    };
  }, []);

  // Открытие профиля из MobileBottomNav
  useEffect(() => {
    const handleOpenProfile = () => {
      if (!isLoggedIn) {
        setProfileOpen(true);
      }
    };

    window.addEventListener("open-profile", handleOpenProfile);

    return () => {
      window.removeEventListener("open-profile", handleOpenProfile);
    };
  }, [isLoggedIn]);

  // Получаем пользователя
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const savedUser = localStorage.getItem("user");

    setIsLoggedIn(loggedIn);

    if (savedUser) {
      const user = JSON.parse(savedUser);

      setUserEmail(user.email);
      setUserPhoto(localStorage.getItem("avatar") || "");
    }
  }, []);

  // Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Закрытие при клике снаружи
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }

      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setContactOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Закрываем открытые элементы при переходе
  useEffect(() => {
    setIsSearchOpen(false);
    setContactOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname, location.search]);

  // Поиск
  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) return [];

    return products
      .filter((product) => {
        const title = String(product.title ?? "").toLowerCase();
        const brand = String(product.brand ?? "").toLowerCase();
        const sku = String(product.sku ?? "").toLowerCase();

        return title.includes(q) || brand.includes(q) || sku.includes(q);
      })
      .slice(0, MAX_SUGGESTIONS);
  }, [searchQuery, products]);

  const goToSearchPage = (query) => {
    const trimmed = query.trim();

    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    goToSearchPage(searchQuery);
  };

  const handleSuggestionClick = () => {
    setIsSearchOpen(false);
  };

  // =========================
  //        ПРОФИЛЬ
  // =========================

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setProfileMenuOpen((prev) => !prev);
      return;
    }

    setProfileOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setProfileMenuOpen(false);
    setUserEmail("");
    setUserPhoto("");
  };

  const handleProfileClose = () => {
    setProfileOpen(false);

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const savedUser = localStorage.getItem("user");

    setIsLoggedIn(loggedIn);

    if (savedUser) {
      const user = JSON.parse(savedUser);

      setUserEmail(user.email);
      setUserPhoto(localStorage.getItem("avatar") || "");
    }
  };

  const theme = isScrolled ? THEME.dark : THEME.light;

  return (
    <>
      <header className={theme.header}>
        <Container className="flex items-center gap-3 py-3 md:gap-6">
          {/* Логотип */}
          <div className="shrink-0">
            <Link to="/" aria-label="Главная" className="block md:hidden">
              <img
                src={
                  isScrolled
                    ? "/logo-mobile-light.svg"
                    : "/logo-mobile-dark.svg"
                }
                alt="Logo"
                className="block h-8 w-auto"
              />
            </Link>

            <div className="hidden md:block">
              <Logo variant={isScrolled ? "light" : "dark"} />
            </div>
          </div>

          {/* Categories */}
          {!isHomePage && (
            <div ref={categoriesRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsCategoriesOpen((prev) => !prev)}
                className={`hidden cursor-pointer items-center gap-2 rounded-lg px-8 py-2.5 text-sm font-semibold transition-colors sm:flex ${theme.actionButton}`}
              >
                <CategoriesIcon />
                Kateqoriyalar
              </button>

              {isCategoriesOpen && (
                <div className="absolute left-0 top-full z-[100] pt-3">
                  <CategorySidebar categories={categories} />
                </div>
              )}
            </div>
          )}

          {/* Поиск */}
          <div ref={searchRef} className="relative flex-1 md:ml-0">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => searchQuery && setIsSearchOpen(true)}
                placeholder="axtardığınız məhsulun seriya, model və ya adını yazın..."
                className={`${theme.input} hidden md:block`}
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => searchQuery && setIsSearchOpen(true)}
                placeholder="Axtar..."
                className={`${theme.input} block md:hidden`}
              />

              <button
                type="submit"
                aria-label="Axtar"
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.searchIcon}`}
              >
                <SearchIcon />
              </button>
            </form>

            {isSearchOpen && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl">
                {suggestions.length > 0 ? (
                  <>
                    <ul className="divide-y divide-gray-100">
                      {suggestions.map((product) => (
                        <li key={product.id}>
                          <Link
                            to={`/product/${product.id}`}
                            onClick={handleSuggestionClick}
                            className="flex items-center gap-3 px-4 py-3 transition hover:bg-gray-50"
                          >
                            <img
                              src={
                                Array.isArray(product.images)
                                  ? product.images[0]
                                  : product.images
                              }
                              alt={product.title}
                              className="h-12 w-12 shrink-0 rounded-lg border border-gray-100 object-contain"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-gray-900">
                                {product.title}
                              </p>

                              <p className="text-xs text-gray-500">
                                {product.brand}
                              </p>
                            </div>

                            <span className="shrink-0 text-sm font-semibold text-primary">
                              {product.price} ₼
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => goToSearchPage(searchQuery)}
                      className="block w-full cursor-pointer border-t border-gray-100 px-4 py-3 text-center text-sm font-semibold text-primary hover:bg-gray-50"
                    >
                      Bütün nəticələrə bax
                    </button>
                  </>
                ) : (
                  <p className="px-4 py-6 text-center text-sm text-gray-500">
                    Axtarışınıza uyğun məhsul tapılmadı
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Кнопки */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Əlaqə */}
            <div ref={contactRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setContactOpen((prev) => !prev)}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-8 py-2.5 text-sm font-semibold transition-colors ${theme.actionButton}`}
              >
                <MessageIcon />
                Əlaqə
              </button>

              {contactOpen && (
                <ContactModal onClose={() => setContactOpen(false)} />
              )}
            </div>

            {/* Favorites */}
            <div className="relative hidden md:block">
              <Link to="/favorites" className="block cursor-pointer">
                <IconButton
                  label="Bəyəndiklərim"
                  className={`${theme.iconButton} cursor-pointer`}
                >
                  <HeartIcon />
                </IconButton>

                {favorites.length > 0 && (
                  <span className="pointer-events-none absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Cart */}
            <div className="relative">
              <Link to="/cart" className="block">
                <IconButton
                  label="Səbət"
                  className={`${theme.iconButton} cursor-pointer`}
                >
                  <CartIcon />
                </IconButton>

                {cartCount > 0 && (
                  <span className="pointer-events-none absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative hidden md:block">
              <IconButton
                label="Profil"
                className={`${theme.iconButton} cursor-pointer`}
                onClick={handleProfileClick}
              >
                <UserIcon />
              </IconButton>

              {profileMenuOpen && isLoggedIn && (
                <div className="absolute right-0 top-full z-[100] mt-3 w-[260px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                  <div className="border-b border-gray-100 px-5 py-4">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
                      {userPhoto ? (
                        <img
                          src={userPhoto}
                          alt="Profil şəkli"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserIcon />
                      )}
                    </div>

                    <p className="text-sm font-semibold text-gray-800">
                      Hesabım
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {userEmail}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate("/profile");
                      }}
                      className="mt-3 w-full rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                      Profilə keç
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-red-500"
                  >
                    <LogoutIcon />
                    Çıxış
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>

      {/* Profile Modal */}
      {profileOpen && <ProfileModal onClose={handleProfileClose} />}
    </>
  );
}
