import React, { Dispatch } from 'react';
import { AppData } from "../models/app-data";

export const AppDataContext = React.createContext<AppData & { dispatch: any }>({
  bookmarks: {},
  filteredBookmarks: {},
  collections: {},
  collectionsOrder: [] as any,
  dispatch: undefined as any,
});