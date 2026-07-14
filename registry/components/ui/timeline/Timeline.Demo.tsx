"use client";

import Timeline from "./Timeline";
import TimelineItem from "./TimelineItem";



export default function TimelineDemo() {
  

  return (
    <Timeline >
  <TimelineItem
    title="Started Internship"
    date="Jan 2025"
    description="Joined company"
  />
  

  <TimelineItem
    title="Built Tabs"
    date="Feb 2025"
    description="Reusable tabs component"
  />
</Timeline>
  );
}