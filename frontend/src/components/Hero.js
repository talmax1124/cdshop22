/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid  px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="lg:mt-0 lg:col-span-5 lg:flex" id="hii">
          <img src="https://i.ibb.co/7bR4dpr/img.png" alt="mockup" />
        </div>
        <div className="mr-auto place-self-center lg:col-span-7 p-2">
          <h1
            className=" text-black max-w-3xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-6xl "
            id="htit"
          >
            Customized Products for Everyone
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            We've got the perfect products for you, ready for your creative
            thoughts. We have digital & physical products ready for the making
          </p>
          <Link
            to="/support"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700  focus:ring-4 focus:ring-primary-300 bg-blue-600 hover:bg-blue-700"
            id="hbuttons"
            style={{
              textDecoration: "none",
              transition: "all .2s ease-in-out",
              cursor: "pointer",
            }}
          >
            Contact Us
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
          {/* Commented out until Quote Page is created */}
          {/* <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:ring-slate-300"
            id="hbuttons"
            style={{
              textDecoration: "none",
              transition: "all .2s ease-in-out",
              cursor: "pointer",
            }}
          >
            Get A Quote
          </a> */}
        </div>
        <div className="lg:mt-0 lg:col-span-5 lg:flex" id="hi">
          <img src="https://i.ibb.co/7bR4dpr/img.png" alt="mockup" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
