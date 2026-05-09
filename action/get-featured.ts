"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getFeaturedImages() {
  try {
    const images = await prisma.image.findMany({
      where: { type: "Featured" },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, data: images }
  } catch (error) {
    console.error("[GET_FEATURED_IMAGES_ERROR]", error)
    return { success: false, error: "Failed to fetch featured images" }
  }
}

