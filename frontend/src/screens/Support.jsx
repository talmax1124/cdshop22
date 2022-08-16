import React from "react";
import { useSelector } from "react-redux";

const Support = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <div className="container">
        <h1 class=" text-black text-[3em] font-medium tracking-tight leading-none mb-1 ">
          Customer Support
        </h1>
        <hr className="mb-3" />
        <div className="flex justify-between customersupport">
          <div>
            <h1 className="text-3xl font-serif">Hello, {userInfo.name}!</h1>
            <p className="font-light text-2xl">How can we help?</p>
            {/*  */}
            <p className="font-medium text-2xl mt-5 text-black">
              Other Methods of Contact:
            </p>
            <a href="tel: 4074832251">
              <p className="font-light text-1xl">Office Number: 407-483-2251</p>
            </a>
            <a href="mailto: creativeduo2020@gmail.com">
              <p className="font-light text-1xl">
                Email: creativeduo2020@gmail.com
              </p>
            </a>
          </div>

          <form
            className="w-full max-w-lg mt-4"
            action="https://formsubmit.co/creativeduo2020@gmail.com"
            method="POST"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                  name="first-name"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                  name="last-name"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  E-mail
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="email"
                  name="email"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Message
                </label>
                <textarea
                  className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                  id="message"
                  name="Message"
                ></textarea>
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <button
                  className="btn btn-block"
                  variant="dark"
                  style={{ backgroundColor: "black", color: "whitesmoke" }}
                  type="button submit"
                >
                  Send
                </button>
              </div>
              <div className="md:w-2/3"></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Support;
