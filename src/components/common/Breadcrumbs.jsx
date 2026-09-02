import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

export default function Breadcrumbs({
  product,
  categorySlug,
  subcategorySlug,
}) {
  let category;
  let subcategory;

  // Если Breadcrumbs используется на странице товара
  if (product) {
    category = categories.find((item) =>
      item.subcategories?.some((sub) => sub.slug === product.category),
    );

    subcategory = category?.subcategories?.find(
      (sub) => sub.slug === product.category,
    );
  }

  // Если Breadcrumbs используется на странице категории
  if (categorySlug) {
    category = categories.find((item) => item.slug === categorySlug);

    if (subcategorySlug) {
      subcategory = category?.subcategories?.find(
        (sub) => sub.slug === subcategorySlug,
      );
    }
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 sm:mb-6 sm:text-sm"
    >
      <Link to="/" className="transition hover:text-primary">
        Əsas səhifə
      </Link>

      {category && (
        <>
          <span className="text-gray-400">›</span>

          {subcategory || product ? (
            <Link
              to={`/category/${category.slug}`}
              className="transition hover:text-primary"
            >
              {category.name}
            </Link>
          ) : (
            <span className="font-medium text-gray-700">{category.name}</span>
          )}
        </>
      )}

      {subcategory && (
        <>
          <span className="text-gray-400">›</span>

          {product ? (
            <Link
              to={`/category/${category.slug}/${subcategory.slug}`}
              className="transition hover:text-primary"
            >
              {subcategory.name}
            </Link>
          ) : (
            <span className="font-medium text-gray-700">
              {subcategory.name}
            </span>
          )}
        </>
      )}

      {product && (
        <>
          <span className="text-gray-400">›</span>

          <span className="font-medium text-gray-900">{product.title}</span>
        </>
      )}
    </nav>
  );
}
