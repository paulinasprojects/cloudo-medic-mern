import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

interface Props {
  title: string;
  icon: IconSvgElement
  data: number;
  description: string
}

export default function AdminDashboardCard({title, icon, data, description}: Props) {
  return (
    <div className="dark:bg-[#0e121b] bg-white px-4 py-6 rounded-xl">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-full bg-[#191b27]">
            <HugeiconsIcon icon={icon} className="size-6 text-white"/>
          </div>
          <span>{title}</span>
        </div>
        <span className="text-[26px]">
          {data}
        </span>
      </div>
      <div className="pt-10">
        <span className="text-center">{description}</span>
      </div>
		</div>
  )
}
