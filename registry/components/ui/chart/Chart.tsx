"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// --- 1. TYPES & CONTEXT ---
interface DataPoint {
  label: string;
  [key: string]: any;
}

interface ChartContextType {
  data: DataPoint[];
  height: number;
  svgWidth: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  chartWidth: number;
  chartHeight: number;
  maxVal: number;
  groupWidth: number;
  groupInnerPoints: Array<{ groupX: number; label: string; raw: DataPoint }>;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
  registeredKeys: string[];
}

const ChartContext = React.createContext<ChartContextType | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("Chart sub-components must be wrapped in a <ChartContainer />");
  }
  return context;
}

// --- 2. CHART CONTAINER ---
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DataPoint[];
  height?: number;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ data = [], height = 300, className, children, ...props }, ref) => {
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const registeredKeys = React.useMemo(() => {
    const keys: string[] = [];
    
    const parseChildren = (nodes: React.ReactNode) => {
      React.Children.forEach(nodes, (child) => {
        if (!React.isValidElement(child)) return;
        
        const element = child as React.ReactElement<{ dataKey?: string; children?: React.ReactNode }>;
        const componentName = (element.type as any)?.displayName || (element.type as any)?.name;
        
        if (componentName === "Bar" && element.props.dataKey) {
          keys.push(element.props.dataKey);
        }
        
        if (element.props.children) {
          parseChildren(element.props.children);
        }
      });
    };
    
    parseChildren(children);
    return Array.from(new Set(keys));
  }, [children]);

  const paddingLeft = 40;
  const paddingRight = 10; 
  const paddingTop = 20;
  const paddingBottom = 30;

  const svgWidth = 600;
  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = React.useMemo(() => {
    if (data.length === 0) return 1;
    return Math.max(
      ...data.map((d) => {
        const values = registeredKeys.map((k) => Number(d[k] || 0));
        return values.length > 0 ? Math.max(...values, 1) : 1;
      }),
      1,
    );
  }, [data, registeredKeys]);

  const totalGroups = data.length || 1;
  const groupWidth = chartWidth / totalGroups;

  const groupInnerPoints = React.useMemo(() => {
    return data.map((d, index) => {
      const groupX = paddingLeft + index * groupWidth;
      return { groupX, label: d.label, raw: d };
    });
  }, [data, paddingLeft, groupWidth]);

  return (
    <ChartContext.Provider
      value={{
        data,
        height,
        svgWidth,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        chartWidth,
        chartHeight,
        maxVal,
        groupWidth,
        groupInnerPoints,
        activeId,
        setActiveId,
        registeredKeys,
      }}
    >
      <div
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-border bg-surface text-fg p-4 shadow-sm select-none relative",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

// --- 3. BASE SVG GRID LAYOUT ---
interface SvgLayoutProps {
  children: React.ReactNode;
}

const SvgLayout = ({ children }: SvgLayoutProps) => {
  const {
    svgWidth,
    height,
    paddingLeft,
    paddingRight,
    paddingTop,
    chartHeight,
    maxVal,
    groupInnerPoints,
    groupWidth,
    setActiveId,
  } = useChart();

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${height}`}
      className="w-full h-auto overflow-visible relative"
    >
      {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, i) => {
        const yPos = paddingTop + chartHeight * ratio;
        const gridValue = Math.round(maxVal * (1 - ratio));
        return (
          <g key={i} className="text-border pointer-events-none">
            <line
              x1={paddingLeft}
              y1={yPos}
              x2={svgWidth - paddingRight}
              y2={yPos}
              className="stroke-current stroke-[1px]"
              strokeDasharray="5 5"
            />
            <text
              x={paddingLeft - 12}
              y={yPos + 4}
              textAnchor="end"
              className="text-[11px] font-semibold fill-fg-subtle font-mono"
            >
              {gridValue}
            </text>
          </g>
        );
      })}

      {children}

      {groupInnerPoints.map((g, i) => (
        <rect
          key={`hitbox-${i}`}
          x={g.groupX}
          y={paddingTop}
          width={groupWidth}
          height={chartHeight}
          fill="transparent"
          className="cursor-pointer"
          onMouseEnter={() => setActiveId(i)}
          onMouseLeave={() => setActiveId(null)}
        />
      ))}
    </svg>
  );
};

// --- 4. STANDALONE CUSTOM TOOLTIP COMPONENT ---
interface ChartTooltipProps {
  enabled?: boolean;
  position?: "top" | "bottom" | "left" | "right";
}

export const ChartTooltip = ({ enabled = true, position = "top" }: ChartTooltipProps) => {
  const {
    groupInnerPoints,
    height,
    groupWidth,
    activeId,
    paddingTop,
    chartHeight,
    registeredKeys,
    maxVal,
  } = useChart();

  if (!enabled || activeId === null) return null;

  const activeGroup = groupInnerPoints[activeId];

  const maxGroupVal = Math.max(
    ...registeredKeys.map((k) => Number(activeGroup.raw[k] || 0)),
    0,
  );
  const highestBarHeight = (maxGroupVal / maxVal) * chartHeight;

  const midX = activeGroup.groupX + groupWidth / 2;
  const topY = paddingTop + chartHeight - highestBarHeight;
  const midY = topY + highestBarHeight / 2;

  const placement: Record<string, { inline: React.CSSProperties; card: string; arrow: string }> = {
    top: {
      inline: { left: `${(midX / 600) * 100}%`, top: `${(topY / height) * 100}%` },
      card: "-translate-x-1/2 -translate-y-full mb-4",
      arrow: "border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-inverse bottom-0 left-1/2 -translate-x-1/2 translate-y-full",
    },
    bottom: {
      inline: { left: `${(midX / 600) * 100}%`, top: `${((paddingTop + chartHeight) / height) * 100}%` },
      card: "-translate-x-1/2 mt-2",
      arrow: "border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[5px] border-b-inverse top-0 left-1/2 -translate-x-1/2 -translate-y-full",
    },
    left: {
      inline: { left: `${(activeGroup.groupX / 600) * 100}%`, top: `${(midY / height) * 100}%` },
      card: "-translate-x-full -translate-y-1/2 mr-2",
      arrow: "border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-inverse right-0 top-1/2 -translate-y-1/2 translate-x-full",
    },
    right: {
      inline: { left: `${((activeGroup.groupX + groupWidth) / 600) * 100}%`, top: `${(midY / height) * 100}%` },
      card: "-translate-y-1/2 ml-2",
      arrow: "border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-inverse left-0 top-1/2 -translate-y-1/2 -translate-x-full",
    },
  };

  const currentPlacement = placement[position] || placement.top;

  return (
    <div
      className={cn("absolute pointer-events-none z-[var(--z-popover)] transition-all duration-150 ease-out", currentPlacement.card)}
      style={currentPlacement.inline}
    >
      <div className="bg-inverse text-fg-inverse rounded-md p-2.5 shadow-lg min-w-[140px] flex flex-col gap-1.5 backdrop-blur-sm bg-opacity-95 border-0 relative">
        <div className="text-[11px] font-bold tracking-wider uppercase text-fg-subtle border-b border-border pb-1">
          {activeGroup.label}
        </div>
        <div className="flex flex-col gap-1">
          {registeredKeys.map((key) => {
            const value = activeGroup.raw[key] ?? 0;
            return (
              <div key={key} className="flex items-center justify-between gap-4 text-xs">
                <span className="text-fg-subtle capitalize font-medium">{key}:</span>
                <span className="font-mono font-bold text-fg-inverse">{value.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
        <div className={cn("absolute w-0 h-0 pointer-events-none", currentPlacement.arrow)} />
      </div>
    </div>
  );
};
ChartTooltip.displayName = "ChartTooltip";

// --- 5. BAR CHART VARIANT WRAPPER ---
export const BarChart = ({ children }: { children: React.ReactNode }) => {
  const { groupInnerPoints, height, paddingBottom, groupWidth, activeId } = useChart();

  const regularChildren: React.ReactNode[] = [];
  const tooltipChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const componentName = (child.type as any)?.displayName || (child.type as any)?.name;
      if (componentName === "ChartTooltip") {
        tooltipChildren.push(child);
      } else {
        regularChildren.push(child);
      }
    }
  });

  return (
    <div className="relative w-full">
      {tooltipChildren}

      <SvgLayout>
        {regularChildren}
        
        {/* --- CENTERED X-AXIS LABELS --- */}
        {groupInnerPoints.map((g, i) => {
          const isActive = activeId === i;
          return (
            <text
              key={i}
              x={g.groupX + groupWidth / 2}
              y={height - paddingBottom + 22}
              textAnchor="middle"
              className={cn(
                "text-[11px] font-medium transition-colors duration-200",
                isActive ? "fill-fg font-semibold" : "fill-fg-muted",
              )}
            >
              {g.label}
            </text>
          );
        })}
      </SvgLayout>
    </div>
  );
};
BarChart.displayName = "BarChart";

// --- 6. DATA RENDERING BAR COMPONENT ---
interface BarProps {
  dataKey: string;
  color?: string;
  className?: string;
}

export const Bar = ({ dataKey, color = "fill-primary", className }: BarProps) => {
  const {
    groupInnerPoints,
    groupWidth,
    chartHeight,
    maxVal,
    paddingTop,
    registeredKeys,
    activeId,
  } = useChart();

  const keyIndex = registeredKeys.indexOf(dataKey);
  if (keyIndex === -1) return null;

  const totalBars = registeredKeys.length || 1;
  const groupPaddingPercent = 0.16; 
  const usableWidth = groupWidth * (1 - groupPaddingPercent);
  const startOffset = (groupWidth * groupPaddingPercent) / 2;

  const barWidth = (usableWidth / totalBars) * 0.92;
  const barInnerSpacing = (usableWidth / totalBars) * 0.08;

  return (
    <g className="pointer-events-none">
      {groupInnerPoints.map((g, i) => {
        const rawValue = g.raw[dataKey] ?? 0;
        const barHeight = (rawValue / maxVal) * chartHeight;
        const yPos = paddingTop + chartHeight - barHeight;

        const xPos =
          g.groupX +
          startOffset +
          keyIndex * (usableWidth / totalBars) +
          barInnerSpacing / 2;
        const isGroupActive = activeId === i;

        return (
          <rect
            key={i}
            x={xPos}
            y={yPos}
            rx={4}
            width={barWidth}
            height={Math.max(barHeight, 2)}
            className={cn(
              "transition-all duration-200 origin-bottom rounded-md", 
              color,
              isGroupActive ? "opacity-100 brightness-95" : "opacity-85",
              className,
            )}
          />
        );
      })}
    </g>
  );
};
Bar.displayName = "Bar";