"use client";
import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";


export default async function Home() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/steven-tey/precedent",
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every 24 hours
      next: { revalidate: 86400 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <>
      <div className="z-10 py-12 w-full max-w-2xl px-5 xl:px-0">
        <h1
          className="py-12 animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-6xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-9xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          co:valence
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Revolutionizing healthcare with AI-driven assistance for psychological health professionals.
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
        </div>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={title === "Interactive Chatbot" ? <ComponentGrid /> : demo}
            large={large}
          />
        ))}
      </div>
    </>
  );
}

const features = [
  {
    title: "Interactive Chatbot",
    description: "Enhance diagnosis and patient communication with AI-driven chatbot capabilities, based on advanced GPT technology and semantic search.",
    demo: <ComponentGrid />, 
    large: true,
  },
  {
    title: "Semantic Scholar Integration",
    description: "Access semantically similar medical papers and records instantly, refining and streamlining the data search process for healthcare professionals.",
    demo: <WebVitals />,
  },
  {
    title: "Diagnostic Accuracy",
    description: "Employ DSM-5 standards and Joint Catalogue data for improved diagnostic accuracy, identifying comorbidities and reducing misdiagnosis rates.",
    demo: (
      <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
        <span className="font-mono font-semibold">DSM-5 Lookup</span>
        <span className="font-mono font-semibold">Comorbidity Analysis</span>
      </div>
    ),
  },
  {
    title: "Integrated Medical Journal",
    description: "Keep patient records organized and accessible with an integrated journal system underpinned by a secure online database.",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Secure Database" src="/database-icon.svg" width={50} height={50} />
        <Image alt="Medical Journal" src="/journal-icon.svg" width={50} height={50} />
      </div>
    ),
  },
  {
    title: "Innovative Healthcare Utilites",
    description: "Explore a collection of healthcare-focused utilities and hooks to enhance the functionality and efficiency of patient care.",
    demo: (
      <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
        <span className="font-mono font-semibold">usePatientHistory</span>
        <span className="font-mono font-semibold">useCaseReview</span>
        <span className="font-mono font-semibold">useMedicationTracker</span>
      </div>
    ),
  },
];