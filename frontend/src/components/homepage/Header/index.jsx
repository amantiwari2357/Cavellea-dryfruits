"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const sliderImages = [
  "/images/GP_Banner_5-05.webp",
  "/images/GP_Banner-01_1.webp",
  "/images/Website_Banner_14_1.webp",
];

const Header = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClickBanner = () => {
    router.push("/shop");
  };

  return (
    <>
      {/* Fullscreen Banner */}
      <header
        onClick={handleClickBanner}
        className="relative w-full h-[100vh] sm:h-screen overflow-hidden cursor-pointer"
      >
        {/* Carousel with image transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full z-0"
          >
            <Image
              src={sliderImages[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="object-cover sm:object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay text/buttons - currently disabled */}
        <div className="relative z-10 h-full flex flex-col justify-center items-start px-4 md:px-10 max-w-6xl mx-auto">
          {/* Optional: Enable text/buttons here if needed */}
        </div>

        {/* Optional black overlay for readability */}
        {/* <div className="absolute inset-0 bg-black/40 z-0" /> */}
      </header>

      {/* Stats Section Below Banner */}
      <section className="bg-[#F2F0F1] px-4 py-12">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap sm:flex-nowrap items-center justify-center max-w-6xl mx-auto gap-10"
        >
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-3xl lg:text-4xl">
              <AnimatedCounter from={0} to={50} />+
            </span>
            <span className="text-sm text-black/60">Premium Varieties</span>
          </div>

          <Separator className="hidden sm:block h-12 bg-black/10" orientation="vertical" />

          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-3xl lg:text-4xl">
              <AnimatedCounter from={0} to={1000} />+
            </span>
            <span className="text-sm text-black/60">Satisfied Customers</span>
          </div>

          <Separator className="hidden sm:block h-12 bg-black/10" orientation="vertical" />

          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-3xl lg:text-4xl">
              <AnimatedCounter from={0} to={120} />+
            </span>
            <span className="text-sm text-black/60">Trusted Partners</span>
          </div>

          <Separator className="hidden sm:block h-12 bg-black/10" orientation="vertical" />

          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-3xl lg:text-4xl">
              <AnimatedCounter from={0} to={120} />+
            </span>
            <span className="text-sm text-black/60">Award Won</span>
          </div>

          <Separator className="hidden sm:block h-12 bg-black/10" orientation="vertical" />

          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-3xl lg:text-4xl">
              <AnimatedCounter from={0} to={500} />+
            </span>
            <span className="text-sm text-black/60">Healthy & Nutritious Choices</span>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Header;
