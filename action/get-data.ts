"use server";

import { PrismaClient, ImageType } from "@prisma/client";
const prisma = new PrismaClient();

export async function getImagesByType(type: ImageType) {
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
