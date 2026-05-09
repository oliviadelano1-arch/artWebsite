import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
  console.log("🌱 Starting seed...")
  // https://ffrilujrbjpicovolxfj.supabase.co/storage/v1/object/public/art-images/1.jpg

  const images = [];

  for (let i = 1; i <= 36; i++) {
    images.push({
      name: `${i}`,
      category: "Illustration",
      url: `https://ffrilujrbjpicovolxfj.supabase.co/storage/v1/object/public/art-images/${i}.jpg`,
      type: "Featured"
    });
  }

  await prisma.image.createMany({ data: images });

  console.log("Seeded 36 images");
}


main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
