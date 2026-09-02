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
  const [openFilter, setOpenFilter] = useState(null);

  // Строим значения только по ключам из конфига текущей категории
  const filters = {};

  filterConfig.forEach(({ key }) => {
    filters[key] = new Set();
  });

  products.forEach((product) => {
    filterConfig.forEach(({ key }) => {
      const value = getFilterValue(product, key);
      if (value) filters[key].add(String(value));
    });
  });

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterName] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...prev, [filterName]: newValues };
    });
  };

  const handlePriceChange = (field) => (e) => {
    setPriceRange((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const resetFilters = () => {
    setSelectedFilters({});
    setPriceRange({ min: "", max: "" });
    setOpenFilter(null);
  };

  return (
    <aside className="w-full">
      {/* Price — без изменений */}
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

      {/* Dynamic filters — теперь по filterConfig */}
      <div className="mt-2 rounded-2xl border border-gray-200 bg-white px-5">
        {filterConfig.map(({ key: filterName, title }) => {
          const values = filters[filterName];
          if (!values || values.size === 0) return null;

          const isOpen = openFilter === filterName;

          return (
            <div
              key={filterName}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                type="button"
                onClick={() => setOpenFilter(isOpen ? null : filterName)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-sm font-semibold tracking-wide text-gray-800">
                  {title}
                </span>
                <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="max-h-64 overflow-y-auto pb-4">
                  {[...values].sort().map((value) => {
                    const isChecked =
                      selectedFilters[filterName]?.includes(value) ?? false;

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

      {/* Reset — без изменений */}
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
