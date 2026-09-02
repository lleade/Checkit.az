import CategorySidebar from "./CategorySidebar";
import HeroBanner from "./HeroBanner";
import DealOfDay from "./DealOfDay";
import BrandLogos from "./BrandLogos";

export default function HeroSection({ categories, products, brands }) {
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="hidden h-full lg:block">
          <CategorySidebar categories={categories} />
        </aside>

        <div className="grid min-w-0 gap-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_220px]">
            <HeroBanner />
            <div className="hidden md:block">
              <DealOfDay products={products} />
            </div>
          </div>

          <div className="hidden md:block">
            <BrandLogos brands={brands} />
          </div>
        </div>
      </div>
    </section>
  );
}
