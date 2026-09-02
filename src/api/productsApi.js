const API_URL = "https://rocky-encounter-varsity.ngrok-free.dev";

const API_HEADERS = {
  "ngrok-skip-browser-warning": "true",
};

export async function getProducts() {
  const requests = Array.from({ length: 88 }, (_, id) =>
    fetch(`${API_URL}/${id}`, {
      headers: API_HEADERS,
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Товар ${id}: ${response.status}`);
      }

      return response.json();
    })
  );

  const results = await Promise.allSettled(requests);

  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: API_HEADERS,
  });

  if (!response.ok) {
    throw new Error("Товар не найден");
  }

  return response.json();
}