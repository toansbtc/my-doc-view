import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../axiosConfig";

export type Category = {
    categoryId: number;
    categoryName: string;
};

export type Folder = {
    folderId: number;
    folderName: string;
    category: Category[];
};

export type Note = {
    id: number;
    keyWord: string;
    content: string;
    categoryId: number;
};

export type CategoryState = {
    folder: Folder[];
    note: Note[];
};

const initialState: CategoryState = {
    folder: [],
    note: [],
};

export const getDataCategory = createAsyncThunk<CategoryState>(
    "category/getDataCategory",
    async () => {
        const response = await api.get("/folder/getAllCategories");
        return response.data;
    }
);

export const getAllNote = createAsyncThunk<Note[]>(
    "category/getAllNote",
    async () => {
        const response = await api.get("/note");
        return response.data;
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategoryData: (state, action) => {

            return { ...state, folder: action.payload };
        },

        addFolder: (state, action: PayloadAction<Folder>) => {
            state.folder = [...state.folder, action.payload];
        },

        deleteFolder: (state, action: PayloadAction<{ folderId: number }>) => {
            state.folder = state.folder.filter(
                folder => folder.folderId !== action.payload.folderId
            );
        },

        editFolder: (state, action) => {
            state.folder = state.folder.map(folder => {
                if (folder.folderId === action.payload.folderId) {
                    return {
                        ...folder,
                        ...action.payload
                    }
                }
                return folder
            });
        },

        addCategory: (
            state,
            action: PayloadAction<{
                folderId: number;
                category: Category;
            }>
        ) => {
            const folder = state.folder.find(
                item => item.folderId === action.payload.folderId
            );

            if (folder) {
                folder.category.push(action.payload.category);
            }
        },

        deleteCategory: (
            state,
            action: PayloadAction<{
                folderId: number;
                categoryId: number;
            }>
        ) => {
            const folder = state.folder.find(
                item => item.folderId === action.payload.folderId
            );

            if (folder) {
                folder.category = folder.category.filter(
                    category => category.categoryId !== action.payload.categoryId
                );
            }

        },

        editCategory: (state, action) => {
            state.folder = state.folder.map(folder => {
                if (folder.folderId === action.payload.folderId) {
                    folder.category = folder.category.map(category => {
                        if (category.categoryId === action.payload.categoryId) {
                            return {
                                ...category,
                                ...action.payload
                            }
                        }
                        return category
                    });
                }
                return folder
            });
        },

        addNote: (state, action: PayloadAction<Note>) => {
            state.note.push(action.payload);
        },

        deleteNote: (state, action: PayloadAction<{ id: number }>) => {
            state.note = state.note.filter(note => note.id !== action.payload.id);
        },
        editNote: (state, action) => {
            state.note = state.note.map(note => {
                if (note.id === action.payload.id) {
                    return {
                        ...note,
                        ...action.payload
                    }
                }
                return note
            });
        },
    },

    extraReducers: builder => {
        builder
            .addCase(getDataCategory.pending, state => {
                state.folder = [];
                state.note = [];
            })
            .addCase(getDataCategory.fulfilled, (state, action: any) => {
                state.folder = action.payload;
            })
            .addCase(getDataCategory.rejected, state => {
                state.folder = [];
                state.note = [];
            })

            .addCase(getAllNote.fulfilled, (state, action) => {
                state.note = action.payload;
            });
    },
});

export const {
    setCategoryData,
    addCategory,
    deleteCategory,
    addFolder,
    deleteFolder,
    addNote,
    deleteNote,
    editNote,
    editCategory,
    editFolder
} = categorySlice.actions;

export default categorySlice.reducer;