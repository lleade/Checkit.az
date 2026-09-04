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

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.trim() || "";
    const phone = formData.get("phone")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
    const notes = formData.get("notes")?.trim() || "";

    const newErrors = {};

    // Имя
    if (name.length < 2) {
      newErrors.name = "Ad və soyad ən azı 2 simvol olmalıdır.";
    } else if (name.length > 60) {
      newErrors.name = "Ad və soyad 60 simvoldan çox ola bilməz.";
    }

    // Телефон
    const cleanPhone = phone.replace(/[\s()-]/g, "");

    const phoneRegex = /^(\+994|0)(50|51|55|70|77|99)\d{7}$/;

    if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Düzgün Azərbaycan telefon nömrəsi daxil edin.";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Düzgün e-poçt ünvanı daxil edin.";
    } else if (email.length > 100) {
      newErrors.email = "E-poçt 100 simvoldan çox ola bilməz.";
    }

    // Адрес
    if (!location?.address?.trim()) {
      newErrors.location = "Çatdırılma ünvanını seçin.";
    } else if (location.address.length > 250) {
      newErrors.location = "Ünvan 250 simvoldan çox ola bilməz.";
    }

    // Комментарий
    if (notes.length > 500) {
      newErrors.notes = "Qeyd 500 simvoldan çox ola bilməz.";
    }

    // Способ оплаты
    if (!["cash", "card"].includes(paymentMethod)) {
      newErrors.payment = "Ödəniş üsulunu seçin.";
    }

    setErrors(newErrors);

    // Если есть ошибки — дальше ничего не делаем
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const orderData = {
      name,
      phone,
      email,
      address: location.address,
      notes,
      paymentMethod,
      cart,
      cartTotal,
    };

    console.log("Sifariş:", orderData);

    alert("Sifariş uğurla qəbul edildi!");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white py-10 pb-28 md:pb-10">
        <Container>
          {/* Başlıq */}
          <h1 className="mb-10 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Sifarişi Tamamla
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(350px,1fr)]"
          >
            {/* Sol tərəf */}
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
                    maxLength={60}
                    placeholder="Adınızı və Soyadınızı daxil edin"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${
                      errors.name ? "border-red-400" : "border-gray-200"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
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
                    maxLength={20}
                    placeholder="Telefon nömrənizi daxil edin"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${
                      errors.phone ? "border-red-400" : "border-gray-200"
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
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
                  maxLength={100}
                  placeholder="E-poçt ünvanınızı daxil edin"
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Ünvan */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Çatdırılma ünvanı
                </label>

                <div
                  className={`flex items-center justify-between gap-4 rounded-xl border bg-gray-50/50 px-4 py-3 transition ${
                    errors.location
                      ? "border-red-400"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
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

                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
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
                  rows="4"
                  maxLength={500}
                  placeholder="Sifarişiniz haqqında əlavə qeydlər (istəyə bağlı)"
                  className={`w-full resize-none rounded-xl border px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.notes ? "border-red-400" : "border-gray-200"
                  }`}
                />

                {errors.notes && (
                  <p className="mt-1 text-sm text-red-500">{errors.notes}</p>
                )}
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
                    onChange={(e) => setPaymentMethod(e.target.value)}
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
                    onChange={(e) => setPaymentMethod(e.target.value)}
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

                {errors.payment && (
                  <p className="mt-3 text-sm text-red-500">{errors.payment}</p>
                )}

                {/* Sifariş */}
                <button
                  type="submit"
                  className="mt-7 w-full rounded-xl bg-primary px-5 py-3.5 text-base font-bold text-white transition hover:opacity-90"
                >
                  Sifarişi Tamamla
                </button>
              </div>
            </section>

            {/* Sağ tərəf */}
            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Sifariş Xülasəsi
              </h2>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {/* Şəkil */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                      {item.images?.length && (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      )}
                    </div>

                    {/* Məlumat */}
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="line-clamp-2 text-sm font-medium text-gray-800 hover:text-primary"
                      >
                        {item.title}
                      </Link>

                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <span>
                          {item.quantity} x {item.price.toFixed(2)} ₼
                        </span>
                      </div>
                    </div>

                    {/* Qiymət */}
                    <span className="shrink-0 text-sm font-bold text-red-600">
                      {(item.price * item.quantity).toFixed(2)} ₼
                    </span>
                  </div>
                ))}
              </div>

              {/* Xətt */}
              <div className="my-6 border-t border-gray-200" />

              {/* Ümumi qiymət */}
              <div className="flex items-center justify-between text-lg">
                <span className="font-bold text-gray-900">Ümumi Qiymət:</span>

                <span className="text-xl font-extrabold text-gray-900">
                  {cartTotal.toFixed(2)} ₼
                </span>
              </div>

              {/* Səbətə qayıt */}
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
