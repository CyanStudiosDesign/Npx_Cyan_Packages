# Timeline

A reusable Timeline component built with React, TypeScript, and Tailwind CSS.

---

## File Structure

```txt
timeline/
├── Timeline.tsx
├── TimelineItem.tsx
├── TimelineDemo.tsx
└── README.md
```

---

## Installation

Copy the `timeline` folder into your project.

```txt
src/
└── components/
    └── ui/
        └── timeline/
            ├── Timeline.tsx
            ├── TimelineItem.tsx
            ├── TimelineDemo.tsx
            └── README.md
```

---

## Basic Usage

```tsx
"use client";

import Timeline from "@/components/ui/timeline/Timeline";
import TimelineItem from "@/components/ui/timeline/TimelineItem";

export default function Page() {
  return (
    <Timeline>
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
```

---

## Props

### Timeline

| Prop     | Type            |
| -------- | --------------- |
| children | React.ReactNode |

### TimelineItem

| Prop        | Type   |
| ----------- | ------ |
| title       | string |
| date        | string |
| description | string |

---

## Example

```tsx
"use client";

import Timeline from "@/components/ui/timeline/Timeline";
import TimelineItem from "@/components/ui/timeline/TimelineItem";

export default function Example() {
  return (
    <Timeline>
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

      <TimelineItem
        title="Completed Project"
        date="Mar 2025"
        description="Launched the final version"
      />
    </Timeline>
  );
}
```

---

## Registry Example

```tsx
{
  id: "timeline",
  name: "Timeline",
  category: "UI",
  preview: (
    <Timeline>
      <TimelineItem
        title="Started Internship"
        date="Jan 2025"
        description="Joined company"
      />
    </Timeline>
  ),
}
```
