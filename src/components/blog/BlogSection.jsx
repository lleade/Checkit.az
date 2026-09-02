import { ImageIcon, ChevronIcon } from "../common/Icons";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <article>
        <div className="relative h-44 overflow-hidden bg-gray-100">
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <span className="text-sm font-semibold text-white">
                {blog.imageLabel}
              </span>

              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-white/10" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
            {blog.title}
          </h3>

          <p className="mb-4 line-clamp-3 text-sm text-gray-500">
            {blog.excerpt}
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-700">
            Daha Çox
            <ChevronIcon className="h-4 w-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function BlogSection({ blogs }) {
  return (
    <section className="py-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Bloqlar</h2>

        <Link
          to="/blog/1"
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Daha çox
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
