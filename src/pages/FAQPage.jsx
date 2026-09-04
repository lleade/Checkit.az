import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import Container from "../components/container/Container";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { footerCategories, footerLinks } from "../data/footer";

const faqSections = [
  {
    title: "Ümumi Suallar",
    items: [
      {
        question: "Check IT nə vaxtdan işləyir?",
        answer:
          "Check IT 2011-ci ildən bəri Bakıda texnologiya sahəsində xidmət göstərir və Bakının ilk gaming mağazası konsepti kimi tanınır.",
      },
      {
        question: "Harada yerləşirsiniz?",
        answer:
          "Biz Bakı şəhərində, 28 May metrosunun yaxınlığında yerləşirik. Dəqiq ünvan üçün Google Maps linkinə baxa bilərsiniz.",
        link: "https://maps.app.goo.gl/ZrZiG9eSCwfiCa8B6",
      },
      {
        question: "İş saatlarınız necədir?",
        answer:
          "Bazar ertəsi - Şənbə: 10:00-20:00, Bazar: 11:00-18:00. Bayram günlərində iş saatları dəyişə bilər.",
      },
    ],
  },

  {
    title: "Məhsullar və Xidmətlər",
    items: [
      {
        question: "Hansı məhsulları satırsınız?",
        answer:
          "Gaming və ofis notebooklar, masaüstü kompüterlər, aksesuarlar, printerlər, şəbəkə avadanlıqları, təhlükəsizlik kameraları və digər texnologiya məhsulları.",
      },
      {
        question: "Gaming kompüterlər üçün xüsusi xidmətiniz varmı?",
        answer:
          "Bəli! Biz Bakının ilk gaming mağazası konseptiyik. Gaming kompüterlər, aksessuarlar və oyun avadanlıqları üzrə geniş çeşid və professional məsləhət təklif edirik.",
      },
      {
        question: "Texniki dəstək və təmir xidməti varmı?",
        answer:
          "Bəli, biz professional texniki dəstək və təmir xidməti təklif edirik. Satdığımız bütün məhsullara texniki dəstək veririk.",
      },
    ],
  },

  {
    title: "Alış-veriş və Ödəniş",
    items: [
      {
        question: "Hansı ödəniş üsulları mövcuddur?",
        answer:
          "Nəğd, köçürmə və kreditlə alış imkanları mövcuddur. Kreditlə alış üçün əlavə məlumat almaq üçün bizimlə əlaqə saxlayın.",
      },
      {
        question: "Kreditlə alış şərtləri necədir?",
        answer:
          "Kreditlə alış imkanları mövcuddur. Dəqiq şərtlər, faiz dərəcələri və müddətlər üçün mağazamıza müraciət edin və ya bizə zəng edin.",
      },
      {
        question: "Onlayn sifariş vermək olarmı?",
        answer:
          "Hal-hazırda məhsullarımızı mağazada görə və ala bilərsiniz. Onlayn sifariş üçün telefon və ya email vasitəsilə bizimlə əlaqə saxlayın.",
      },
    ],
  },

  {
    title: "Zəmanət və Qaytarma",
    items: [
      {
        question: "Zəmanət müddəti nə qədərdir?",
        answer:
          "Bütün məhsullara 1 illik zəmanət veririk. Zəmanət şərtləri məhsulun növündən asılı olaraq dəyişə bilər.",
      },
      {
        question: "Zəmanət xidməti necə işləyir?",
        answer:
          "Zəmanət dövründə nasazlıq olduqda, məhsulu mağazaya gətirin. Biz təmir, dəyişdirmə və ya geri qaytarma üçün lazımi addımları atacağıq.",
      },
      {
        question: "Məhsulu qaytarmaq olarmı?",
        answer:
          "Bəli, müəyyən şərtlər daxilində məhsul qaytarması mümkündür. Dəqiq qaytarma şərtləri üçün satış zamanı məlumat veririk.",
      },
    ],
  },

  {
    title: "Əlaqə və Dəstək",
    items: [
      {
        question: "Sizinlə necə əlaqə saxlaya bilərəm?",
        answer:
          "Telefon və Email məlumatları üçün bizimlə əlaqə saxlayın. Həmçinin WhatsApp vasitəsilə də bizimlə əlaqə saxlaya bilərsiniz.",
      },
      {
        question: "Texniki məsləhət üçün ödəniş varmı?",
        answer:
          "Satın aldığınız məhsullar üçün texniki məsləhət pulsuzdur. Digər hallarda məsləhət xidməti üçün bizimlə əlaqə saxlayın.",
      },
      {
        question: "Korporativ satış xidmətiniz varmı?",
        answer:
          "Bəli, şirkətlər və təşkilatlar üçün korporativ satış və xidmət təklif edirik. Toplu alışlar üçün xüsusi endirim şərtləri mövcuddur.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />

      <main className="min-h-[60vh] bg-gray-50 py-8 lg:py-12">
        <Container>
          <Breadcrumbs />

          {/* Заголовок */}
          <div className="mb-10 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Ən çox verilən suallar
            </h1>

            <p className="mt-3 text-base leading-7 text-gray-500">
              Check IT haqqında ən çox verilən sualların cavabları
            </p>
          </div>

          {/* FAQ */}
          <div className="space-y-8">
            {faqSections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl bg-white p-6 shadow-sm lg:p-8"
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>

                <div className="space-y-3">
                  {section.items.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-xl border border-gray-200 bg-white"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900">
                        <span>{item.question}</span>

                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-transform duration-200 group-open:rotate-45">
                          +
                        </span>
                      </summary>

                      <div className="border-t border-gray-100 px-5 py-4 text-sm leading-7 text-gray-600">
                        <p>{item.answer}</p>

                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-block font-semibold text-primary hover:opacity-70"
                          >
                            Google Maps-da bax
                          </a>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </main>

      <Footer categories={footerCategories} links={footerLinks} />

      <MobileBottomNav />
    </>
  );
}
