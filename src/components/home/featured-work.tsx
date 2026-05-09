"use client";

import dynamic from "next/dynamic";

const CircularGallery = dynamic(
  () => import("@/components/home/ui/circular-gallery"),
  { ssr: false }
);

// const workItems = [
//   {
//     image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
//     text: "NIKE",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop",
//     text: "APPLE",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
//     text: "AMAZON",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
//     text: "ADOBE",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=600&fit=crop",
//     text: "GOOGLE",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop",
//     text: "NYT",
//   },
// ];

export function FeaturedWork({ images }:any) {

  // console.log(images[0])
  
  const formattedImages = images.map((item: any) => ({
    image: item.url,   // rename image → src
    text: item.name ?? "", // keep text if it exists
  }));
  
  // console.log(formattedImages)

  return (
    <section className="w-full bg-white py-16 md:py-24">
      {/* Header */}
      <div className="mb-2 text-center md:mb-2">
        <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Featured Work
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base md:mt-4">
          Select recent and notable projects
        </p>
      </div>

      {/* Gallery */}
      <div className="relative h-[400px] w-full sm:h-[500px] md:h-[600px]">
        <CircularGallery
          items={formattedImages}
          bend={1}
          textColor="#545050"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
    </section>
  );
}
