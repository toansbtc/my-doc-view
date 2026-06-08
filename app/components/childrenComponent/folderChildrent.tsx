import React, { useState } from "react";
import api from "@/function/axiosConfig";
import { useAppDispatch } from "@/function/redux/hook";
import { addCategory, deleteCategory, editCategory } from "@/function/redux/categorySlice";
import { useLogin } from "../reactContext/LoginProvider";
import { useTheme } from "../reactContext/ThemeProvider";
import { useCategory } from "../reactContext/categoryProvider";

type Category = {
    categoryId: number;
    categoryName: string;
};

type FolderNode = {
    folderId: number;
    folderName: string;
    category: Category[];
};

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

const TreeNode = ({
    node,
    level = 0,
}: {
    node: FolderNode;
    level?: number;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState("");
    const [editName, setEditName] = useState<string | null>(null);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useLogin()
    const { theme } = useTheme();
    const { setCategoryData, categoryData } = useCategory();

    function createNewCategory(e: React.MouseEvent): void {
        e.stopPropagation();
        setIsOpen(true);
        setIsAdding(true);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 10);
    }

    const handleAddSubmit = async () => {
        const categoryName = newName.trim();

        if (!categoryName) {
            setIsAdding(false);
            setNewName("");
            return;
        }

        try {
            console.log({
                categoryName,
                folderId: node.folderId,
            });

            const response = await api.post("/category/create", {
                categoryName,
                folderId: node.folderId,
            });

            dispatch(
                addCategory({
                    folderId: node.folderId,
                    category: response.data,
                })
            );
        } catch (error) {
            console.log(error);
        }

        setIsAdding(false);
        setNewName("");
    };

    const actionButtonGroupClass =
        "opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center gap-0.5 transition-opacity";

    const deleteFolder = async (folderId: number) => {
        try {
            const response = await api.delete(`/folder/${folderId}`);
            if (response.status === 200) {

            }
        } catch (error) {
            console.log(error);
        }
    }

    async function renameCategory(categoryId: any): Promise<void> {
        try {
            const response = await api.put(`/category/${categoryId}`, { categoryName: editName });
            if (response.status === 200) {
                dispatch(editCategory({
                    folderId: node.folderId,
                    category: response.data,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCategory1(categoryId: any, categoryName: any): Promise<void> {
        try {
            const confirmDelete = confirm(`Are you sure you want to delete ${categoryName} ?`);
            if (!confirmDelete) {
                return;
            }
            const response = await api.delete(`/category/${categoryId}`);
            if (response.status === 200) {
                dispatch(deleteCategory({
                    folderId: node.folderId,
                    categoryId: categoryId,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div
                className="flex items-center group cursor-pointer py-1.5 px-3 mx-2 my-0.5 rounded-md transition-all duration-200 ease-out hover:bg-indigo-50/60 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300"
                style={{ paddingLeft: `${Math.max(0, level * 12 + 8)}px` }}
                onClick={() => setIsOpen(prev => !prev)}
                tabIndex={0}
                role="button"
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                        setIsOpen(prev => !prev);
                        e.preventDefault();
                    }
                }}
            >
                <div className="w-5 h-5 flex items-center justify-center mr-1 shrink-0">
                    <span
                        className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-90 text-indigo-500" : ""
                            }`}
                    >
                        <ChevronRightIcon className="w-4 h-4 mr-2 text-indigo-500 shrink-0" />
                    </span>
                </div>

                <div className="shrink-0 mr-2">
                    <span className={isOpen ? "text-indigo-500" : "text-slate-400"}>
                        {isOpen ? "📂" : "📁"}
                    </span>
                </div>

                <span className="text-[13px] font-medium tracking-tight truncate select-none flex-1">
                    {node.folderName}
                </span>

                {isLoggedIn && <div className={actionButtonGroupClass}>
                    <button
                        onClick={createNewCategory}
                        className="flex items-center justify-center w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                        title="New Category"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" /><line x1="12" y1="10" x2="12" y2="16" /><line x1="9" y1="13" x2="15" y2="13" /></svg>
                    </button>
                    <button
                        onClick={() => { }}
                        className="flex items-center justify-center w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                        title="Rename Folder"
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
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>

                    </button>
                    <button
                        onClick={() => deleteFolder(node.folderId)}
                        className="flex items-center justify-center w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                        title="Delete Folder"
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
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                        </svg>

                    </button>
                </div>}
            </div>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col relative w-full pt-1">
                        {(node.category.length > 0 || isAdding) && (
                            <div
                                className="absolute top-0 bottom-0 w-[1px] bg-slate-200/80 dark:bg-slate-800"
                                style={{ left: `${level * 12 + 25}px` }}
                            />
                        )}

                        {node.category.map((category: any) => (
                            <div onClick={() => setCategoryData(category)}
                                key={category.categoryId}
                                className={`group flex items-center py-1.5 px-3 mx-2 my-0.5 rounded-md cursor-pointer  text-slate-600 dark:text-slate-400 ${categoryData?.categoryId === category.categoryId ? "bg-slate-200 dark:bg-slate-800" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                                style={{ paddingLeft: `${(level + 1) * 12 + 8}px` }}
                            >
                                <div className="w-5 h-5 flex items-center justify-center mr-1 shrink-0" />

                                <span className="w-4 h-4 mr-2 text-slate-400 shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(theme === 'dark') ? "#572323ff" : "#116cb2ff"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                                    </svg>
                                </span>

                                <span className="text-[13px] font-medium tracking-tight truncate select-none flex-1">
                                    {category.categoryName}
                                </span>

                                {isLoggedIn &&
                                    <div className={actionButtonGroupClass}>
                                        {/* <button
                                            onClick={createNewCategory}
                                            className="flex items-center justify-center w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                                            title="New Category"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" /><line x1="12" y1="10" x2="12" y2="16" /><line x1="9" y1="13" x2="15" y2="13" /></svg>
                                        </button> */}
                                        <button
                                            onClick={() => renameCategory(category.categoryId)}
                                            className="flex items-center justify-center w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                                            title="Rename Category"
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
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                            </svg>

                                        </button>
                                        <button
                                            onClick={() => deleteCategory1(category.categoryId, category.categoryName)}
                                            className="flex items-center justify-center w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                                            title="Delete Category"
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
                                                <path d="M3 6h18" />
                                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                <path d="M10 11v6" />
                                                <path d="M14 11v6" />
                                            </svg>

                                        </button>
                                    </div>}
                            </div>
                        ))}

                        {isAdding && (
                            <div
                                className="flex items-center py-1.5 px-3 mx-2 my-0.5 rounded-md"
                                style={{ paddingLeft: `${(level + 1) * 12 + 8}px` }}
                            >
                                <div className="w-5 h-5 flex items-center justify-center mr-1 shrink-0" />

                                <span className="w-4 h-4 mr-2 text-indigo-500 shrink-0">
                                    📄
                                </span>

                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") handleAddSubmit();

                                        if (e.key === "Escape") {
                                            setIsAdding(false);
                                            setNewName("");
                                        }
                                    }}
                                    onBlur={handleAddSubmit}
                                    className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
                                    placeholder="Category name..."
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreeNode;