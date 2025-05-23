// src/data/homePageData.ts
// import { Product } from "@/types/product.types";
// import { Review } from "@/types/review.types";

export const newArrivalsData = [
  {
    id: 1,
    title: "Almonds (Badam)",
    srcUrl: "/images/pic1.png",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 120,
    discount: { amount: 0, percentage: 0 },
    rating: 4.5,
  },
  {
    id: 2,
    title: "Cashews (Kaju)",
    srcUrl: "/images/pic2.png",
    gallery: ["/images/pic2.png"],
    price: 260,
    discount: { amount: 0, percentage: 20 },
    rating: 3.5,
  },
  {
    id: 3,
    title: "Walnuts (Akhrot)",
    srcUrl: "/images/pic3.png",
    gallery: ["/images/pic3.png"],
    price: 180,
    discount: { amount: 0, percentage: 0 },
    rating: 4.5,
  },
  {
    id: 4,
    title: "Pistachios (Pista)",
    srcUrl: "/images/pic4.png",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 160,
    discount: { amount: 0, percentage: 30 },
    rating: 4.5,
  },
];

export const reviewsData = [
  {
    id: 1,
    user: "Rajesh K.",
    content:
      '"These almonds are so fresh and crunchy! I have never tasted such premium quality before. Highly recommend!"',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Priya M.",
    content:
      '"Cashews from here are amazing. Perfect for my daily snacking and super creamy in texture."',
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "Vikram S.",
    content:
      '"Walnuts are packed with nutrition and taste great. I love adding them to my breakfast."',
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Ananya P.",
    content:
      '"These pistachios are addictive! Fresh, tasty, and just the right amount of crunch."',
    rating: 5,
    date: "August 17, 2023",
  },
];
