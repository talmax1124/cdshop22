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
                    Carlos D
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Accomplishments:</p>
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
                    Anaid D{" "}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Accomplishments:</p>
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
                    <p className="text-sm text-gray-500">Accomplishments</p>
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
              src="https://i.ibb.co/RYh4hvf/312327963-186223027246904-4694977534149071981-n.jpg"
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

            <div className="content-about-buttons">
              <button
                className="inline-flex items-center justify-center px-4 py-2 mt-2 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700  focus:ring-4 focus:ring-primary-300 bg-blue-600 hover:bg-blue-700"
                onClick={openModal}
              >
                CEO: Carlos (Left)
              </button>
              <button
                className="inline-flex items-center justify-center px-4 py-2 mt-2 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700  focus:ring-4 focus:ring-primary-300 bg-blue-600 hover:bg-blue-700"
                onClick={openModal2}
              >
                Socials/Marketing: Anaid (Middle)
              </button>
              <button
                className="inline-flex items-center justify-center px-4 py-2 mt-2 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700  focus:ring-4 focus:ring-primary-300 bg-blue-600 hover:bg-blue-700"
                onClick={openModal3}
              >
                Co-Founder: Yolymarie (Right)
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
