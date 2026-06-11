import { cn } from "@/utils/utils";
import { CheckCircle2, CircleX } from "lucide-react";
import { useLocation } from "react-router-dom";

const steps = [
  {
    path: "/doctor/profile/personal-info",
    label: "Personal Information"
  },
  {
    path: "/doctor/profile/work-info",
    label: "Work Information",
  },
  {
    path: "/doctor/profile/submit-info",
    label: "Submit Information",
  },
]

export const DoctorFormProgressIndicator = () => {
  const location = useLocation();
  const currentStepIndex = steps.findIndex((step) => step.path === location.pathname)

  return (
    <section className="grid grid-cols-2  gap-4 sm:place-items-center sm:grid-cols-3 sm:justify-items-start">
      {steps.map((step, index) => (
        <div className="relative flex" key={step.label}>
          <figure className={cn("flex gap-2 items-center rounded-full p-1",
            index < currentStepIndex ? "text-green-500" :
              index === currentStepIndex ? "text-red-800" : "text-slate-500")}>
            {index < currentStepIndex ? <CheckCircle2 className="size-4" /> : <CircleX className="size-4" />}
            <figcaption className="text-sm">{step.label}</figcaption>
          </figure>
          {index < steps.length - 1 && (
            <div className={cn("absolute h-0.5 sm:w-8 bottom-3 -right-12 rounded-sm", index < currentStepIndex ? "bg-green-500 text-green-500" : index === currentStepIndex ? "bg-red-800" : "bg-slate-500 text-slate-500")} />
          )}
        </div>
      ))}
    </section>
  )
}