import React from "react";
// import { FooterLinks } from "./footer.types";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinksData = [
  {
    id: 1,
    title: "Our Store",
    children: [
      {
        id: 11,
        label: "About Us",
        url: "/About",
      },
      {
        id: 12,
        label: "Our Products",
        url: "/products",
      },
      {
        id: 13,
        label: "Why Choose Us",
        url: "/Choose",
      },
     
    ],
  },
  {
    id: 2,
    title: "Customer Support",
    children: [
      {
        id: 21,
        label: "Contact Us",
        url: "/Contact",
      },
      {
        id: 22,
        label: "Shipping & Delivery",
        url: "/Shiping",
      },
      {
        id: 23,
        label: "Return Policy",
        url: "/policy",
      },
      {
        id: 24,
        label: "Privacy Policy",
        url: "/Privacy",
      },
    ],
  },
  {
    id: 3,
    title: "Orders & Deliveries",
    children: [
      {
        id: 31,
        label: "Track Your Order",
        url: "/Order",
      },
     
      {
        id: 33,
        label: "Bulk Orders",
        url: "/BulkOrder",
      },
      {
        id: 34,
        label: "Payment Options",
        url: "/Payment",
      },
    ],
  },
  {
    id: 4,
    title: "Healthy Living",
    children: [
      {
        id: 41,
        label: "Dry Fruits Benefits",
        url: "/Benefits",
      },
      
      {
        id: 43,
        label: "Our Blog",
        url: "/Blog",
      },
      {
        id: 44,
        label: "Nutritional Guide",
        url: "/Guide",
      },
    ],
  },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={cn([
                link.id !== 41 && link.id !== 43 && "capitalize",
                "text-black/60 text-sm md:text-base mb-4 w-fit",
              ])}
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
