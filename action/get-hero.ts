"use server";

import { prisma } from "@/lib/db";

export async function getHeroImages() {
  try {
    const images = await prisma.image.findMany({
      where: { type: "Hero" },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, data: images }
  } catch (error) {
    console.error("[GET_HERO_IMAGES_ERROR]", error)
    return { success: false, error: "Failed to fetch hero images" }
  }
}