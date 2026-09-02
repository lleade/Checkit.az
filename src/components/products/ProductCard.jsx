import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

import { BookmarkIcon, CartIcon, CloseIcon, ImageAltIcon } from "../common/Icons";
export default function ProductCard({ product, animateImmediately = false }) {
  const { title, specs, price, originalPrice, discount } = product;

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  const location = useLocation();

  const isFavoritesPage = location.pathname === "/favorites";
  const saved = isFavorite(product.id);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        animate={animateImmediately ? { opacity: 1, y: 0 } : undefined}
        whileInView={animateImmediately ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="relative mb-3">
          {/* Discount */}
          {discount && (
            <span className="absolute left-0 top-0 z-10 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
              -{discount} ₼
            </span>
          )}

          {/* Favorite */}
          <button
            type="button"
            aria-label={isFavoritesPage ? "Sevimlilərdən sil" : "Yadda saxla"}
            onClick={handleSave}
            className={`
            absolute right-0 top-0 z-20
            flex h-9 w-9 items-center justify-center
            rounded-full
          bg-white
          text-primary
            opacity-100
            shadow-sm
            cursor-pointer
            transition-opacity duration-200
            lg:opacity-0
            lg:group-hover:opacity-100 ${
              isFavoritesPage
                ? "text-gray-400 hover:border-red-200 hover:text-red-500"
                : "text-primary"
            }`}
          >
            {isFavoritesPage ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <BookmarkIcon saved={saved} />
            )}
          </button>

          {/* Product image */}
          <div className="flex h-36 items-center justify-center rounded-xl p-1">
            {product.images?.length ? (
              <img
                src={product.images[0]}
                alt={title}
                className="max-h-full scale-110 object-contain transition duration-300 group-hover:scale-115"
              />
            ) : (
              <ImageAltIcon className="h-12 w-12 text-gray-300" />
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-1 line-clamp-2 text-sm font-bold text-gray-900">
          {title}
        </h3>

        {/* Specs */}
        <div className="mb-4 space-y-1">
          {Array.isArray(specs) ? (
            specs.slice(0, 3).map((spec, index) => (
              <p
                key={index}
                className="flex items-center gap-1 text-xs text-gray-500"
              >
                <span className="h-1 w-1 rounded-full bg-gray-400" />
                <span className="truncate">{spec}</span>
              </p>
            ))
          ) : (
            <p className="text-xs text-gray-500">{specs}</p>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center justify-between gap-2">
          {originalPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-400 line-through">
                {originalPrice} ₼
              </span>
              <span className="text-lg font-extrabold text-red-600">
                {price} ₼
              </span>
            </div>
          ) : (
            <span className="text-lg font-extrabold text-gray-900">
              {price} ₼
            </span>
          )}

          <button
            type="button"
            aria-label="Səbətə əlavə et"
            onClick={handleAddToCart}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white shadow-sm transition-colors hover:border-green-200"
          >
            <CartIcon className="h-5 w-5 text-green-600" />
          </button>
        </div>
      </motion.article>
    </Link>
  );
}
