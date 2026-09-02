import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import Container from "../components/container/Container";

import { footerCategories, footerLinks } from "../data/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pb-24 md:pb-0">
        {/* Hero */}
        <section className="bg-gray-50 py-12 md:py-16">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Check IT
              </p>

              <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Haqqımızda
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 md:text-lg">
                Bakının ilk gaming mağazası konsepti - 2011-ci ildən bəri
                texnologiyanı həyatınıza gətiririk.
              </p>
            </div>
          </Container>
        </section>

        <Container>
          {/* Check IT */}
          <section className="py-12 md:py-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Check IT
                </h2>

                <div className="mt-3 h-1 w-12 rounded-full bg-primary" />
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                <p className="mb-4 text-lg font-semibold text-gray-900">
                  2011-ci ildən
                </p>

                <p className="leading-7 text-gray-600">
                  Check IT Bakı şəhərində texnologiya sahəsində fəaliyyət
                  göstərən ilk gaming mağazası konseptidir. 2011-ci ildən
                  başlayaraq, müasir texnologiyanı hər kəs üçün əlçatan etmək
                  missiyası ilə xidmət göstəririk.
                </p>
              </div>

              {/* Mission / Vision */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Missiyamız
                  </h3>

                  <p className="leading-7 text-gray-600">
                    Müasir texnologiyanı hər kəs üçün əlçatan etmək və
                    müştərilərimizə ən yaxşı keyfiyyətli məhsulları təqdim
                    etmək.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Vizyonumuz
                  </h3>

                  <p className="leading-7 text-gray-600">
                    Bakının texnologiya sahəsində lider ünvanı olmaq və
                    innovativ həllərlə bazarı formalaşdırmaq.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Products and Services */}
          <section className="border-t border-gray-100 py-12 md:py-16">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Məhsul və Xidmətlərimiz
                </h2>

                <p className="mt-3 text-gray-500">
                  Texnologiya ilə bağlı bütün ehtiyaclarınız üçün
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Products */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                  <h3 className="mb-5 text-xl font-bold text-gray-900">
                    Məhsullar
                  </h3>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Gaming və ofis notebooklar
                    </li>

                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Masaüstü kompüterlər
                    </li>

                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Gaming aksesuarları
                    </li>

                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Printerlər və skanerlər
                    </li>

                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Şəbəkə avadanlıqları
                    </li>

                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Təhlükəsizlik kameraları
                    </li>
                  </ul>
                </div>

                {/* Services */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                  <h3 className="mb-5 text-xl font-bold text-gray-900">
                    Xidmətlər
                  </h3>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Texniki dəstək
                    </li>

                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Təmir xidməti
                    </li>

                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Məsləhət və konfiqurasiya
                    </li>

                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Kreditlə satış
                    </li>

                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Çatdırılma xidməti
                    </li>

                    <li className="flex items-center gap-3 text-gray-600">
                      <span className="text-primary">•</span>
                      Zəmanət dəstəyi
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SEO / Keywords */}
          <section className="border-t border-gray-100 py-10">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Bakı texnologiya mağazası",
                "Gaming kompüterlər Bakıda",
                "Notebook mağazası 28 May",
                "Təhlükəsizlik kameraları",
                "Kreditlə texnologiya məhsulları",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="border-t border-gray-100 py-12 md:py-16">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Əsas Dəyərlərimiz
                </h2>

                <p className="mt-3 text-gray-500">
                  İşimizin əsasını təşkil edən dəyərlər
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    🤝
                  </div>

                  <h3 className="font-bold text-gray-900">Etibar</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Müştərilərimizlə uzunmüddətli əlaqələr qururuq
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    ⭐
                  </div>

                  <h3 className="font-bold text-gray-900">Keyfiyyət</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Yalnız ən yaxşı məhsulları təklif edirik
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    💡
                  </div>

                  <h3 className="font-bold text-gray-900">Yenilik</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Ən son texnologiyaları təqdim edirik
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    ❤️
                  </div>

                  <h3 className="font-bold text-gray-900">
                    Müştəri məmnuniyyəti
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Məmnuniyyətiniz bizim prioritetimizdir
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>

      <Footer
        categories={footerCategories}
        links={footerLinks}
      />

      <MobileBottomNav />
    </div>
  );
}
