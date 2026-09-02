import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/img/404-bg.png')",
      }}
    >
      <div className="flex min-h-screen items-center justify-center bg-white/30 px-4">
        <div className="text-center">
          <div className="text-[120px] font-extrabold leading-none text-primary md:text-[180px]">
            404
          </div>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Səhifə tapılmadı
          </h1>

          <p className="mx-auto mt-4 max-w-md text-gray-600">
            Axtardığınız səhifə mövcud deyil və ya silinmiş ola bilər.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    </main>
  );
}