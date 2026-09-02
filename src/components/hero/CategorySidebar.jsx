import { useState } from "react";
import { Link } from "react-router-dom";

import { CategoryIcon } from "../common/CategoryIcon";

export default function CategorySidebar({ categories }) {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="relative flex" onMouseLeave={() => setActiveCategory(null)}>
      {/* Categories */}
      <nav className="relative z-20 w-full rounded-2xl border border-gray-200 bg-white py-2">
        <ul>
          {categories.map((category) => (
            <li
              key={category.slug}
              onMouseEnter={() => setActiveCategory(category)}
            >
              <Link
                to={`/category/${category.slug}`}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm transition-colors ${
                  activeCategory?.slug === category.slug
                    ? "bg-gray-50 text-primary"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <CategoryIcon type={category.icon} label={category.name} />

                <span className="whitespace-nowrap cursor-pointer">
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Subcategories */}
      {activeCategory?.subcategories?.length > 0 && (
        <div className="absolute left-full top-0 z-30 min-h-[450px] min-w-[320px] rounded-2xl border border-l-0 border-gray-200 bg-white p-3 shadow-xl">
          <div className="flex flex-col">
            {activeCategory.subcategories.map((subcategory) => (
              <Link
                key={subcategory.slug}
                to={`/category/${activeCategory.slug}/${subcategory.slug}`}
                className="border-b border-gray-100 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-primary last:border-b-0"
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
