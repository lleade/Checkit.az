import { useNavigate } from "react-router-dom";
import { MoreIcon } from "../common/Icons";

export default function BrandLogos({ brands }) {
  const navigate = useNavigate();

  const visibleBrands = brands.slice(0, 8);

  return (
    <div className="min-w-0">
      <div className="grid grid-cols-2 gap-2 pb-2 sm:grid-cols-4 lg:grid-cols-9">
        {visibleBrands.map((brand) => (
          <button
            key={brand.id}
            type="button"
            onClick={() => navigate(`/brand/${brand.slug}`)}
            className="flex h-14 cursor-pointer items-center justify-center rounded-xl border-gray-200 bg-white px-3 shadow-sm transition-all duration-300 hover:-translate-y-1"
            title={brand.name}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-7 w-full max-w-[84px] object-contain"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}

        <button
          type="button"
          aria-label="Daha çox brend"
          onClick={() => navigate("/brands")}
          className="flex h-14 cursor-pointer items-center justify-center rounded-xl border-gray-200 bg-[#f5f5f5] text-gray-400 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-gray-600"
        >
          <MoreIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

