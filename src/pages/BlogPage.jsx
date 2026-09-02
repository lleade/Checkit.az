import { useParams, Link } from "react-router-dom";

import Container from "../components/container/Container";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";

import { footerCategories, footerLinks } from "../data/footer";

export default function BlogPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="bg-gray-50 py-8 lg:py-12">
        <Container>
          <article className="rounded-2xl bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Aigo və Darkflash Qida Blokları – Etibarlı Güc Mənbələri ilə
              Kompüter Performansını Gücləndirin
            </h1>
            {/* Image */}
            <div className="mb-8 overflow-hidden rounded-2xl">
              <img
                src="/img/blogs/blog.avif"
                alt="Aigo və Darkflash Qida Blokları"
                className="mx-auto h-auto w-[90%] rounded-xl object-cover"
              />
            </div>
            {/* Text */}
            <div className="mt-8 space-y-6 text-[16px] leading-8 text-gray-600">
              <p>
                Kompüter sistemlərinin sabit və uzunömürlü işləməsi üçün ən
                vacib komponentlərdən biri qida bloklarıdır (Power Supply Unit –
                PSU). Güclü prosessor, yüksək performanslı videokart və digər
                hardware komponentləri sabit enerji ilə təmin olunmadıqda,
                sistemdə gözlənilməz nasazlıqlar yarana bilər. Məhz buna görə
                etibarlı PSU seçimi kompüter yığarkən ən əsas qərarlardan
                biridir.
              </p>

              <p>
                Dünyada tanınmış istehsalçılar arasında <strong>Aigo</strong> və
                onun tərəfdaş brendi <strong>Darkflash</strong>, həm fərdi
                istifadəçilər, həm də korporativ müştərilər üçün yüksək
                keyfiyyətli, innovativ və enerji baxımından effektiv qida
                blokları təqdim edir.
              </p>

              <p>
                Bu yazıda Aigo və Darkflash qida bloklarının əsas
                üstünlüklərini, texniki xüsusiyyətlərini və bütün modellərini
                ətraflı şəkildə təqdim edəcəyik.
              </p>

              <h2 className="pt-4 text-2xl font-bold text-gray-900">
                Niyə Aigo və Darkflash PSU-ları Seçilməlidir?
              </h2>

              <p>
                Aigo markası Çinin qabaqcıl texnologiya şirkətlərindən biridir
                və kompüter aksesuarları bazarında geniş çeşidli məhsulları ilə
                tanınır. Qida blokları seqmentində isə şirkət həm büdcə dostu
                modellər, həm də premium seqment üçün yüksək güclü PSU-lar
                istehsal edir.
              </p>

              <h3 className="text-xl font-bold text-gray-900">Üstünlüklər:</h3>

              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Yüksək enerji effektivliyi</strong> – 80 PLUS
                  sertifikatlı modellər enerji itkisinin minimuma endirilməsini
                  təmin edir.
                </li>

                <li>
                  <strong>Sabitlik və uzunömürlülük</strong> – keyfiyyətli
                  kondensator və güclü ventilyasiya sistemi ilə komponentlərin
                  ömrü artırılır.
                </li>

                <li>
                  <strong>Korporativ yanaşma</strong> – həm fərdi istifadəçilər,
                  həm də şirkətlər üçün böyük sistemlərə uyğun modellər
                  mövcuddur.
                </li>

                <li>
                  <strong>Texnoloji innovasiyalar</strong> – modul kabel
                  idarəetməsi, güclü hava soyutma sistemi, səs-küyün azaldılması
                  və smart enerji paylanması kimi xüsusiyyətlər.
                </li>
              </ul>

              <h2 className="pt-4 text-2xl font-bold text-gray-900">
                Aigo Qida Bloklarının Modelləri
              </h2>

              <h3 className="text-xl font-bold text-gray-900">
                Aigo VK Seriyası
              </h3>

              <p>
                VK seriyası, gündəlik istifadə və oyun kompüterləri üçün nəzərdə
                tutulmuş, etibarlı və münasib qiymətli PSU-lardır.
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>VK450 / VK500 / VK550 / VK600</li>
                <li>80 PLUS sertifikatı ilə yüksək enerji səmərəliliyi.</li>
                <li>Sakit işləyən ventilyator.</li>
                <li>Sadə və stabil performans.</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900">
                Aigo GP Seriyası
              </h3>

              <p>
                GP seriyası daha çox{" "}
                <strong>
                  oyun sistemləri və yarı-professional istifadəçilər
                </strong>{" "}
                üçün nəzərdə tutulub.
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>GP550 / GP650 / GP750</li>
                <li>80 PLUS Bronze sertifikatı.</li>
                <li>Güclü hava soyutma sistemi.</li>
                <li>Yüksək keyfiyyətli kondensatorlar.</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900">
                Aigo GP Modular Seriyası
              </h3>

              <p>
                Bu seriya kabel idarəetməsini sadələşdirmək üçün modul dizayn
                ilə hazırlanıb.
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>GP650M / GP750M / GP850M</li>
                <li>Modul kabel sistemi ilə daha səliqəli montaj.</li>
                <li>Yüksək enerji effektivliyi.</li>
                <li>Çoxlu qoruma funksiyaları.</li>
              </ul>

              <h2 className="pt-4 text-2xl font-bold text-gray-900">
                Darkflash Qida Blokları
              </h2>

              <p>
                Darkflash, Aigo ilə yanaşı qlobal bazarda oyun sistemləri üçün
                tanınan brendlərdən biridir. Bu marka daha çox{" "}
                <strong>
                  gamerlər və yüksək performans tələb edən istifadəçilər
                </strong>{" "}
                üçün nəzərdə tutulmuş məhsullar istehsal edir.
              </p>

              <h3 className="text-xl font-bold text-gray-900">
                Darkflash DK Seriyası
              </h3>

              <ul className="list-disc space-y-2 pl-6">
                <li>DK450 / DK550 / DK650</li>
                <li>Yüksək sabitlik.</li>
                <li>Gərginlikdən qoruma funksiyaları.</li>
                <li>Sakit işləmə.</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900">
                Darkflash ARGB Seriyası
              </h3>

              <p>
                RGB işıqlanma ilə fərqlənən bu modellər həm performans, həm də
                vizual görünüş baxımından oyun sistemlərini tamamlayır.
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>DF550W ARGB / DF650W ARGB / DF750W ARGB</li>
                <li>ARGB işıqlanma dəstəyi.</li>
                <li>80 PLUS sertifikatı.</li>
                <li>Güclü soyutma sistemi.</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900">
                Darkflash Modular Seriyası
              </h3>

              <ul className="list-disc space-y-2 pl-6">
                <li>DF650M / DF750M / DF850M</li>
                <li>Modul kabel sistemi.</li>
                <li>Premium komponentlər.</li>
                <li>Yüksək enerji səmərəliliyi.</li>
              </ul>

              <h2 className="pt-4 text-2xl font-bold text-gray-900">
                Korporativ İstifadə Üçün Aigo və Darkflash PSU-lar
              </h2>

              <p>
                Şirkətlər və böyük təşkilatlar üçün sistemlərin fasiləsiz
                işləməsi çox vacibdir. Aigo və Darkflash qida blokları
                korporativ müştərilər üçün aşağıdakı üstünlükləri təmin edir:
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Etibarlılıq</strong> – 24/7 rejimində stabil işləmə.
                </li>

                <li>
                  <strong>Miqyaslana bilən həllər</strong> – müxtəlif sistemlər
                  üçün uyğun modellər.
                </li>

                <li>
                  <strong>Enerji qənaəti</strong> – uzunmüddətli maliyyə
                  qənaəti.
                </li>

                <li>
                  <strong>Qlobal sertifikatlar</strong> – beynəlxalq
                  standartlara uyğunluq.
                </li>
              </ul>

              <h2 className="pt-4 text-2xl font-bold text-gray-900">Nəticə</h2>

              <p>
                Kompüter sistemlərinin sabitliyi və performansı birbaşa qida
                bloklarının keyfiyyətindən asılıdır.{" "}
                <strong>Aigo və Darkflash</strong>, fərdi istifadəçilərdən
                tutmuş iri korporativ müştərilərə qədər hər kəs üçün uyğun,
                etibarlı və yüksək performanslı PSU həlləri təqdim edir.
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Büdcə dostu modellər (Aigo VK, AK seriyası) gündəlik istifadə
                  üçün idealdır.
                </li>

                <li>
                  Orta və yüksək səviyyəli oyun sistemləri üçün Aigo GP,
                  Darkflash DK və ARGB seriyaları uyğundur.
                </li>

                <li>
                  Premium və modul modellər maksimum enerji effektivliyi ilə
                  seçilir.
                </li>
              </ul>

              <p>
                Əgər kompüterinizi etibarlı və uzunömürlü güc mənbəyi ilə təmin
                etmək istəyirsinizsə,{" "}
                <strong>Aigo və Darkflash qida blokları</strong> sizin üçün
                uyğun seçimdir.
              </p>
            </div>

            {/* Back */}
            <div className="mt-10 border-t border-gray-100 pt-6">
              <Link
                to="/"
                className="font-semibold text-primary hover:opacity-70"
              >
                ← Bloqlara qayıt
              </Link>
            </div>
          </article>
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </div>
  );
}
