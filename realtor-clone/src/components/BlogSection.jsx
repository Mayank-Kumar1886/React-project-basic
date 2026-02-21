import React from "react";
import {blogs} from "../data/BlogData";

const BlogSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          The Future Of Realty:
          <br /> Trends And Predictions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          The realty industry is constantly evolving and adapting to new
          technologies, client demands, and market trends.
        </p>
        <button className="mb-16 px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition cursor-pointer">
          VIEW ALL
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {blogs.map((blog)=>(
                <div
              key={blog.id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden transition hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {blog.title}
                </h4>

                <p className="text-gray-600 text-sm mb-6">
                  {blog.desc}
                </p>

                <button className="px-6 py-2 border border-gray-800 text-sm hover:bg-gray-900 hover:text-white transition">
                  READ MORE
                </button>
              </div>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
