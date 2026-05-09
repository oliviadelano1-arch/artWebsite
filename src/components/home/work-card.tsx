'use client';

import { useState } from 'react';
import { ProgressiveBlur } from './ui/progressive-blur';
import { motion } from 'framer-motion';
import Image from "next/image"
interface WorkCardProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export function WorkCard({ src, alt, title, subtitle, onClick }: any) {
  const [isHover, setIsHover] = useState(false);

  return (

      <div
        className='relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={onClick}   // ← ADD THIS
      >


        <Image
          src={src}
          alt={alt}
          fill
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
        />


        <ProgressiveBlur
          className='pointer-events-none absolute bottom-0 left-0 h-[75%] w-full'
          blurIntensity={0.5}
          animate={isHover ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
        <motion.div
          className='absolute bottom-0 left-0'
          animate={isHover ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className='flex flex-col items-start gap-0 px-5 py-4'>
            <p className='text-base font-medium text-white'>{title || alt}</p>
            {subtitle && <span className='text-base text-zinc-300'>{subtitle}</span>}
          </div>
        </motion.div>
      </div>
  
  );
}
