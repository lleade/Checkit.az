import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

export default function Breadcrumbs({
  product,
  categorySlug,
  subcategorySlug,
}) {
  let category;
  let subcategory;

  if (product) {
    category = categories.find((item) =>
      item.subcategories?.some((sub) => sub.slug === product.category),
    );

    // из найденной категории достаём саму подкатегорию
    subcategory = category?.subcategories?.find(
      (sub) => sub.slug === product.category,
    );
  }

  if (categorySlug) {
    category = categories.find((item) => item.slug === categorySlug);

    // подкатегория ищется только если она была передана
    // (страница может быть просто "категория" без подкатегории)
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
      {/* "Əsas səhifə" — всегда первая ссылка в цепочке */}
      <Link to="/" className="transition hover:text-primary">
        Əsas səhifə
      </Link>

      {/* Уровень категории — рисуем, только если category нашлась */}
      {category && (
        <>
          <span className="text-gray-400">›</span>

          {/*
            Если после категории есть ещё уровни (подкатегория или товар) —
            категория кликабельна (ведёт на страницу категории).
            Если категория — последний/текущий уровень — просто текст, без ссылки.
          */}
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

          {/*
            Если мы на странице товара — подкатегория кликабельна
            (ведёт на страницу этой подкатегории).
            Если мы уже на странице самой подкатегории — просто текст.
          */}
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

      {/* Последний уровень — название товара, всегда без ссылки (это текущая страница) */}
      {product && (
        <>
          <span className="text-gray-400">›</span>

          <span className="font-medium text-gray-900">{product.title}</span>
        </>
      )}
    </nav>
  );
}
