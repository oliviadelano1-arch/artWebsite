"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getWorksImages() {
  try {
    const images = await prisma.image.findMany({
      where: { type: "Works" },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, data: images }
  } catch (error) {
    console.error("[GET_WORKS_IMAGES_ERROR]", error)
    return { success: false, error: "Failed to fetch works images" }
  }
}