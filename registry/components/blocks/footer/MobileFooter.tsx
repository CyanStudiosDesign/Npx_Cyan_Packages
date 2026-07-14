"use client";

import { Poppins, Noto_Serif_Georgian } from "next/font/google";
import {
  footerData,
  studioCard,
  legalLinks,
  iconsLink,
  copyrightText,
} from "./data/data";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordian";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const notoSerifGeorgian = Noto_Serif_Georgian({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const MobileFooter = () => {
  return (
    <footer
      className={`${poppins.className} md:hidden block w-full bg-black px-6 min-h-screen py-12`}
    >
      {/* Accordion sections */}
      <Accordion className="flex flex-col">
        {footerData.map((column) => (
          <AccordionItem
            key={column.heading}
            value={column.heading}
            className="border-b border-zinc-800"
          >
            <AccordionTrigger className="w-full flex justify-between items-center py-5 text-white text-lg">
              <span>{column.heading}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 pb-5 text-white">
                {column.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    className="hover:underline cursor-pointer"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Social media  */}
      <div className="flex gap-3 items-center justify-center my-10">
        <a href={iconsLink.facebook} target="_blank" rel="noopener noreferrer">
          <span className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white transition cursor-pointer pr-1 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 120 160"
              className="h-5 w-5 text-white group-hover:text-zinc-800 transition"
            >
              <path
                fill="currentColor"
                d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
              />
            </svg>
          </span>
        </a>

        <a href={iconsLink.X} target="_blank" rel="noopener noreferrer">
          <span className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center cursor-pointer group hover:bg-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="h-5 w-5 text-white group-hover:text-zinc-800 transition"
            >
              <path
                fill="currentColor"
                d="M11.905 8.47 19.35 0h-1.764L11.12 7.353 5.956 0H0l7.809 11.12L0 20h1.764l6.827-7.766L14.044 20H20M2.4 1.302h2.71l12.476 17.46h-2.71"
              />
            </svg>
          </span>
        </a>

        <a href={iconsLink.instagram} target="_blank" rel="noopener noreferrer">
          <span className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center cursor-pointer group hover:bg-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white group-hover:text-zinc-800 transition"
            >
              <path
                fill="currentColor"
                d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88"
              />
            </svg>
          </span>
        </a>

        <a href={iconsLink.tiktok} target="_blank" rel="noopener noreferrer">
          <span className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center group cursor-pointer hover:bg-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white group-hover:text-zinc-800 transition"
            >
              <path
                fill="currentColor"
                d="M20.112 10.092a5.339 5.339 0 0 1-4.959-2.39v8.222a6.076 6.076 0 1 1-6.077-6.077c.127 0 .251.012.376.02v2.994c-.125-.015-.247-.038-.376-.038a3.101 3.101 0 0 0 0 6.203c1.713 0 3.226-1.35 3.226-3.063L12.332 2h2.865a5.336 5.336 0 0 0 4.918 4.764v3.328"
              />
            </svg>
          </span>
        </a>
      </div>

      {/* Cyan Studios card */}
      <a
        href={studioCard.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-10"
      >
        <div className="group bg-zinc-900 rounded-3xl px-4 py-4 w-full flex items-center justify-between hover:bg-white transition cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden">
              <Image
                src={studioCard.image}
                alt={studioCard.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3
                className={`${notoSerifGeorgian.className} text-white text-2xl font-bold leading-none group-hover:text-zinc-800 transition`}
              >
                {studioCard.name}
              </h3>
              <p className="text-zinc-500 text-xs mt-1 group-hover:text-zinc-400 transition">
                {studioCard.description}
              </p>
            </div>
          </div>
          <div className="text-white group-hover:text-zinc-900 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 19 22"
              className="w-6 h-6"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M18 14v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m11 13 6.5-6.5"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.5 6H18v4.5"
              />
            </svg>
          </div>
        </div>
      </a>

      {/* Legal section */}
      <div className="flex flex-wrap gap-4   text-white text-sm mb-8">
        {legalLinks.map((privacy) => (
          <a
            key={privacy.title}
            href={privacy.link}
            className="hover:underline cursor-pointer"
          >
            {privacy.title}
          </a>
        ))}
      </div>
      <p className="text-zinc-400 text-xs">{copyrightText}</p>
    </footer>
  );
};

export default MobileFooter;
