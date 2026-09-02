import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "./Icons";

export default function SectionHeader({ title, to }) {
  const navigate = useNavigate();

  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900 md:text-2xl">{title}</h2>

      {to && (
        <button
          type="button"
          onClick={() => navigate(to)}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          Daha Çox
          <ArrowIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
