import { getImagesAll } from "../../../../action/get-data-all"

import { WorksContent } from "@/components/home/works-content"


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

