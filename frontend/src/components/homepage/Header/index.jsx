import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";

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

  const handlePersonalize = () => {
    router.push("/Customize");
  };

  return (
    <>
      {/* Fullscreen Banner */}
      <header className="relative w-full h-screen overflow-hidden">
        {/* Carousel */}
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={sliderImages[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Text and Buttons */}
        <div className="relative z-10 h-full flex flex-col justify-center items-start px-4 md:px-10 max-w-6xl mx-auto">
          {/* <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl lg:text-6xl mb-4 max-w-3xl font-bold"
          >
            DISCOVER PREMIUM QUALITY DRY FRUITS
          </motion.h2> */}

          {/* <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white text-sm lg:text-lg max-w-xl mb-6"
          > */}
            {/* Explore our handpicked selection of nutritious and delicious dry
            fruits, carefully sourced to ensure the highest quality and
            freshness. */}
          {/* </motion.p> */}

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* <Link
              href="/shop"
              className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Shop Now
            </Link> */}
            {/* <button
              onClick={handlePersonalize}
              className="bg-pink-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-pink-700 transition flex items-center gap-2"
            >
              Personalize Yours
              <div className="bg-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 text-pink-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </button> */}
          </motion.div>
        </div>

        {/* Overlay for readability */}
        <div className="" />   
        {/* use this absolute inset-0 bg-black/40 z-0 if need to display blur type banner otherwise forget it */}
      </header>

 {/* Stats Section Below Banner */}
      
      <section className="bg-[#F2F0F1] px-4 py-12 ">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap sm:flex-nowrap items-center justify-center max-w-6xl mx-auto gap-10">  
          {/* uper wale class se ham pura state ko kaha kya width gap and all manage kr sakte hai */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-3xl lg:text-4xl">
              <AnimatedCounter from={0} to={50} />+
            </span>
            <span className="text-sm text-black/60">Premium Varieties</span>
          </div>

          <Separator
            className="hidden sm:block h-12 bg-black/10"
            orientation="vertical"
          />

          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-3xl lg:text-4xl">
              <AnimatedCounter from={0} to={1000} />+
            </span>
            <span className="text-sm text-black/60">Satisfied Customers</span>
          </div>

          <Separator
            className="hidden sm:block h-12 bg-black/10"
            orientation="vertical"
          />
  <div className="flex flex-col items-center sm:items-start">
      <span className="font-bold text-3xl lg:text-4xl">
        <AnimatedCounter from={0} to={120} />+
      </span>
      <span className="text-sm text-black/60">Trusted Partners</span>
    </div>

    <Separator
      className="hidden sm:block h-12 bg-black/10"
      orientation="vertical"
    />

      <div className="flex flex-col items-center sm:items-start">
      <span className="font-bold text-3xl lg:text-4xl">
        <AnimatedCounter from={0} to={120} />+
      </span>
      <span className="text-sm text-black/60">Award Won</span>
    </div>

    <Separator
      className="hidden sm:block h-12 bg-black/10"
      orientation="vertical"
    />
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-bold text-3xl lg:text-4xl">
              <AnimatedCounter from={0} to={500} />+
            </span>
            <span className="text-sm text-black/60">
              Healthy & Nutritious Choices
            </span>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Header;
