import { useEffect, useState } from "react";

export default function ProfileModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    // =========================
    // РЕГИСТРАЦИЯ
    // =========================

    if (!isLogin) {
      // Получаем всех пользователей
      const savedUsers = localStorage.getItem("users");

      const users = savedUsers ? JSON.parse(savedUsers) : [];

      // Проверяем, есть ли такой email
      const existingUser = users.find(
        (user) => user.email === cleanEmail
      );

      if (existingUser) {
        setError("Bu e-poçt artıq qeydiyyatdan keçib");
        return;
      }

      // Создаём нового пользователя
      const newUser = {
        email: cleanEmail,
        password: password,
      };

      // Добавляем пользователя в массив
      users.push(newUser);

      // Сохраняем всех пользователей
      localStorage.setItem("users", JSON.stringify(users));

      // Авторизуем нового пользователя
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isLoggedIn", "true");

      setSuccess("Qeydiyyat uğurla tamamlandı!");

      setTimeout(() => {
        onClose();
      }, 800);

      return;
    }

    // =========================
    // ВХОД
    // =========================

    const savedUsers = localStorage.getItem("users");

    if (!savedUsers) {
      setError("İlk öncə qeydiyyatdan keçin");
      return;
    }

    const users = JSON.parse(savedUsers);

    // Ищем пользователя
    const user = users.find(
      (user) =>
        user.email === cleanEmail &&
        user.password === password
    );

    // Если пользователь не найден
    if (!user) {
      setError("E-poçt və ya şifrə yanlışdır");
      return;
    }

    // Авторизация
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    setSuccess("Uğurla daxil oldunuz!");

    setTimeout(() => {
      onClose();
    }, 800);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);

    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900/50 px-4 backdrop-blur-[1px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl bg-white px-7 py-7 shadow-2xl sm:px-8 sm:py-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-4 flex h-8 w-8 items-center justify-center text-[30px] font-light leading-none text-gray-300 transition hover:text-gray-500"
        >
          ×
        </button>

        {/* Заголовок */}
        <h2 className="mb-7 pr-6 text-center text-[25px] font-bold text-gray-700">
          {isLogin ? "Hesabıma daxil ol" : "Qeydiyyatdan keç"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="profile-email"
              className="mb-2 block text-[15px] font-medium text-gray-500"
            >
              E-poçt
            </label>

            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              required
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-[15px] text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Пароль */}
          <div className="mb-6">
            <label
              htmlFor="profile-password"
              className="mb-2 block text-[15px] font-medium text-gray-500"
            >
              Şifrə
            </label>

            <input
              id="profile-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-[15px] text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Ошибка */}
          {error && (
            <p className="mb-5 text-center text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Успех */}
          {success && (
            <p className="mb-5 text-center text-sm text-green-600">
              {success}
            </p>
          )}

          {/* Кнопка */}
          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-[15px] font-bold text-white transition hover:bg-primary-dark active:scale-[0.99]"
          >
            {isLogin ? "Daxil ol" : "Qeydiyyat"}
          </button>
        </form>

        {/* Переключение */}
        <button
          type="button"
          onClick={switchMode}
          className="mt-6 block w-full cursor-pointer text-center text-[15px] font-medium text-primary hover:underline"
        >
          {isLogin
            ? "Qeydiyyatdan keç"
            : "Mənim hesabım var"}
        </button>
      </div>
    </div>
  );
}

