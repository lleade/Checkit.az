import { useState } from "react";
import { getFilterValue } from "../../data/filterExtractors";
import { ChevronDownIcon } from "../common/Icons";

export default function CategoryFilters({
  products = [],
  filterConfig = [],
  subcategoryNameMap = {},
  selectedFilters = {},
  setSelectedFilters,
  priceRange = { min: "", max: "" },
  setPriceRange,
}) {
  // какой именно фильтрсейчас раскрыт (только один одновременно)
  const [openFilter, setOpenFilter] = useState(null);

  const filters = {};

  // создаём пустой Set под каждый ключ фильтра (brand, color и т.д.)
  filterConfig.forEach(({ key }) => {
    filters[key] = new Set();
  });

  // проходим по всем товарам и для каждого ключа фильтра достаём значение
  products.forEach((product) => {
    filterConfig.forEach(({ key }) => {
      const value = getFilterValue(product, key);
      if (value) filters[key].add(String(value));
    });
  });

  // добавить/убрать значение из выбранных фильтров (чекбокс тоггл)
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterName] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...prev, [filterName]: newValues };
    });
  };

  // изменение поля "Min" или "Max" в цене
  const handlePriceChange = (field) => (e) => {
    setPriceRange((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // сброс всех фильтров и цены к исходному состоянию
  const resetFilters = () => {
    setSelectedFilters({});
    setPriceRange({ min: "", max: "" });
    setOpenFilter(null);
  };

  return (
    <aside className="w-full">
      {/* Блок "Цена" — два инпута, min и max, всегда видимые */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="mb-5 text-lg font-semibold text-gray-900">
          Qiymət Aralığı
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm text-gray-600">Min.</label>
            <input
              type="number"
              placeholder="0"
              value={priceRange.min}
              onChange={handlePriceChange("min")}
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-600">Max.</label>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={handlePriceChange("max")}
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Динамические фильтры — генерируются из filterConfig */}
      <div className="mt-2 rounded-2xl border border-gray-200 bg-white px-5">
        {filterConfig.map(({ key: filterName, title }) => {
          const values = filters[filterName];

          // если у этого фильтра нет ни одного значения — не рисуем блок вообще
          if (!values || values.size === 0) return null;

          // раскрыт ли именно этот фильтр сейчас
          const isOpen = openFilter === filterName;

          return (
            <div
              key={filterName}
              className="border-b border-gray-200 last:border-b-0"
            >
              {/* Заголовок: клик открывает/закрывает список значений */}
              <button
                type="button"
                onClick={() => setOpenFilter(isOpen ? null : filterName)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-sm font-semibold tracking-wide text-gray-800">
                  {title}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Список значений рендерим только когдап открыто */}
              {isOpen && (
                <div className="max-h-64 overflow-y-auto pb-4">
                  {[...values].sort().map((value) => {
                    const isChecked =
                      selectedFilters[filterName]?.includes(value) ?? false;

                    // для подкатегорий показываем человекочитаемое имя,
                    // для остальных фильтров — само значение как есть
                    const label =
                      filterName === "subcategory"
                        ? subcategoryNameMap[value] || value
                        : value;

                    return (
                      <label
                        key={value}
                        className="flex cursor-pointer items-center gap-3 py-2 text-sm text-gray-600"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleFilterChange(filterName, value)}
                          className="h-4 w-4 accent-primary"
                        />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Кнопка сброса всех фильтров */}
      <div className="mt-2 rounded-2xl border border-gray-200 bg-white p-2">
        <button
          type="button"
          onClick={resetFilters}
          className="w-full rounded-xl bg-slate-800 py-4 text-sm font-semibold text-white transition hover:bg-slate-900"
        >
          Filtrləri sıfırla
        </button>
      </div>
    </aside>
  );
}
