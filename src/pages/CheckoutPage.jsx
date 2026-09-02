import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/container/Container";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import { LocationIcon } from "../components/common/Icons";

import { footerCategories, footerLinks } from "../data/footer";

import { useCart } from "../context/CartContext";
import { useLocationContext } from "../context/LocationContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { location } = useLocationContext();

  const { cart, cartTotal } = useCart();

  // Получаем сохранённые данные
  const savedData = JSON.parse(sessionStorage.getItem("checkoutData") || "{}");

  const [formData, setFormData] = useState({
    name: savedData.name || "",
    phone: savedData.phone || "",
    email: savedData.email || "",
    notes: savedData.notes || "",
  });

  const [paymentMethod, setPaymentMethod] = useState(
    savedData.paymentMethod || "cash",
  );

  // Изменение полей
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newData = {
      ...formData,
      [name]: value,
    };

    setFormData(newData);

    // Сохраняем данные
    sessionStorage.setItem(
      "checkoutData",
      JSON.stringify({
        ...newData,
        paymentMethod,
      }),
    );
  };

  // Изменение способа оплаты
  const handlePaymentChange = (e) => {
    const value = e.target.value;

    setPaymentMethod(value);

    sessionStorage.setItem(
      "checkoutData",
      JSON.stringify({
        ...formData,
        paymentMethod: value,
      }),
    );
  };

  // Отправка заказа
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...formData,
      paymentMethod,
      location,
      cart,
      cartTotal,
    });

    alert("Sifariş uğurla tamamlandı!");

    // После заказа очищаем данные
    sessionStorage.removeItem("checkoutData");
  };

  // Пустая корзина
  if (cart.length === 0) {
    return (
      <>
        <Header />

        <main className="min-h-[60vh] bg-white py-10 pb-28 md:pb-10">
          <Container>
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Səbətiniz boşdur
              </h1>

              <p className="mt-2 text-gray-500">
                Sifariş vermək üçün əvvəlcə məhsul əlavə edin.
              </p>

              <Link
                to="/"
                className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Məhsullara bax
              </Link>
            </div>
          </Container>
        </main>

        <Footer categories={footerCategories} links={footerLinks} />

        <MobileBottomNav />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white py-10 pb-28 md:pb-10">
        <Container>
          <h1 className="mb-10 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Sifarişi Tamamla
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(350px,1fr)]"
          >
            {/* SOL TƏRƏF */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
              <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">
                Çatdırılma Məlumatları
              </h2>

              {/* Ad və telefon */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Tam Adınız
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Adınızı və Soyadınızı daxil edin"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Telefon Nömrəsi
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Telefon nömrənizi daxil edin"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  E-poçt
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="E-poçt ünvanınızı daxil edin"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Адрес */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Çatdırılma ünvanı
                </label>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 transition hover:border-gray-300">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <LocationIcon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      {location ? (
                        <>
                          <p className="text-sm font-medium text-gray-900">
                            Seçilmiş ünvan
                          </p>

                          <p className="mt-0.5 truncate text-sm text-gray-500">
                            {location.address}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-gray-900">
                            Ünvan seçilməyib
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            Çatdırılma ünvanınızı xəritədən seçin
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <Link
                    to="/location"
                    className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-gray-200 transition hover:bg-primary hover:text-white hover:ring-primary"
                  >
                    {location ? "Dəyiş" : "Məkanı seç"}
                  </Link>
                </div>
              </div>

              {/* Qeydlər */}
              <div className="mt-6">
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Əlavə Qeydlər
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Sifarişiniz haqqında əlavə qeydlər (istəyə bağlı)"
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Ödəniş */}
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Ödəniş üsulu
                </h3>

                {/* Nağd */}
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition ${
                    paymentMethod === "cash"
                      ? "border-primary ring-1 ring-primary"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={handlePaymentChange}
                    className="h-5 w-5 accent-primary"
                  />

                  <div>
                    <p className="font-medium text-gray-900">
                      Qapıda nağd ödəniş
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Kuryerə sifarişi alarkən nağd şəkildə ödəniş edin
                    </p>
                  </div>
                </label>

                {/* Kart */}
                <label
                  className={`mt-5 flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition ${
                    paymentMethod === "card"
                      ? "border-primary ring-1 ring-primary"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={handlePaymentChange}
                    className="h-5 w-5 accent-primary"
                  />

                  <div>
                    <p className="font-medium text-gray-900">
                      Qapıda kartla ödəniş
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Sifarişi təhvil aldıqdan sonra POS-terminal ilə kartdan
                      ödəniş edin
                    </p>
                  </div>
                </label>

                <button
                  type="submit"
                  className="mt-7 w-full rounded-xl bg-primary px-5 py-3.5 text-base font-bold text-white transition hover:opacity-90"
                >
                  Sifarişi Tamamla
                </button>
              </div>
            </section>

            {/* SAĞ TƏRƏF */}
            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Sifariş Xülasəsi
              </h2>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                      {item.images?.length && (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="line-clamp-2 text-sm font-medium text-gray-800 hover:text-primary"
                      >
                        {item.title}
                      </Link>

                      <div className="mt-1 text-sm text-gray-500">
                        {item.quantity} x {item.price.toFixed(2)} ₼
                      </div>
                    </div>

                    <span className="shrink-0 text-sm font-bold text-red-600">
                      {(item.price * item.quantity).toFixed(2)} ₼
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-gray-200" />

              <div className="flex items-center justify-between text-lg">
                <span className="font-bold text-gray-900">Ümumi Qiymət:</span>

                <span className="text-xl font-extrabold text-gray-900">
                  {cartTotal.toFixed(2)} ₼
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="mt-8 w-full rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary"
              >
                Səbəti Redaktə Et
              </button>
            </aside>
          </form>
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </>
  );
}
