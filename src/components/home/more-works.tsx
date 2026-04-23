"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { FlipReveal, FlipRevealItem } from "./ui/flip-reveal";
import { Button } from "./ui/button";
import Image from "next/image";

const works = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400",
    alt: "Abstract art",
    category: "illustration",
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400",
    alt: "Design work",
    category: "design",
  },
  {
    src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400",
    alt: "Animation frame",
    category: "animation",
  },
  {
    src: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=400",
    alt: "Illustration",
    category: "illustration",
  },
  {
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400",
    alt: "Art piece",
    category: "design",
  },
  {
    src: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=400",
    alt: "Motion design",
    category: "animation",
  },
  {
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400",
    alt: "Abstract illustration",
    category: "illustration",
  },
  {
    src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=400",
    alt: "Design concept",
    category: "design",
  },
  {
    src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400",
    alt: "Animation art",
    category: "animation",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export function MoreWorks({ images }: any) {
  const [key, setKey] = useState("all");

  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl">
            More Works
          </h2>

        </motion.div>

        {/* <motion.div
          className="mb-10 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <ToggleGroup
            type="single"
            className="rounded-full border bg-background p-1"
            value={key}
            onValueChange={(e) => e && setKey(e)}
          >
            <ToggleGroupItem
              value="all"
              className="rounded-full px-4 text-xs sm:px-6 sm:text-sm"
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem
              value="illustration"
              className="rounded-full px-4 text-xs sm:px-6 sm:text-sm"
            >
              Illustration
            </ToggleGroupItem>
            <ToggleGroupItem
              value="design"
              className="rounded-full px-4 text-xs sm:px-6 sm:text-sm"
            >
              Design
            </ToggleGroupItem>
            <ToggleGroupItem
              value="animation"
              className="rounded-full px-4 text-xs sm:px-6 sm:text-sm"
            >
              Animation
            </ToggleGroupItem>
          </ToggleGroup>
        </motion.div> */}

        <FlipReveal
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6"
          keys={[key]}
          showClass="flex"
          hideClass="hidden"
        >
          {images.map((work: any, i: any) => (
            <FlipRevealItem key={i} flipKey={work.category}>

              <Image
                src={work.src}
                alt={work.alt}
                width={400}
                height={400}
                className="aspect-square w-full rounded-xl object-cover shadow-md transition-transform hover:scale-[1.02] sm:rounded-2xl"
              />
            </FlipRevealItem>
          ))}
        </FlipReveal>

        <motion.div
          className="mt-10 flex justify-center md:mt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 text-sm font-medium uppercase tracking-wider"
          >
            <Link href="/works">View More</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
