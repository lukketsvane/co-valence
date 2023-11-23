"use client";
import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/steven-tey/precedent", {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          co:valence
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          A modern toolkit for psychological health professionals.
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
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
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
    description: "Engage with patients using a smart AI-driven chatbot that helps in preliminary diagnosis and common inquiries.",
    demo: <ComponentGrid />, 
    large: true,
  },
  {
    title: "Patient Journaling System",
    description: "Maintain patient records with ease using a secure and intuitive journaling system, accessible from anywhere.",
    demo: <Image src="/logo.png" alt="Journal Demo" width={300} height={200} />, // Make sure this file exists in the `public` folder.
  },
  {
    title: "Data-Driven Insights",
    description: "Gain valuable insights into patient trends with data analytics tools, helping you make informed decisions.",
    demo: <Image src="/logo.png" alt="Data Insights Demo" width={300} height={200} />, // Replace with the actual image or component.
  },
  {
    title: "Appointment Scheduling",
    description: "Streamline your appointment booking process with an integrated scheduling tool that syncs with your calendar.",
    demo: <Image src="/logo.png" alt="Scheduling Demo" width={300} height={200} />, // Replace with the actual image or component.
  },
  {
    title: "Resource Library",
    description: "Access a wealth of mental health resources, articles, and research papers to support your practice.",
    demo: <Image src="/logo.png" alt="Resources Demo" width={300} height={200} />, // Replace with the actual image or component.
  },
  {
    title: "Telehealth Ready",
    description: "Conduct remote consultations with a built-in telehealth feature that offers both video and messaging capabilities.",
    demo: <Image src="/logo.png" alt="Telehealth Demo" width={300} height={200} />, // Replace with the actual image or component.
  }
];