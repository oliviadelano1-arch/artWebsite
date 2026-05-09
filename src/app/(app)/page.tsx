import HomeClient from "@/components/home/home-client"
import { getImagesByType } from "../../../action/get-data"
import { ImageType } from "@prisma/client"

export default async function Main() {
  const hero = await getImagesByType(ImageType.Hero)
  const featured = await getImagesByType(ImageType.Featured)
  const works = await getImagesByType(ImageType.Works)

  return (
    <div className="container relative">
      <HomeClient
        hero={hero.data ?? []}
        featured={featured.data ?? []}
        works={works.data ?? []}
      />
    </div>
  )
}
