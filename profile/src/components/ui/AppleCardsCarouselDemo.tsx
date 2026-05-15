"use client";

import { Carousel, Card } from "./apple-cards-carousel";

// Resolve local images via import.meta.url so bundler provides correct URLs
const pics = [
  new URL("../../assets/pictures/DSCF1634.JPG", import.meta.url).href,
  new URL("../../assets/pictures/DSCF1759.JPG", import.meta.url).href,
  new URL("../../assets/pictures/DSCF1769.JPG", import.meta.url).href,
  new URL("../../assets/pictures/DSCF1835.JPG", import.meta.url).href,
  new URL("../../assets/pictures/IMG_2550.JPG", import.meta.url).href,
  new URL("../../assets/pictures/IMG_9673.JPG", import.meta.url).href,
  new URL("../../assets/pictures/DSCF1571.JPG", import.meta.url).href,  
];

export function AppleCardsCarouselDemo() {
  const data = pics.map((src, i) => ({
    category: "San Francisco, 2026",
    title: `Snapshot ${i + 1}`,
    src,
    content: (
      <div>
        <p className="text-neutral-600 dark:text-neutral-300">
          Photo from conference highlights and networking.
        </p>
      </div>
    ),
  }));

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-6">
      <h2 className="max-w-7xl pl-0 mx-auto text-lg md:text-2xl font-bold text-neutral-200">
        Conference Photos
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

export default AppleCardsCarouselDemo;
