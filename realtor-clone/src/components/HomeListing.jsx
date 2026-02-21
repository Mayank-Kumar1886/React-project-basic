import React, { useEffect, useState } from "react";
import ListingsSection from "./ListingsSection";
import FeaturedSlider from "./Utils/FeatuedSlider";

const HomeListing = () => {
  const [featuredRent, setFeaturedRent] = useState([]);

  useEffect(() => {
    const rentData =
      JSON.parse(localStorage.getItem("rentProperties")) || [];

    const featured = rentData.filter(
      (item) => item.featured === true
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFeaturedRent(featured);
  }, []);

  return (
    <div className="bg-green-50 px-6 md:px-12 lg:px-24 py-16">
     
      {featuredRent.length > 4 ? (
        <FeaturedSlider listings={featuredRent} />
      ) : (
        <ListingsSection
          title="Featured Rentals"
          linkText="View all"
          listings={featuredRent}
        />
      )}
    </div>
  );
};

export default HomeListing;
