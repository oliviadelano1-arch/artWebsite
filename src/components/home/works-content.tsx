"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ArrowLeft, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"


import { FlipReveal, FlipRevealItem } from "./ui/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

import { WorkCard } from "./work-card";
import Image from "next/image";

// const works = [
//   {
//     src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600",
//     alt: "Abstract art",
//     title: "Abstract Art",
//     subtitle: "Illustration",
//     category: "illustration",
//   },

// ];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// Modal component for displaying the selected image
const ImageModal = ({ item, onClose }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl p-4 h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.url}
          alt={item.title}
          fill
         className="rounded-lg object-contain"
          sizes="100vw"
        />

      </motion.div>

      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
        aria-label="Close image view"
      >
        <X size={24} />
      </button>
    </motion.div>
  )
}

export function WorksContent({ works }: any) {

  // console.log(works[0])

  const [key, setKey] = useState("all");
  const [images, setImages] = useState(works);

  // NEW: modal state
  const [selected, setSelected] = useState<any>(null)


  // Filter images when key changes
  useEffect(() => {
    if (key === "all") {
      setImages(works)
    } else {
      setImages(works.filter((img: any) => img.category === key))
    }
  }, [key, works])


  // console.log(images)

  return (
    <main className="min-h-screen bg-white px-4 py-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl">
            All Works
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Browse by category
          </p>
        </motion.div>

        <motion.div
          className="mb-10 flex justify-center"
          initial="hidden"
          animate="visible"
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
              value="Illustration"
              className="rounded-full px-4 text-xs sm:px-6 sm:text-sm"
            >
              Illustration
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Painting"
              className="rounded-full px-4 text-xs sm:px-6 sm:text-sm"
            >
              Painting
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Drawing"
              className="rounded-full px-4 text-xs sm:px-6 sm:text-sm"
            >
              Drawing
            </ToggleGroupItem>
          </ToggleGroup>
        </motion.div>

        <FlipReveal
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6"
          keys={[key]}
          showClass="flex"
          hideClass="hidden"
        >
          {images.map((work: any, i: any) => (
            // @ts-ignore
            <FlipRevealItem key={i} flipKey={work.category}>

              <WorkCard
                // @ts-ignore
                src={work.url}
                // @ts-ignore
                alt={work.name}
                // @ts-ignore
                title={work.name}
                // @ts-ignore
                subtitle={work.category}
                onClick={() => setSelected(work)}
              />

            </FlipRevealItem>
          ))}
        </FlipReveal>
      </div>

      {/* NEW: modal rendering */}
      <AnimatePresence>
        {selected && (
          <ImageModal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      {/* <div className="flex h-[300px]"></div> */}
    </main>

  );
}


