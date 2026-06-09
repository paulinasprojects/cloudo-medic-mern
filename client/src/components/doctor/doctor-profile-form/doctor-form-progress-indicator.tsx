import { cn } from "@/utils/utils";
import { CheckCircle2, CircleIcon } from "lucide-react";
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
    <section className="grid grid-cols-2 gap-4 place-items-center sm:grid-cols-3 sm:justify-items-start">
      {steps.map((step, index) => (
        <div className="relative flex" key={step.label}>
          <figure className={cn("flex flex-col items-center rounded-full p-1",
            index < currentStepIndex ? "text-green-500" :
              index === currentStepIndex ? "text-red-500" : "text-slate-500")}>
            {index < currentStepIndex ? <CheckCircle2 className="size-8" /> : <CircleIcon className="size-8" />}
            <figcaption>{step.label}</figcaption>
          </figure>
          {index < steps.length - 1 && (
            <div className={cn("absolute h-1 sm:w-8 bottom-4 -right-16 rounded-sm", index < currentStepIndex ? "bg-green-100 text-green-500" : index === currentStepIndex ? "bg-red-500" : "bg-slate-200 text-slate-500")} />
          )}
        </div>
      ))}
    </section>
  )
}