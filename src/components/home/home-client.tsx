"use client";

import { useEffect, useState } from "react";
import { Hero } from "./hero";
import { cn } from "@/lib/utils";
import { FeaturedWork } from "./featured-work";
import { MoreWorks } from "./more-works";

export default function HomeClient() {
    const [heroImages, setHeroImages] = useState([]);
    const [featuredImages, setFeaturedImages] = useState([]);
    const [worksImages, setWorksImages] = useState([]);

    useEffect(() => {
        async function loadImages() {
            const res = await fetch("/api/sheets-images", {
                // cache: "force-cache",
                cache: "no-store",
            });

            const data = await res.json();
            //   console.log("Raw API data:", data[0]);

            // Filter only hero images
            const featuredOnly = data.filter((img: any) => img.type === "featured");
            const heroOnly = data.filter((img: any) => img.type === "hero");
            const MoreWorksOnly = data.filter((img: any) => img.type === "works");

            // // console.log("Filtered hero images:", heroOnly);
            console.log("Filtered featured images:", featuredOnly);
            // console.log("Filtered works images:", MoreWorksOnly);

            const formatted1 = heroOnly.map((img: any) => ({
                src: img.url,
                alt: img.name,
                title: img.name,
                subtitle: img.category,
                category: img.category,
                type:img.type
            }));

            const formatted2 = featuredOnly.map((img: any) => ({
                src: img.url,
                alt: img.name,
                title: img.name,
                subtitle: img.category,
                category: img.category,
                type:img.type
            }));

            const formatted3 = MoreWorksOnly.map((img: any) => ({
                src: img.url,
                alt: img.name,
                title: img.name,
                subtitle: img.category,
                category: img.category,
                type:img.type
            }));

            setHeroImages(formatted1);
            setFeaturedImages(formatted2);
            setWorksImages(formatted3);
        }

        loadImages();
    }, []);

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
