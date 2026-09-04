import SectionHeader from "../common/SectionHeader";
import ProductCard from "./ProductCard";

export default function ProductSection({
  title,
  products,
  animateImmediately = false,
  filterType,
}) {
  return (
    <section className="py-8">
      <SectionHeader title={title} to={`/products/${filterType}`} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {products.slice(0, 6).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            animateImmediately={animateImmediately}
          />
        ))}
      </div>
    </section>
  );
}
