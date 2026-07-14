// "use client";

// import { useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { registry, ComponentEntry } from "@/preview/registry";

// function groupByCategory(entries: ComponentEntry[]) {
//   return entries.reduce<Record<string, ComponentEntry[]>>((acc, entry) => {
//     if (!acc[entry.category]) acc[entry.category] = [];
//     acc[entry.category].push(entry);
//     return acc;
//   }, {});
// }

// export default function NavigationMenuPreviewPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [search, setSearch] = useState("");

//   const componentId = searchParams.get("component");
//   const active = registry.find((entry) => entry.id === componentId) ?? registry[0];
//   const activeId = active?.id ?? "";

//   function handleSelect(id: string) {
//     router.push(`/dev/sandbox?component=${id}`);
//   }

//   const filtered = useMemo(() => {
//     if (!search.trim()) return registry;

//     return registry.filter(
//       (entry) =>
//         entry.name.toLowerCase().includes(search.toLowerCase()) ||
//         entry.category.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search]);

//   const groups = groupByCategory(filtered);

//   return (
//     <div className="flex min-h-[calc(100vh-7rem)] overflow-hidden rounded-md border border-border bg-canvas text-fg">
//       <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface">
//         <div className="border-b border-border px-4 py-4">
//           <p className="mb-0.5 text-xs font-medium uppercase tracking-widest text-fg-muted">
//             UI Library
//           </p>
//           <p className="text-sm font-medium text-fg">Sandbox</p>
//         </div>

//         <div className="border-b border-border px-3 py-3">
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search..."
//             className="w-full rounded-md border border-border bg-canvas px-3 py-1.5 text-xs text-fg outline-none placeholder:text-fg-subtle focus-ring-visible"
//           />
//         </div>

//         <div className="flex-1 overflow-y-auto py-2">
//           {Object.keys(groups).length === 0 ? (
//             <p className="px-4 py-3 text-xs text-fg-muted">No results</p>
//           ) : (
//             Object.entries(groups).map(([category, entries]) => (
//               <div key={category} className="mb-1">
//                 <p className="px-4 py-1.5 text-[10px] font-medium uppercase tracking-widest text-fg-muted">
//                   {category}
//                 </p>

//                 {entries.map((entry) => (
//                   <button
//                     key={entry.id}
//                     onClick={() => handleSelect(entry.id)}
//                     className={[
//                       "w-full px-4 py-2 text-left text-sm transition-colors focus-ring-visible",
//                       activeId === entry.id
//                         ? "bg-primary/10 font-medium text-primary"
//                         : "text-fg-muted hover:bg-subtle hover:text-fg",
//                     ].join(" ")}
//                   >
//                     {entry.name}
//                   </button>
//                 ))}
//               </div>
//             ))
//           )}
//         </div>
//       </aside>

//       <main className="flex flex-1 flex-col overflow-hidden">
//         <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-surface px-6">
//           {active && (
//             <>
//               <span className="text-xs text-fg-muted">{active.category}</span>
//               <span className="text-xs text-fg-muted">/</span>
//               <span className="text-sm font-medium text-fg">{active.name}</span>
//             </>
//           )}
//         </header>

//         <div className="flex-1 overflow-auto p-10">
//           {active ? (
//             <div className="w-full">{active.preview}</div>
//           ) : (
//             <div className="text-sm text-fg-muted">
//               Select a component from the sidebar.
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }