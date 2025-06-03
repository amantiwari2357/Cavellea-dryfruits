"use client";

import ProductListSec from "@/components/common/ProductListSec";
// import Brands from "../components/homepage/Brands";
import Brands from "../components/homepage/Brands/index"
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { newArrivalsData, reviewsData } from "@/app/data/omePageData";

export default function Home() {
  return (
    <>
    {/* asc s H H EHD  */}
      <Header />
      <Brands />

      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
