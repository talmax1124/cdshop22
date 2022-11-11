/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const About = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);
  let [isOpen3, setIsOpen3] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  function closeModal3() {
    setIsOpen3(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function openModal3() {
    setIsOpen3(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Carlos D (CEO)
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="font-medium">
                      About: Carlos is a teen, currently in senior year. He is
                      currently pursuing his career in cybersecurity.
                    </p>
                    <br />
                    <p className="text-sm text-gray-700 font-bold">
                      Accomplishments:
                    </p>
                    <ul className="mt-2 text-sm text-gray-500">
                      <li>- Won The TSA Nationals (4th Place)</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpen2} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal2}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Anaid D (Marketing / Social Media)
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="font-medium">
                      About: Anaid is a teen, currently in sophmore year. She is
                      currently pursuing culinary. She also has her own small
                      business. Click{" "}
                      <a
                        href="https://linktr.ee/anna.sweet.treats"
                        target="blank"
                      >
                        <span className="text-black hover:underline hover:cursor-pointer">
                          HERE!
                        </span>
                      </a>
                    </p>
                    <br />
                    <p className="text-sm text-gray-700 font-bold">
                      Accomplishments:
                    </p>
                    <ul className="mt-2 text-sm text-gray-500">
                      <li>- Appeared In Teen Entrepeneur Show</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal2}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpen3} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal3}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Yolymarie D
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="font-medium">
                      About: She is our mother and the one that makes everything
                      possible.{" "}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal3}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="p-5 mb-3 mt-3">
        <h1 className=" text-black text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-6xl mb-1 ">
          About Our Team
        </h1>
        <div className="team-head">
          <div className="team-left">
            <img
              src="https://res.cloudinary.com/cduoshop/image/upload/v1667397564/312327963_186223027246904_4694977534149071981_n_jvsafk.jpg"
              alt="Our Team"
              className="rounded-lg"
              width="100%"
            />
          </div>
          <div className="team-right">
            <span>
              <p className="uppercase font-semibold text-[2em] text-black">
                Who We Are
              </p>
              <p className="font-medium text-[1.2em]">
                We are proud to say that we are a teen / family / veteran ran
                business in the state of Florida. With our combined experience,
                we are able to provide you with the best quality products at the
                best prices and with the best customer service. We are a small
                business that is growing and we want to thank you for being part
                of our journey. Click Below To Learn More About Each Member.
              </p>
            </span>
            <span className="about-buttons">
              <button
                onClick={openModal}
                className="rounded-md font-medium uppercase"
              >
                Carlos
              </button>
              <button
                onClick={openModal2}
                className="rounded-md font-medium uppercase"
              >
                Anaid
              </button>
              <button
                onClick={openModal3}
                className="rounded-md font-medium uppercase"
              >
                Yolymarie
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
