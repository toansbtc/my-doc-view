"use client";

import React, { useState } from "react";

// Mock Data Structure
type FileNode = {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: FileNode[];
};

const fileTree: FileNode[] = [
  {
    id: "1",
    name: "Projects",
    type: "folder",
    children: [
      {
        id: "1-1",
        name: "Website Redesign",
        type: "folder",
        children: [
          { id: "1-1-1", name: "index.html", type: "file" },
          { id: "1-1-2", name: "styles.css", type: "file" },
          { id: "1-1-3", name: "main.js", type: "file" },
        ],
      },
      {
        id: "1-2",
        name: "Mobile App",
        type: "folder",
        children: [
          { id: "1-2-1", name: "App.tsx", type: "file" },
          { 
            id: "1-2-2", 
            name: "components", 
            type: "folder", 
            children: [
                { id: "1-2-2-1", name: "Button.tsx", type: "file" },
                { id: "1-2-2-2", name: "Header.tsx", type: "file" }
            ] 
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Documents",
    type: "folder",
    children: [
      { id: "2-1", name: "Invoice-Q1.pdf", type: "file" },
      { id: "2-2", name: "Q1-Report.docx", type: "file" },
    ],
  },
  {
    id: "3",
    name: "System",
    type: "folder",
    children: [
        { id: "3-1", name: "config.json", type: "file" },
        { id: "3-2", name: "env.local", type: "file" }
    ]
  },
  {
    id: "4",
    name: "README.md",
    type: "file",
  },
];

// Icons
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const FolderIcon = ({ className, open }: { className?: string; open?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={open ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </svg>
);

const FileIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

// Tree Node Component
const TreeNode = ({ node, level = 0 }: { node: FileNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(level === 0 || node.id === "1-1");
  const isFolder = node.type === "folder";

  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex items-center group cursor-pointer py-1.5 px-3 mx-2 my-0.5 rounded-md transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
          ${isFolder 
            ? "hover:bg-indigo-50/60 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300" 
            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"}
        `}
        style={{ paddingLeft: `${Math.max(0, level * 12 + 8)}px` }}
        onClick={() => isFolder && setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (isFolder) setIsOpen(!isOpen);
                e.preventDefault();
            }
        }}
      >
        <div className="w-5 h-5 flex items-center justify-center mr-1 shrink-0">
          {isFolder && (
            <ChevronRightIcon
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-90 text-indigo-500" : ""}`}
            />
          )}
        </div>
        
        <div className="shrink-0">
            {isFolder ? (
            <FolderIcon open={isOpen} className={`w-4 h-4 mr-2 transition-colors duration-200 ${isOpen ? 'text-indigo-500' : 'text-slate-400 group-hover:text-indigo-400'}`} />
            ) : (
            <FileIcon className="w-4 h-4 mr-2 text-slate-400 group-hover:text-slate-500 transition-colors" />
            )}
        </div>
        
        <span className="text-[13px] font-medium tracking-tight truncate select-none">{node.name}</span>
      </div>

      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            {isFolder && node.children && (
                <div className="flex flex-col relative w-full pt-1">
                {/* Visual guideline for depth */}
                {level >= 0 && (
                  <div 
                    className="absolute top-0 bottom-0 w-[1px] bg-slate-200/80 dark:bg-slate-800" 
                    style={{ left: `${level * 12 + 25}px` }} 
                  />
                )}
                {node.children.map((child) => (
                    <TreeNode key={child.id} node={child} level={level + 1} />
                ))}
                </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default function SideBar() {
  return (
    <aside className="w-64 lg:w-72 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl h-full flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)] z-10 transition-all duration-300">
      <div className="h-14 flex items-center px-5 border-b border-slate-200 dark:border-slate-800/80">
        <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
        <h2 className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">Explorer</h2>
      </div>
      <div className="flex-1 overflow-y-auto py-3 custom-scrollbar">
        {fileTree.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
        }
      `}} />
    </aside>
  );
}
