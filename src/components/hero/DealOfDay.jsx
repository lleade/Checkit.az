import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DealOfDay({ products = [] }) {
  const deals = useMemo(() => {
    // Если API содержит dealOfDay — используем их
    const markedDeals = products.filter((product) => product.dealOfDay);

    if (markedDeals.length > 0) {
      return markedDeals.slice(0, 5);
    }

    // Если такого поля нет — берём первые 5 товаров из API
    return products.slice(0, 5);
  }, [products]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [deals]);

  useEffect(() => {
    if (deals.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % deals.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [deals]);

  const deal = deals[current];

  if (!deal) return null;

  const image = Array.isArray(deal.images) ? deal.images[0] : deal.images;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={deal.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="flex min-h-[280px] flex-col p-4 md:min-h-[340px]"
        >
          <h3 className="mb-3 text-center text-sm font-bold text-gray-900">
            Günün Fürsəti 🔥
          </h3>

          <div className="mb-3 flex items-center justify-center gap-2">
            {deal.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₼ {deal.originalPrice}
              </span>
            )}

            <span className="text-2xl font-extrabold text-gray-900">
              ₼ {deal.price}
            </span>
          </div>

          <Link
            to={`/product/${deal.id}`}
            className="mb-4 flex flex-1 cursor-pointer items-center justify-center rounded-xl p-5"
          >
            {image && (
              <img
                src={image}
                alt={deal.title}
                className="max-h-40 object-contain transition-transform duration-300 hover:scale-105"
              />
            )}
          </Link>

          <Link
            to={`/product/${deal.id}`}
            className="line-clamp-2 text-center text-sm font-semibold text-gray-900 hover:text-primary"
          >
            {deal.title}
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
