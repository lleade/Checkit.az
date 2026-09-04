import { useEffect } from "react";
import { motion } from "framer-motion";
import { PhoneIcon, EmailIcon, WhatsAppIcon, MessageIcon } from "./Icons";

function ContactCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
      {/* Заголовок */}
      <div className="px-4 pb-3 pt-4 text-center">
        <h2 className="text-sm font-medium text-gray-900">
          Bizimlə necə əlaqə saxlamaq istəyirsiniz?
        </h2>
      </div>

      {/* Телефон */}
      <a
        href="tel:+994504488035"
        className="flex items-center justify-between gap-3 border-t border-gray-100 px-4 py-2.5 transition hover:bg-gray-50"
      >
        <div className="flex min-w-0 items-center gap-3">
          <PhoneIcon />
          <span className="truncate text-sm font-medium text-gray-900">
            Meneçer
          </span>
        </div>

        <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs text-blue-600">
          (050) 448 80 35
        </span>
      </a>

      {/* Email */}
      <a
        href="mailto:info@checkit.az"
        className="flex items-center justify-between gap-3 border-t border-gray-100 px-4 py-2.5 transition hover:bg-gray-50"
      >
        <div className="flex min-w-0 items-center gap-3">
          <EmailIcon />
          <span className="truncate text-sm font-medium text-gray-900">
            E-mail
          </span>
        </div>

        <span className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700">
          info@checkit.az
        </span>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/994504488035"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between gap-3 border-t border-gray-100 px-4 py-2.5 transition hover:bg-gray-50"
      >
        <div className="flex min-w-0 items-center gap-3">
          <WhatsAppIcon />

          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium text-gray-900">
              Meneçer
            </span>

            <span className="truncate text-xs text-gray-500">
              Heyderli Yusif
            </span>
          </div>
        </div>

        <span className="shrink-0 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs text-green-600">
          (050) 448 80 35
        </span>
      </a>

      {/* Mesaj */}
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 border-t border-gray-100 px-4 py-2.5 text-left transition hover:bg-gray-50"
      >
        <div className="flex min-w-0 items-center gap-3">
          <MessageIcon />
          <span className="truncate text-sm font-medium text-gray-700">
            Mesaj
          </span>
        </div>

        <span className="shrink-0 rounded-full border border-blue-300 px-2.5 py-1 text-xs text-gray-600">
          Sayt üzərindən
        </span>
      </button>
    </div>
  );
}

function ContactModal({ onClose }) {
  // Она закрывает модальное окно

  useEffect(() => {
    // Выполняем код после появления компонента

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // 768px и больше считаем desktop-версией

        onClose();
        // Если перешли на desktop — закрываем мобильное окно
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onClose]);
  // useEffect будет зависеть от функции onClose

  return (
    <>
      {/* ================= MOBILE ================= */}

      <motion.div
        className="fixed inset-0 z-[100] bg-black/25 backdrop-blur-[2px] md:hidden"
        onClick={onClose}
        // Нажатие на затемнённый фон закрывает окно

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-x-0 bottom-0 px-2 pb-2"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{
            type: "spring",

            stiffness: 320,

            damping: 30,
          }}
        >
          <ContactCard />
          {/* Показываем карточку контактов */}

          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full rounded-2xl bg-white py-4 text-lg font-medium text-blue-600 shadow-xl"
          >
            Ləğv et
          </button>
        </motion.div>
      </motion.div>

      {/* ================= DESKTOP ================= */}

      <motion.div
        className="absolute right-0 top-full z-[100] hidden w-72 pt-3 md:block"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.15 }}
      >
        <ContactCard />
      </motion.div>
    </>
  );
}

export default ContactModal;
