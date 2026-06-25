'use client';
import { createRef, useEffect, useState } from "react";
import { useCategory } from "../components/reactContext/categoryProvider";
import api from "@/function/axiosConfig";
import { useDispatch } from "react-redux";
import { addNote, deleteNote, editNote } from "@/function/redux/categorySlice";
import { useAppSelector } from "@/function/redux/hook";
import { useLogin } from "../components/reactContext/LoginProvider";
import { renderContent } from "../components/childrenComponent/renderContent";
import { useSearch } from "../components/reactContext/searchProvider";


export default function Home() {

  const [isAdding, setIsAdding] = useState(false);

  const [notes, setNotes] = useState<any[]>([]);
  // const [searchNote, setSearchNote] = useState<any>(null);
  const [isEditContent, setIsEditContent] = useState<boolean>(false);
  const [content_to_edit, setContent_to_edit] = useState<any>(null);

  const keyWord_ref = createRef<HTMLTextAreaElement>()
  const content_ref = createRef<HTMLTextAreaElement>()

  const { note } = useAppSelector((state) => state.category)
  const { isLoggedIn } = useLogin()
  const { search } = useSearch()

  const {
    categoryData
  } = useCategory();

  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (note) {
  //     setNotes(note)
  //   }
  // }, [note])

  useEffect(() => {
    // console.log(note);
    // console.log(content_to_edit?.id);

    if (search) {
      const arrayDataSearch = search.trim().split(" ")
      const filterNote = note?.filter((item: any) => {
        if (arrayDataSearch.some((word: string) => item.keyWord.toLowerCase().includes(word.toLowerCase()) || item.content.toLowerCase().includes(word.toLowerCase()))) {
          return item
        }
      })
      console.log("filterNote")
      setNotes(filterNote)
    }
    // else if (content_to_edit?.id) {
    //   const filterNote = note?.filter((item: any) => item.categoryId === content_to_edit.id)
    //   setNotes(filterNote)
    //   // console.log(filterNote)
    // }
    else if (categoryData?.categoryId && categoryData.categoryId !== null) {
      const filterNote = note?.filter((item: any) => item.categoryId === categoryData?.categoryId)
      setNotes(filterNote)
      console.log("filterCategory", categoryData?.categoryId)
      // console.log(filterNote)
    }
    else {
      setNotes(note)
      console.log("noFilter")
    }
  }, [note, search, categoryData])


  async function addNewContent(e: any) {
    e.preventDefault();
    setIsAdding(false);
    const kw = keyWord_ref.current?.value;
    const content = content_ref.current?.value;

    if (kw && content) {
      if (!categoryData?.categoryId) {
        alert("No category selected");
        return;
      }
      console.log({
        keyWord: kw,
        content: content,
        categoryId: categoryData.categoryId
      });

      const res = await api.post('/note', {
        keyWord: kw,
        content: content,
        categoryId: categoryData.categoryId
      })
      if (res.status === 201) {
        dispatch(addNote(res.data))
      }
    }
  }

  async function deleteContent(id: number, name: string) {
    const confirm = window.confirm(`Are you sure you want to delete ${name}?`)
    if (!confirm) {
      return
    }
    const res = await api.delete(`/note/${id}`)
    if (res.status === 200) {
      dispatch(deleteNote({ id }))
      // setNotes((prev:any)=>prev.filter((item:any)=>item.id!==id))
    }
  }

  async function editContent() {
    if (!content_to_edit) return
    const res = await api.put(`/note`, {
      id: content_to_edit.id,
      keyWord: content_to_edit.keyWord,
      content: content_to_edit.content
    })
    if (res.status === 200) {
      dispatch(editNote(content_to_edit))
      setIsEditContent(false)
      setContent_to_edit(null)
    }
  }

  return (
    <div className="flex flex-col flex-1 p-6 lg:p-10 bg-slate-50 dark:bg-slate-950 min-h-full">
      {/* Page Header */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight text-center">You are view {categoryData?.categoryName || "all"} category</h1>
        {isLoggedIn && <span className=" w-full flex justify-center mt-2 w-8 h-4 mr-2 text-slate-400 shrink-0 justify-center">
          <button
            onClick={() => setIsAdding(prev => !prev)}
            className="flex items-center justify-center w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700"
            title="New Content"
          >
            {!isAdding ? <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
              :
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12h8" />
              </svg>}
          </button>
        </span>}
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left border-collapse overflow-hidden rounded-xl">
            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                <th className="w-60 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Keyword
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Content
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isAdding && (
                <tr className="bg-white dark:bg-slate-900">
                  <td className="px-6 py-4 align-top">
                    <textarea
                      ref={keyWord_ref}
                      placeholder="Enter keyword..."
                      className=" w-full resize-none rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
                    />
                  </td>

                  <td className="px-6 py-4 align-top">
                    <div className="flex items-start gap-3">
                      <textarea
                        ref={content_ref}
                        placeholder="Enter content..."
                        className=" flex-1 resize-y rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
                      />

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={addNewContent}
                          aria-label="Save content"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:bg-green-500 dark:hover:bg-green-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8 12.5l2.5 2.5L16 9" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}

              {notes?.length > 0 ? (
                notes?.map((item: any, index: any) => (
                  isEditContent && item.id == content_to_edit?.id ?
                    <tr className="bg-white dark:bg-slate-900 " key={item.id || index}>
                      <td className="px-6 py-4 align-top">
                        <textarea
                          value={content_to_edit?.keyWord}
                          onChange={(e: any) => setContent_to_edit({ ...content_to_edit, keyWord: e.target.value })}
                          ref={keyWord_ref}
                          placeholder="Enter keyword..."
                          className=" w-full resize-none rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
                        />
                      </td>

                      <td className="px-6 py-4 align-top">
                        <div className="flex items-start gap-3">
                          <textarea
                            value={content_to_edit?.content}
                            onChange={(e) => setContent_to_edit({ ...content_to_edit, content: e.target.value })}
                            ref={content_ref}
                            placeholder="Enter content..."
                            className=" flex-1 resize-y rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
                          />

                          <div className=" flex flex-col items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={editContent}
                              aria-label="Save content"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:bg-green-500 dark:hover:bg-green-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M8 12.5l2.5 2.5L16 9" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => { setIsEditContent(false); setContent_to_edit(null) }}
                              aria-label="cancel"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/40 dark:bg-red-500 dark:hover:bg-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>


                    :
                    <tr
                      key={item.id ?? index}
                      className=" border-b border-red-800 dark:border-indigo-400 group block  px-4 py-4 transition-colors hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 sm:table-row sm:px-0 sm:py-0"
                    >
                      <td
                        className="block pb-2 align-top sm:table-cell sm:w-48 sm:px-6 sm:py-4"
                      >
                        <span className="inline-flex  border-1 border-indigo-400 dark:border-yellow-400 rounded-lg max-w-full items-center px-3 py-1 text-sm font-semibold text-indigo-600  dark:text-yellow-600">
                          <span className="">{item.keyWord.toLocaleUpperCase()}</span>
                        </span>
                      </td>

                      <td
                        className="block align-top text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:table-cell sm:px-6 sm:py-4"
                      >


                        <div className="flex items-start gap-3">
                          <div className="flex-1 break-words">
                            {renderContent(item.content)}
                          </div>


                          {/* <p className="flex-1 whitespace-pre-wrap break-words">
                            {item.content}
                          </p>  */}

                          {isLoggedIn && (
                            <div className="ml-auto flex shrink-0 items-center gap-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                              <button
                                type="button"
                                onClick={() => { setIsEditContent(true); setContent_to_edit(item) }}
                                className="flex h-8 w-8 items-center justify-center rounded text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                                title="Edit"
                                aria-label="Edit Content"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
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
                                type="button"
                                onClick={() => { deleteContent(item.id, item.keyWord) }}
                                className="flex h-8 w-8 items-center justify-center rounded text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                                title="Delete"
                                aria-label="Delete Content"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
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
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>


                ))
              ) : (
                !isAdding && (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                    >
                      No notes yet.
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="font-bold text-slate-700 dark:text-slate-300">{note.length}</span> entries
          </p>
        </div>
      </div>
    </div >
  );
}
