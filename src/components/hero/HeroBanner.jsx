import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";

import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from "../common/Icons";

const banners = [
  {
    image: "/img/banner-1.avif",
    link: "/search?q=Lenovo",
  },
  {
    image: "/img/banner-2.avif",
    link: "/search?q=Processor",
  },
  {
    image: "/img/banner-3.avif",
    link: "/search?q=RTX",
  },
];

const LeftArrowButtonIcon = () => <ArrowLeftIcon className="h-5 w-5" />;

const RightArrowButtonIcon = () => <ArrowRightIcon className="h-5 w-5" />;

export default function HeroBanner() {
  return (
    <div className="group relative min-h-[280px] cursor-pointer overflow-hidden rounded-2xl md:min-h-[340px]">
      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".hero-swiper-button-prev",
          nextEl: ".hero-swiper-button-next",
        }}
        className="h-full min-h-[280px] md:min-h-[340px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.image}>
            <a
              href={banner.link}
              className="block h-full w-full"
              aria-label={`Перейти к ${index === 0 ? "Lenovo" : index === 1 ? "Processor" : "Nvidia"}`}
            >
              <img
                src={banner.image}
                alt={`Hero Banner ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Arrow */}
      <button
        type="button"
        aria-label="Предыдущий баннер"
        className="hero-swiper-button-prev absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-black opacity-0 shadow-md transition-all duration-300 hover:scale-105 group-hover:opacity-100"
      >
        <LeftArrowButtonIcon />
      </button>

      {/* Right Arrow */}
      <button
        type="button"
        aria-label="Следующий баннер"
        className="hero-swiper-button-next absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-black opacity-0 shadow-md transition-all duration-300 hover:scale-105 group-hover:opacity-100"
      >
        <RightArrowButtonIcon />
      </button>
    </div>
  );
}
