import { Link } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/container/Container";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import { footerCategories, footerLinks } from "../data/footer";
import { MinusIcon, PlusIcon, TrashIcon, CartIcon } from "../components/common/Icons";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <>
      <Header />

      <main className="min-h-[60vh] bg-white py-10 pb-28 md:pb-10">
        <Container>
          <h1 className="mb-10 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Alış-veriş səbətiniz
          </h1>

          {cart.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-gray-100 px-6 text-center">
              <CartIcon className="mb-4 h-16 w-16 text-gray-300" />

              <h2 className="text-xl font-bold text-gray-900">
                Səbətiniz boşdur
              </h2>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                Bəyəndiyiniz məhsulları səbətə əlavə edin.
              </p>

              <Link
                to="/"
                className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Məhsullara bax
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
              {/* Товары */}
              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex min-h-[170px] items-center rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    {/* Изображение */}
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center">
                      {item.images?.length ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="text-sm text-gray-400">No image</div>
                      )}
                    </div>

                    {/* Информация */}
                    <div className="ml-6 flex min-w-0 flex-1 flex-col self-stretch">
                      <Link
                        to={`/product/${item.id}`}
                        className="line-clamp-2 text-sm font-bold text-gray-900 hover:text-primary"
                      >
                        {item.title}
                      </Link>

                      <p className="mt-3 text-xl font-extrabold text-gray-900">
                        {item.price.toFixed(2)} ₼
                      </p>

                      {/* Количество */}
                      <div className="mt-auto flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:text-gray-900 cursor-pointer"
                        >
                          <MinusIcon />
                        </button>

                        <span className="min-w-4 text-center text-base font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-primary hover:text-primary cursor-pointer"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </div>

                    {/* Удалить */}
                    <button
                      type="button"
                      aria-label="Məhsulu sil"
                      onClick={() => removeFromCart(item.id)}
                      className="absolute bottom-5 right-5 text-gray-400 transition hover:text-red-500 cursor-pointer"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>

              {/* Итоги */}
              <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
                <div className="flex items-center justify-between text-base text-gray-700">
                  <span>Ümumi məhsullar:</span>

                  <span className="font-bold text-gray-900">
                    {cartCount} məhsul
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between text-lg">
                  <span className="font-bold text-gray-900">Yekun məbləğ:</span>

                  <span className="font-extrabold text-gray-900">
                    {cartTotal.toFixed(2)} ₼
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="mt-7 block w-full rounded-xl bg-primary px-5 py-3.5 text-center text-base font-bold text-white transition hover:opacity-90"
                >
                  Sifarişi tamamla
                </Link>
              </aside>
            </div>
          )}
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </>
  );
}
