"use server";

import { prisma } from "@/lib/db";

export async function getImagesByType(type: any) {
  try {
    const images = await prisma.image.findMany({
      where: { type },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, data: images }
  } catch (error) {
    console.error("[GET_IMAGES_BY_TYPE_ERROR]", error)
    return { success: false, error: "Failed to fetch images by type" }
  }
}
