"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Header = () => {
  // const [showContinueDialog, setShowContinueDialog] = useState(false);
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const handlePersonalize = () => {
  //   setShowContinueDialog(true);
  // };
  
const handlePersonalize = () => {
  router.push('/Customize'); // Make sure Customize.jsx is in `pages/`
};

  // const handleStartOver = () => {
  //   setShowContinueDialog(false);
  //   router.push("/Customize");
  // };

  // const handleContinue = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setShowContinueDialog(false);
  //     setLoading(false);
  //     router.push("/Customize");
  //   }, 2000);
  // };

  return (
    <header className="bg-[#F2F0F1] pt-10 md:pt-24 overflow-hidden">
      <div className="md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <section className="max-w-frame px-4">
          <motion.h2
            initial={{ y: "100px", opacity: 0, rotate: 10 }}
            whileInView={{ y: "0", opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn([
              integralCF.className,
              "text-4xl lg:text-[64px] lg:leading-[64px] mb-5 lg:mb-8",
            ])}
          >
            DISCOVER PREMIUM QUALITY DRY FRUITS
          </motion.h2>

          <motion.p
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-black/60 text-sm lg:text-base mb-6 lg:mb-8 max-w-[545px]"
          >
            Explore our handpicked selection of nutritious and delicious dry
            fruits, carefully sourced to ensure the highest quality and
            freshness.
          </motion.p>

          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 mb-5 md:mb-12">
              <Link
                href="/shop"
                className="w-full md:w-52 inline-block text-center bg-black hover:bg-black/80 transition-all text-white px-14 py-4 rounded-full hover:animate-pulse"
              >
                Shop Now
              </Link>

              <button
                className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors relative overflow-hidden group"
                onClick={handlePersonalize}
              >
                <span className="font-bold">personalize yours</span>
                <div className="bg-white rounded-full p-1 ml-1 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 text-pink-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex md:h-full md:max-h-11 lg:max-h-[52px] xl:max-h-[68px] items-center justify-center md:justify-start flex-wrap sm:flex-nowrap md:space-x-3 lg:space-x-6 xl:space-x-8 md:mb-[116px]"
          >
            <div className="flex flex-col">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={50} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                Premium Varieties
              </span>
            </div>

            <Separator className="ml-6 md:ml-0 h-12 md:h-full bg-black/10" orientation="vertical" />

            <div className="flex flex-col ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={1000} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                Satisfied Customers
              </span>
            </div>

            <Separator className="hidden sm:block sm:h-12 md:h-full ml-6 md:ml-0 bg-black/10" orientation="vertical" />

            <div className="flex flex-col w-full text-center sm:w-auto sm:text-left mt-3 sm:mt-0 sm:ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={500} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                Healthy & Nutritious Choices
              </span>
            </div>
          </motion.div>
        </section>

        <motion.section
          initial={{ y: "100px", opacity: 0, rotate: 10 }}
          whileInView={{ y: "0", opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="relative md:px-4 min-h-[448px] md:min-h-[428px] bg-cover bg-top xl:bg-[center_top_-1.6rem] bg-no-repeat bg-[url('/images/header-res-homepage.png')] md:bg-[url('/images/header-homepage.png')]"
        >
          <Image
            priority
            src="/icons/big-star.svg"
            height={104}
            width={104}
            alt="big star"
            className="absolute right-7 xl:right-0 top-12 max-w-[76px] max-h-[76px] lg:max-w-24 xl:max-w-[104px] animate-[spin_4s_infinite]"
          />
          <Image
            priority
            src="/icons/small-star.svg"
            height={56}
            width={56}
            alt="small star"
            className="absolute left-7 md:left-0 top-36 sm:top-64 md:top-44 lg:top-56 max-w-11 md:max-w-14 animate-[spin_3s_infinite]"
          />
        </motion.section>
      </div>

      {/* Dialog */}
      {/* <Dialog open={showContinueDialog} onOpenChange={setShowContinueDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Would you like to continue from where you left off?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-center gap-4 sm:justify-center mt-4">
            <button
              onClick={handleStartOver}
              className="border-2 border-gray-300 bg-white hover:bg-gray-100 text-gray-800 px-6 py-2 rounded-full font-medium transition-colors"
            >
              no, start over
            </button>
            <button
              onClick={handleContinue}
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-2 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <>
                  yes
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path
                      d="M8 12.5L11 15.5L16 9.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </header>
  );
};

export default Header;
