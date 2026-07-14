interface TimelineItemProps {
  title: string;
  date: string;
  description: string;
}

export default function TimelineItem({
  title,
  date,
  description,
}: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      {/* Visual Indicator Layer */}
      <div className="flex flex-col items-center">
        <div className="h-4 w-4 rounded-full bg-fg" />
        <div className="w-px flex-1 bg-border" />
      </div>

      {/* Content Layer */}
      <div className="pb-8">
        <h3 className="font-semibold text-fg leading-snug">{title}</h3>
        <p className="text-sm text-fg-muted">{date}</p>

        <p className="mt-2 text-sm font-normal text-fg">{description}</p>
      </div>
    </div>
  );
}
