import { Link } from "react-router-dom";

import Logo from "../common/Logo";
import Container from "../container/Container";

import { categories } from "../../data/categories";

import { HomeIcon, EmailIcon, PhoneIcon } from "../common/Icons";

function ContactItem({ icon, children }) {
  return (
    <li className="flex items-start gap-2 text-sm text-gray-600">
      <span className="mt-0.5 shrink-0 text-gray-400">{icon}</span>

      {children}
    </li>
  );
}

export default function Footer({ links = [] }) {
  return (
    <footer className="bg-white pt-12">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* LOGO */}
          <div>
            <Logo className="mb-4" />

            <p className="text-sm leading-relaxed text-gray-600">
              Texnologiya məhsulları, mobil və kompüter aksesuarları, müşahidə
              sistemləri və şəbəkə avadanlıqları – hamısı Checkit.az onlayn
              mağazasında.
            </p>
          </div>

          {/* KATEQORİYALAR */}
          <div>
            <div className="mb-4 flex min-h-9 items-center">
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                Kateqoriyalar
              </h3>
            </div>

            <ul className="space-y-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LİNKLƏR */}
          <div>
            <div className="mb-4 flex min-h-9 items-center">
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                Linklər
              </h3>
            </div>

            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  {link === "Haqqımızda" && (
                    <Link
                      to="/haqqimizda"
                      className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                    >
                      {link}
                    </Link>
                  )}

                  {link === "Ən çox verilən suallar" && (
                    <Link
                      to="/faq"
                      className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                    >
                      {link}
                    </Link>
                  )}

                  {link === "Əlaqə" && (
                    <button
                      type="button"
                      onClick={() => {
                        window.dispatchEvent(new Event("open-contact"));
                      }}
                      className="cursor-pointer text-sm text-gray-600 transition-colors hover:text-gray-900"
                    >
                      {link}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ƏLAQƏ */}
          <div>
            <div className="mb-4 flex min-h-9 items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                Əlaqə
              </h3>

              {/* ЯЗЫКИ */}
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1">
                <button
                  type="button"
                  aria-label="Azərbaycan dili"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50"
                >
                  <img
                    src="/img/az.avif"
                    alt="Azərbaycan dili"
                    className="h-5 w-5 rounded-full object-cover"
                  />
                </button>

                <button
                  type="button"
                  aria-label="Rus dili"
                  className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-50"
                >
                  <img
                    src="/img/ru.avif"
                    alt="Русский язык"
                    className="h-5 w-5 rounded-full object-cover"
                  />
                </button>
              </div>
            </div>

            <ul className="space-y-3">
              {/* АДРЕС */}
              <ContactItem icon={<HomeIcon className="h-4 w-4" />}>
                <a
                  href="https://maps.app.goo.gl/2r4qHEmXdxe8Hhw57"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gray-900"
                >
                  Süleyman Rəhimov 197, Bakı
                </a>
              </ContactItem>

              {/* EMAIL */}
              <ContactItem icon={<EmailIcon className="h-4 w-4" />}>
                <a
                  href="mailto:info@checkit.az"
                  className="transition-colors hover:text-gray-900"
                >
                  info@checkit.az
                </a>
              </ContactItem>

              {/* ТЕЛЕФОН */}
              <ContactItem icon={<PhoneIcon className="h-4 w-4" />}>
                <a
                  href="tel:+994554005588"
                  className="transition-colors hover:text-gray-900"
                >
                  +994554005588
                </a>
              </ContactItem>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 border-t border-gray-200 py-6 text-center">
          <p className="text-sm text-gray-500">
            © 2026 Check IT. Bütün hüquqlar qorunur
          </p>
        </div>
      </Container>
    </footer>
  );
}
