import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import ListingCard from "../ListingCard";

const FeaturedSlider = ({ listings }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">
        Featured Rentals
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {listings.map((listing) => (
          <SwiperSlide key={listing.id}>
            <ListingCard listing={listing} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedSlider;
