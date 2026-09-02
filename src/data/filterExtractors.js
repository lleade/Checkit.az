// Нормализует "сырые" значения specifications в укороченные бакеты для фильтров
export const filterExtractors = {
  Prosessor: (raw) => {
    const intel = raw.match(/Intel Core (Ultra \d|i\d|\d)/i);
    if (intel) return `Intel Core ${intel[1]}`;
    const amd = raw.match(/AMD Ryzen (\d)/i);
    if (amd) return `AMD Ryzen ${amd[1]}`;
    return raw;
  },

  "Operativ yaddaş": (raw) => {
    const match = raw.match(/(\d+)\s*GB/i);
    return match ? `${match[1]}GB` : raw;
  },

  Yaddaş: (raw) => {
    const match = raw.match(/(\d+(\.\d+)?)\s*(GB|TB)/i);
    return match ? `${match[1]}${match[3].toUpperCase()}` : raw;
  },

  Ekran: (raw) => {
    const match = raw.match(/(\d+(\.\d+)?)"/);
    return match ? `${match[1]}"` : raw;
  },

  Videokart: (raw) => {
    if (/Intel/i.test(raw)) return "Intel Graphics";
    if (/AMD Radeon/i.test(raw)) return "AMD Radeon Graphics";
    const rtx = raw.match(/RTX\s?\d{3,4}(\s?Ti)?/i);
    if (rtx) return rtx[0].trim();
    return raw;
  },

  "Yenilənmə tezliyi": (raw) => {
    const match = raw.match(/(\d+)\s*Hz/i);
    return match ? `${match[1]}Hz` : raw;
  },
};

export function normalizeSpecValue(key, rawValue) {
  if (rawValue === undefined || rawValue === null) return rawValue;
  const str = String(rawValue);
  const extractor = filterExtractors[key];
  return extractor ? extractor(str) : str;
}

// Единая точка получения значения фильтра для товара —
// используется и в CategoryFilters (сбор опций), и в CategoryPage (сравнение)
export function getFilterValue(product, key) {
  if (key === "brand") return product.brand;
  if (key === "subcategory") return product.category; // хранит slug подкатегории
  return normalizeSpecValue(key, product.specifications?.[key]);
}