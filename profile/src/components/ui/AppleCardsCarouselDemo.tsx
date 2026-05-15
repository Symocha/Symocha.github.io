"use client";

import { Carousel, Card } from "./apple-cards-carousel";

interface AppleCardsCarouselDemoProps {
  heading: string;
  category: string;
  description: string;
  images: string[];
  clickable?: boolean;
}

export function AppleCardsCarouselDemo({
  heading,
  category,
  description,
  images,
  clickable = false,
}: AppleCardsCarouselDemoProps) {
  const data = images.map((src, i) => ({
    category,
    title: `${heading} ${i + 1}`,
    src,
    content: (
      <div>
        <p className="text-neutral-600 dark:text-neutral-300">
          {description}
        </p>
      </div>
    ),
  }));

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} clickable={clickable} />
  ));

  return (
    <div className="w-full h-full py-6">
      <h2 className="max-w-7xl pl-0 mx-auto text-lg md:text-2xl font-bold text-neutral-200">
        {heading}
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

export default AppleCardsCarouselDemo;
