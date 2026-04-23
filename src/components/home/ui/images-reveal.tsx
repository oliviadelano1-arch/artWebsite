"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const cards = [
  {
    src: "https://drive.google.com/uc?id=1VCl9a-uFO8k0sxod6ZDosy_JVjmW2tYl&export=download",
    angle: "8deg",
  },
  {
    src: "https://drive.google.com/uc?id=1UYf8Noj9jCH3HnAeR1QAxSgIX9wXC4z0&export=download",
    angle: "-15deg",
  },
  {
    src: "https://drive.google.com/uc?id=1J65amT_uUFOli7HZfH1QmuDqa7dSEWYB&export=download",
    angle: "-5deg",
  },
  {
    src: "https://drive.google.com/uc?id=1CxC5v8GHZlJkG7XqDy67OBsqK3qSj2di&export=download",
    angle: "10deg",
  },
  {
    src: "https://drive.google.com/uc?id=16xwO0rPFeoYgoXOcuZbT9sSDbBQ9vsTm&export=download",
    angle: "-5deg",
  },
];

interface CustomProps {
  index: number;
  angle: string;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: (custom: CustomProps) => ({
    opacity: 1,
    scale: 1,
    rotate: custom.angle,
    transition: {
      delay: custom.index * 0.1,
      duration: 0.3,
      type: "spring",
      stiffness: 150,
      damping: 20,
      mass: 0.5,
    },
  }),
};
const MotionImage = motion(Image);
export function ImagesReveal({ images }: any) {
  const cards = [
    { angle: "8deg" },
    { angle: "-15deg" },
    { angle: "-5deg" },
    { angle: "10deg" },
    { angle: "-5deg" },
  ];

  // Merge angles with images
  const merged = images.map((img: any, i: number) => ({
    ...img,
    angle: cards[i % cards.length].angle, // loop angles if needed
  }));


  // console.log(merged)
  return (
    <div className="relative ml-8 flex flex-row justify-center sm:ml-10 md:ml-16 lg:ml-20">
      {merged.map((card:any, i:any) => (
        <MotionImage
          key={i}
          src={card.src}
          alt={`Card ${i + 1}`}
          fill={false} // required when using width/height instead of fill
          width={300}  // any number, real size controlled by CSS
          height={300}
          className="
        relative object-cover shadow-lg
        -ml-8 size-24 rounded-xl
        sm:-ml-10 sm:size-24 sm:rounded-xl
        md:-ml-16 md:size-36 md:rounded-2xl
        lg:-ml-20 lg:size-[14.5rem] lg:rounded-2xl
      "
          custom={{ index: i, angle: card.angle }}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{
            scale: 1.05,
            rotate: "0deg",
            zIndex: 10,
            y: -10,
            transition: {
              duration: 0.3,
              type: "spring",
              stiffness: 150,
              damping: 20,
            },
          }}
          sizes="(max-width: 640px) 6rem,
             (max-width: 768px) 6rem,
             (max-width: 1024px) 9rem,
             14.5rem"
        />
      ))}
    </div>
  );
}
