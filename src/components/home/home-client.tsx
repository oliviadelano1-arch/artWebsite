"use client";

import { useEffect, useState } from "react";
import { Hero } from "./hero";
import { cn } from "@/lib/utils";
import { FeaturedWork } from "./featured-work";
import { MoreWorks } from "./more-works";

export default function HomeClient({ hero, featured, works }:any) {
  const [heroImages, setHeroImages] = useState(hero)
  const [featuredImages, setFeaturedImages] = useState(featured)
  const [worksImages, setWorksImages] = useState(works)

    return (
        <div className="container relative">
            <section
                className={cn(
                    "mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:pb-20"
                )}
            >
                <Hero images={heroImages} />
            </section>

            <section className="flex items-start justify-center gap-6 rounded-lg p-8">
                <FeaturedWork images={featuredImages} />
            </section>

            <section className="flex items-start justify-center gap-6 rounded-lg p-8">
                <MoreWorks images={worksImages} />
            </section>
        </div>
    );
}
