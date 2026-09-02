import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useFavorites } from "../../context/FavoritesContext";
import { categories } from "../../data/categories";
import { CategoryIcon } from "../common/CategoryIcon";
import Logo from "../common/Logo";
import ContactModal from "../common/ContactModal";
import { HomeIcon, GridIcon, ChatIcon, HeartIcon, UserIcon, CloseIcon, ChevronRightIcon, BackIcon } from "../common/Icons";

const NavItem = ({
  label,
  active = false,
  elevated = false,
  children,
  to,
  onClick,
}) => {
  const content = (
    <>
      <span
        className={`flex items-center justify-center rounded-full border transition-all duration-300 backdrop-blur-xl ${
          elevated
            ? "-mt-6 h-14 w-14 border-primary bg-gray-200 text-gray-700 shadow-[0_14px_34px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] max-[360px]:-mt-5 max-[360px]:h-12 max-[360px]:w-12"
            : active
              ? "h-10 w-10 border-white/55 bg-white/50 text-primary shadow-[0_10px_24px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] max-[360px]:h-9 max-[360px]:w-9"
              : "h-10 w-10 border-white/35 bg-white/35 text-gray-600 shadow-[0_8px_18px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.55)] max-[360px]:h-9 max-[360px]:w-9"
        }`}
      >
        {children}
      </span>

      <span className="truncate leading-none">{label}</span>
    </>
  );

  const className = `flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-medium transition-all duration-300 max-[360px]:gap-0.5 max-[360px]:py-1.5 max-[360px]:text-[10px] ${
    elevated ? "text-gray-500" : active ? "text-primary" : "text-gray-500"
  }`;

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      className={className}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

function CatalogModal({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState(null);

  const currentCategorySlug = location.pathname.startsWith("/category/")
    ? location.pathname.split("/")[2]
    : null;

  const currentSubcategorySlug = location.pathname.startsWith("/category/")
    ? location.pathname.split("/")[3]
    : null;

  const handleCategoryClick = (category) => {
    if (!category.subcategories?.length) {
      onClose();
      navigate(`/category/${category.slug}`);
      return;
    }

    setActiveCategory(category);
  };

  const handleSeeAllClick = (category) => {
    onClose();
    navigate(`/category/${category.slug}`);
  };

  const handleSubcategoryClick = (categorySlug, subcategorySlug) => {
    onClose();
    navigate(`/category/${categorySlug}/${subcategorySlug}`);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/25 backdrop-blur-[2px] md:hidden"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 32,
        }}
      >
        {/* Заголовок */}
        {activeCategory ? (
          <div className="flex items-center gap-2 px-2 pb-3 pt-[max(env(safe-area-inset-top),1rem)]">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              aria-label="Geri"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            >
              <BackIcon />
            </button>

            <h2 className="flex-1 truncate px-1 text-base font-semibold text-gray-900">
              {activeCategory.name}
            </h2>

            <button
              type="button"
              onClick={onClose}
              aria-label="Bağla"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-4 pb-3 pt-[max(env(safe-area-inset-top),1rem)]">
            <Logo variant="dark" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Bağla"
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        <div className="border-b border-gray-100" />

        {/* Список */}
        <div className="flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
          {activeCategory ? (
            <>
              {/* Hamısını gör */}
              <button
                type="button"
                onClick={() => handleSeeAllClick(activeCategory)}
                className={`flex w-full items-center justify-between gap-3 rounded-full border px-4 py-3.5 text-left transition-colors ${
                  activeCategory.slug === currentCategorySlug &&
                  !currentSubcategorySlug
                    ? "border-primary/30 bg-primary/10"
                    : "border-primary/20 bg-primary/5 hover:bg-primary/10"
                }`}
              >
                <span className="text-sm font-semibold text-primary">
                  Hamısını gör
                </span>

                <ChevronRightIcon />
              </button>

              {/* Alt kateqoriyalar */}
              {activeCategory.subcategories.map((sub) => {
                const isActive =
                  activeCategory.slug === currentCategorySlug &&
                  sub.slug === currentSubcategorySlug;

                return (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() =>
                      handleSubcategoryClick(activeCategory.slug, sub.slug)
                    }
                    className={`flex w-full items-center justify-between gap-3 rounded-full border px-4 py-3.5 text-left transition-colors ${
                      isActive
                        ? "border-gray-200 bg-gray-200"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm font-medium leading-tight text-gray-900">
                      {sub.name}
                    </span>

                    <ChevronRightIcon />
                  </button>
                );
              })}
            </>
          ) : (
            categories.map((category) => {
              const isActive =
                category.slug === currentCategorySlug &&
                !currentSubcategorySlug;

              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`flex w-full items-center justify-between gap-3 rounded-full border px-4 py-3.5 text-left transition-colors ${
                    isActive
                      ? "border-gray-200 bg-gray-200"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <CategoryIcon type={category.icon} label={category.name} />

                    <span className="text-sm font-medium leading-tight text-gray-900">
                      {category.name}
                    </span>
                  </div>

                  <ChevronRightIcon />
                </button>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MobileBottomNav() {
  const location = useLocation();
  const { favorites } = useFavorites();

  const [contactOpen, setContactOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const isHomePage = location.pathname === "/";
  const isFavoritesPage = location.pathname === "/favorites";
  const isCatalogPage = location.pathname.startsWith("/category");
  const isProfilePage = location.pathname === "/profile";

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-50 px-2 pb-2.5 md:hidden sm:px-3 sm:pb-3">
        <div className="mx-auto w-full max-w-lg rounded-3xl border border-white/45 bg-white/25 px-1.5 pt-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-[28px] sm:px-2">
          <div className="grid max-w-130 grid-cols-5 pb-[max(env(safe-area-inset-bottom),0px)]">
            <NavItem label="Əsas" to="/" active={isHomePage}>
              <HomeIcon active={isHomePage} />
            </NavItem>

            <NavItem
              label="Kataloq"
              active={isCatalogPage}
              onClick={() => setCatalogOpen(true)}
            >
              <GridIcon active={isCatalogPage} />
            </NavItem>

            <NavItem
              label="Əlaqə"
              elevated
              onClick={() => setContactOpen(true)}
            >
              <ChatIcon />
            </NavItem>

            <NavItem label="Favorilər" to="/favorites" active={isFavoritesPage}>
              <div className="relative">
                <HeartIcon active={isFavoritesPage} />

                {favorites.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold leading-none text-white">
                    {favorites.length}
                  </span>
                )}
              </div>
            </NavItem>
            <NavItem label="Profil" to="/profile" active={isProfilePage}>
              <UserIcon active={isProfilePage} />
            </NavItem>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
        {catalogOpen && <CatalogModal onClose={() => setCatalogOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
