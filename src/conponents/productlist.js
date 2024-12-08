import { useEffect, useState } from "react";
import { SingleProduct } from "./product";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-03-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 7,
    name: "Coffee Maker",
    description:
      "Compact and efficient coffee maker for your daily brewing needs.",
    price: 39.99,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-02.jpg",
    category: "Kitchen",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 8,
    name: "Yoga Mat",
    description:
      "Eco-friendly and non-slip yoga mat for your fitness routines.",
    price: 19.99,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-05.jpg",

    category: "Sportswear",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 9,
    name: "Tablet",
    description:
      "High-performance tablet with a stunning display and long battery life.",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    price: 299.99,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-03-image-card-02.jpg",

    category: "Electronics",
  },
  {
    id: 10,
    name: "Gaming Chair",
    description:
      "Ergonomic gaming chair with adjustable features for maximum comfort.",
    price: 149.99,
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-03-image-card-05.jpg",
    category: "Furniture",
  },
  // More products...
];

export default function Productlist() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <SingleProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
