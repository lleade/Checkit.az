import { Link } from "react-router-dom";

export default function Logo({ className = "", variant = "dark" }) {
  const src = variant === "light" ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="CheckIT"
    >
      <img src={src} alt="CheckIT" className="h-5 w-auto" />
    </Link>
  );
}
