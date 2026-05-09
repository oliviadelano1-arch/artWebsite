import HomeClient from "@/components/home/home-client"
import { getImagesByType } from "../../../action/get-data"


export default async function Main() {
  const hero = await getImagesByType('Hero')
  const featured = await getImagesByType("Featured")
  const works = await getImagesByType("Works")

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
