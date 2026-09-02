import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// Безопасное чтение из localStorage
const getSavedCart = () => {
  try {
    const saved = localStorage.getItem("cart");

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((item) => ({
      ...item,
      quantity: Math.min(
        99,
        Math.max(1, Number(item.quantity) || 1)
      ),
    }));
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getSavedCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Добавить товар
  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  99,
                  Math.max(1, Number(item.quantity) || 1) + 1
                ),
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Увеличить количество
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                99,
                Math.max(1, Number(item.quantity) || 1) + 1
              ),
            }
          : item
      )
    );
  };

  // Уменьшить количество
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(
                  0,
                  Math.min(99, Number(item.quantity) || 1) - 1
                ),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Удалить товар
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Очистить корзину
  const clearCart = () => {
    setCart([]);
  };

  // Общее количество товаров
  const cartCount = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  // Общая стоимость
  const cartTotal = cart.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  // Проверка товара
  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

