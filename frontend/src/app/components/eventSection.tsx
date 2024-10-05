"use client";

import React from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

export const EventSection = () => {
  const cards = [
    {
      name: "ESGS",
      location: "Paranaque",
      organizer: "BLEvently",
      image: "https://nextui.org/images/card-example-1.jpeg",
    },
    {
      name: "ESGS",
      location: "Paranaque",
      organizer: "BLEvently",
      image: "https://nextui.org/images/card-example-1.jpeg",
    },
    {
      name: "ESGS",
      location: "Paranaque",
      organizer: "BLEvently",
      image: "https://nextui.org/images/card-example-1.jpeg",
    },
    {
      name: "ESGS",
      location: "Paranaque",
      organizer: "BLEvently",
      image: "https://nextui.org/images/card-example-1.jpeg",
    },
    {
      name: "ESGS",
      location: "Paranaque",
      organizer: "BLEvently",
      image: "https://nextui.org/images/card-example-1.jpeg",
    },
    {
      name: "ESGS",
      location: "Paranaque",
      organizer: "BLEvently",
      image: "https://nextui.org/images/card-example-1.jpeg",
    },
    {
      name: "ESGS",
      location: "Paranaque",
      organizer: "BLEvently",
      image: "https://nextui.org/images/card-example-1.jpeg",
    },
    {
      name: "ESGS",
      location: "Paranaque",
      organizer: "BLEvently",
      image: "https://nextui.org/images/card-example-1.jpeg",
    },
    {
      name: "ESGS",
      location: "Paranaque",
      organizer: "BLEvently",
      image: "https://nextui.org/images/card-example-1.jpeg",
    },
    {
      name: "ESGS",
      location: "Paranaque",
      organizer: "BLEvently",
      image: "https://nextui.org/images/card-example-1.jpeg",
    },
  ].slice(0, 6);
  return (
    <section className="mx-auto max-w-[1920px] px-4 py-12 text-skin-base">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
          Featured Events
        </h2>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        {cards.map((card, index) => (
          <Card
            isFooterBlurred
            key={index}
            className="w-full h-[300px] col-span-4"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <h4 className="text-white/90 font-medium text-xl">{card.name}</h4>
              <p className="text-xs text-white/60 uppercase font-bold">
                {card.location}
              </p>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src={card.image}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">Organized by</p>
                  <p className="font-bold text-tiny text-white/60">
                    {card.organizer}
                  </p>
                </div>
              </div>
              <Button
                radius="full"
                size="sm"
                className="font-bold rounded-full bg-gray-500/20 backdrop-blur"
              >
                See Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
