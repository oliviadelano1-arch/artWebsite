import { getImagesAll } from "../../../../action/get-data-all"
import { ImageType } from "@prisma/client"
import { WorksContent } from "@/components/home/works-content"
import Image from "next/image"

export default async function BlocksPage() {
const works = await getImagesAll()

  return (
    <div className="gap-3 md:flex md:flex-row-reverse md:items-start">
      <div className="grid flex-1 gap-24 lg:gap-48">
          <WorksContent works={works.data ?? []} />
      </div>
    </div>
  )
}

