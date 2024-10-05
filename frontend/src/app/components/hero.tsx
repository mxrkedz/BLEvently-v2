"use client";

import React from "react";
import HeroCard from "./heroCard";
import { motion } from "framer-motion";
import Link from "next/link";
const Hero = () => {
  return (
    <section className="h-screen w-full px-8 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <h3 className="text-4xl md:text-6xl font-semibold text-skin-inverted">
          Build
        </h3>
        <h3 className="text-4xl md:text-6xl font-semibold text-skin-inverted">
          Legendary
        </h3>
        <h3 className="text-4xl md:text-6xl font-semibold text-skin-inverted">
          Events
        </h3>
        <p className="text-base md:text-lg my-4 md:my-6 text-skin-base">
          BLEvently makes it easy to plan, promote, and manage your events.
          Start creating your next event today.
        </p>
        <Link href={"/create"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="whitespace-nowrap rounded-lg bg-skin-button-base px-4 py-2 font-medium text-skin-base shadow-xl transition-colors hover:bg-skin-button-base-hover"
          >
            Create Event
          </motion.button>
        </Link>
      </div>
      <HeroCard />
    </section>
  );
};

export default Hero;
