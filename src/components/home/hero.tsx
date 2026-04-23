"use client";

import { motion } from "framer-motion";
import { ImagesReveal } from "./ui/images-reveal";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function Hero({ images }:any) {
  const name = "Olivia Rose";

  return (
    //  min-h-screen
    <motion.div
      className="grid grid-rows-[0.9fr_min-content] justify-between bg-white px-4 py-6 md:py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >


      {/* Middle: Main Content */}
      <div className="flex flex-col items-center justify-center gap-8 py-8 sm:gap-8 ">
        {/* Name with letter animation */}
        <motion.h1
          className="flex flex-wrap justify-center px-2 text-center font-heading text-5xl font-bold uppercase tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-8xl"
          variants={scaleIn}
        >
             {name}
          {/* {name.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              transition={{
                duration: 0.5,
                delay: i * 0.03,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))} */}
        </motion.h1>

        {/* Images Reveal */}
        <motion.div className="my-2 sm:my-4 md:my-6 lg:my-8" variants={scaleIn}>
          <ImagesReveal images={images}/>
        </motion.div>

        {/* Role Title - 3 lines on mobile, 2 on desktop */}
        <motion.div className="overflow-hidden text-center">
          <motion.h2
            className="font-heading text-5xl font-bold uppercase tracking-tight text-neutral-300 sm:text-4xl md:text-6xl lg:text-9xl"
            variants={slideInLeft}
          >
            Artist,
          </motion.h2>
          <motion.h2
            className="hidden font-heading text-5xl font-bold uppercase tracking-tight text-neutral-300 sm:block sm:text-4xl md:text-6xl lg:text-9xl"
            variants={slideInRight}
          >
            Designer & Naturalist
          </motion.h2>
          {/* Mobile: split into 2 lines */}
          <motion.h2
            className="font-heading text-5xl font-bold uppercase tracking-tight text-neutral-300 sm:hidden"
            variants={slideInRight}
          >
            Designer &
          </motion.h2>
          <motion.h2
            className="font-heading text-5xl font-bold uppercase tracking-tight text-neutral-300 sm:hidden"
            variants={slideInLeft}
          >
            Animator
          </motion.h2>
        </motion.div>
      </div>

      {/* Bottom: Clients */}
      <motion.div className="px-2 pb-4 text-center md:pb-6" variants={fadeInUp}>
        <div className="mx-auto mb-3 h-px w-48 bg-neutral-200 sm:w-64" />
        <p className="text-xs font-bold uppercase tracking-widest text-foreground sm:text-sm">
          Clients Include
        </p>
        <p className="mx-auto mt-2 max-w-xs text-[10px] uppercase tracking-wider text-muted-foreground sm:max-w-none sm:text-xs">
          Apple, Amazon, Adobe, Google, Nike, The New York Times, Lululemon, NPR
        </p>
      </motion.div>
    </motion.div>
  );
}
