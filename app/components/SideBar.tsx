"use client";

import api from "@/function/axiosConfig";
import { myUrl } from "@/function/myUrl";
import { addCategory, addFolder, getAllNote, getDataCategory } from "@/function/redux/categorySlice";
import { useAppDispatch, useAppSelector } from "@/function/redux/hook";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TreeNode from "./childrenComponent/folderChildrent";
import { useLogin } from "./reactContext/LoginProvider";



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


export default function SideBar() {

  const [treeData, setTreeData] = useState<any>([]);
  const [isAddingRoot, setIsAddingRoot] = useState(false);
  const [newRootName, setNewRootName] = useState("");
  const rootInputRef = React.useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { folder, note } = useAppSelector((state) => state.category);
  const { isLoggedIn } = useLogin()

  useEffect(() => {
    dispatch(getDataCategory());
    dispatch(getAllNote());
  }, [])

  useEffect(() => {
    setTreeData(folder)
  }, [folder])


  const handleAddNode = async (parentId: string, name: string) => {


    const response = await api.post(`/folder/createFolder`, { folderName: name });


    if (response.status === 201) {
      console.log(`folder create with data: ${response.data}`);

      dispatch(addFolder({ folderId: response.data.folderId, folderName: response.data.folderName, category: [] }));
      setTreeData(folder);
    }

  };

  const handleRootSubmit = () => {
    if (newRootName.trim()) {
      handleAddNode('root', newRootName.trim());
    }
    setIsAddingRoot(false);
    setNewRootName("");
  };

  function createNewRoot(): void {
    setIsAddingRoot(true);
    setTimeout(() => rootInputRef.current?.focus(), 10);
  }

  const actionButtonGroupClass =
    "opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center gap-0.5 transition-opacity";

  return (
    <aside className="w-64 lg:w-72 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl h-full flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)] z-10 transition-all duration-300">
      <div className="h-14 flex items-center px-5 border-b border-slate-200 dark:border-slate-800/80 group">
        <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>

        <h2 className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase flex-1">
          Explorer
        </h2>

        <div className={actionButtonGroupClass}>
          {isLoggedIn && (
            <button
              onClick={createNewRoot}
              className="flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700"
              title="New Folder"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                <line x1="12" y1="10" x2="12" y2="16" />
                <line x1="9" y1="13" x2="15" y2="13" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-3 custom-scrollbar">
        {isAddingRoot && (
          <div
            className="flex items-center py-1.5 px-3 mx-2 my-0.5"
            style={{ paddingLeft: "8px" }}
          >
            <div className="w-5 h-5 flex items-center justify-center mr-1 shrink-0" />

            <FolderIcon className="w-4 h-4 mr-2 text-indigo-500 shrink-0" />

            <input
              ref={rootInputRef}
              type="text"
              value={newRootName}
              onChange={(e) => setNewRootName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRootSubmit();

                if (e.key === "Escape") {
                  setIsAddingRoot(false);
                  setNewRootName("");
                }
              }}
              onBlur={handleRootSubmit}
              className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
              placeholder="Category name..."
            />
          </div>
        )}

        {treeData?.map((folder: any) => (
          <TreeNode key={folder.folderId} node={folder} />
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
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
        `,
        }}
      />
    </aside>
  );
}