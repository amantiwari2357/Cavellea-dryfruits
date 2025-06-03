import {
  newArrivalsData,
  relatedProductData,
  topSellingData,
} from "@/data/productMockData";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { notFound } from "next/navigation";

const allProductData = [
  ...newArrivalsData,
  ...topSellingData,
  ...relatedProductData,
];

export default function ProductPage({ params }) {
  const productData = allProductData.find(
    (product) => product.id === Number(params.slug[0])
  );

  if (!productData?.title) {
    notFound();
  }

  const recommendedProducts = [
    ...relatedProductData.slice(1, 4),
    ...newArrivalsData.slice(1, 4),
    ...topSellingData.slice(1, 4),
  ];

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData.title} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>

      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={recommendedProducts} />
      </div>
    </main>
  );
}
