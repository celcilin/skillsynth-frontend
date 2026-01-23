import { AcademicCapIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { ChartBarIcon, MapIcon, UsersIcon } from "lucide-react";

const detail = {
  title: "Your step‑by‑step guide to mastering any skill",
  description:
    "We provide structured learning paths designed to help you build new skills or grow your career with confidence. From foundation to advanced levels, our platform creates a clear, customized roadmap so you never feel lost in your learning journey.",
};

const features = [
  {
    name: "Personalized Roadmaps",
    description:
      "Get a tailored, step‑by‑step learning journey based on your goals, current level, and time commitment. No more guessing what to learn next.",
    icon: MapIcon,
  },
  {
    name: "Expert‑Curated Content",
    description:
      "Access resources and recommendations from industry professionals, ensuring the skills you develop are relevant and career‑ready.",
    icon: AcademicCapIcon,
  },
  {
    name: "Progress Tracking",
    description:
      "Visualize your growth with milestones, achievements, and reminders that keep you motivated and consistent along your journey.",
    icon: ChartBarIcon,
  },
  {
    name: "Community & Mentorship",
    description:
      "Join a network of learners and connect with mentors who can provide guidance, feedback, and career insights when you need it most.",
    icon: UsersIcon,
  },
];

export default function details() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-400">
            Deploy faster
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
            {detail.title}
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">{detail.description}</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
