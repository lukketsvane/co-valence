"use client";
import { motion } from 'framer-motion';
import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

export default function Home() {
  const { data, error } = useSWR("https://api.github.com/repos/lukketsvane/co-valence", fetcher);
  const stars = data ? data.stargazers_count : 0;


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="dark:bg-gray-900"
    >
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-300 to-blue-500 bg-clip-text text-center font-display text-4xl font-bold text-transparent md:text-7xl"
        >
          co:valence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-gray-500 md:text-xl dark:text-gray-300"
        >
          A modern toolkit for psychological health professionals.
        </motion.p>
        {/* Additional content and components */}
      </div>
      <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {/* Map over the features to create cards for each one */}
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={demo}
            large={large}
          />
        ))}
      </div>
    </motion.div>
  );
}

const features = [
  {
    title: "Interactive Chatbot",
    description: "Engage with patients using a smart AI-driven chatbot that helps in preliminary diagnosis and common inquiries.",
    demo: <ComponentGrid />, // Replace with the actual component that demonstrates the chatbot feature.
    large: true,
  },
  {
    title: "Patient Journaling System",
    description: "Maintain patient records with ease using a secure and intuitive journaling system, accessible from anywhere.",
    demo: <Image src="/journal-demo.png" alt="Journal Demo" width={300} height={200} />, // Replace with the actual image or component.
  },
  {
    title: "Data-Driven Insights",
    description: "Gain valuable insights into patient trends with data analytics tools, helping you make informed decisions.",
    demo: <Image src="/data-insights-demo.png" alt="Data Insights Demo" width={300} height={200} />, // Replace with the actual image or component.
  },
  {
    title: "Appointment Scheduling",
    description: "Streamline your appointment booking process with an integrated scheduling tool that syncs with your calendar.",
    demo: <Image src="/scheduling-demo.png" alt="Scheduling Demo" width={300} height={200} />, // Replace with the actual image or component.
  },
  {
    title: "Resource Library",
    description: "Access a wealth of mental health resources, articles, and research papers to support your practice.",
    demo: <Image src="/resources-demo.png" alt="Resources Demo" width={300} height={200} />, // Replace with the actual image or component.
  },
  {
    title: "Telehealth Ready",
    description: "Conduct remote consultations with a built-in telehealth feature that offers both video and messaging capabilities.",
    demo: <Image src="/telehealth-demo.png" alt="Telehealth Demo" width={300} height={200} />, // Replace with the actual image or component.
  }
];