const API_URL = "https://rocky-encounter-varsity.ngrok-free.dev";
const API_HEADERS = { "ngrok-skip-browser-warning": "true" };
const PRODUCTS_COUNT = 88;

async function fetchProduct(id) {

  const response = await fetch(`${API_URL}/${id}`, { headers: API_HEADERS });
  // Отправляем GET-запрос к API и получаем ответ сервера

  if (!response.ok) {
    // Проверяем, успешно ли выполнен запрос

    throw new Error(`Товар ${id}: ${response.status}`);
    // Если ошибка — выбрасываем её с ID товара и HTTP-статусом
  }

  return response.json();
  // Получаем данные товара из JSON
}

export async function getProducts() {
  // Функция получает все товары

  const ids = Array.from({ length: PRODUCTS_COUNT }, (_, id) => id);
  // Создаём массив ID от 0 до 87

  const results = await Promise.allSettled(ids.map(fetchProduct));
  // Отправляем запрос для каждого ID и ждём завершения всех запросов
  // allSettled позволяет получить успешные товары,
  // даже если некоторые запросы завершились ошибкой

  return (
    results
      .filter((result) => result.status === "fulfilled")
      // Оставляем только успешно загруженные товары

      .map((result) => result.value)
  );
}

export function getProductById(id) {

  return fetchProduct(id);
}
