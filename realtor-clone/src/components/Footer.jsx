import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-gray-300 pt-20 pb-0">
      <div className="max-w-7xl mx-auto px-6">

        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-16 border-b border-gray-700">

          
          <div>
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              🏠 Rentalz
            </h2>

            <div className="flex gap-4 text-gray-400">
              <FaFacebookF className="hover:text-white cursor-pointer" />
              <FaInstagram className="hover:text-white cursor-pointer" />
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaYoutube className="hover:text-white cursor-pointer" />
            </div>
          </div>

        
          <div>
            <h4 className="text-white font-semibold mb-4">Main</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Listings</li>
              <li className="hover:text-white cursor-pointer">Listing Single</li>
              <li className="hover:text-white cursor-pointer">Locations</li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Info</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Amenities</li>
            </ul>
          </div>

          {/* Others */}
          <div>
            <h4 className="text-white font-semibold mb-4">Others</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">List Your Place</li>
              <li className="hover:text-white cursor-pointer">Instructions</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>

          {/* Utilities */}
          <div>
            <h4 className="text-white font-semibold mb-4">Utilities</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Style Guide</li>
              <li className="hover:text-white cursor-pointer">Licenses</li>
              <li className="hover:text-white cursor-pointer">Password</li>
              <li className="hover:text-white cursor-pointer">404</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 text-sm text-gray-400">
          <p>© Rentalz. All Rights Reserved.</p>
          <p>
            Built by <span className="text-white underline cursor-pointer">Yves Adrales</span>
          </p>
          <p>
            Powered by <span className="text-white underline cursor-pointer">Webflow</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
