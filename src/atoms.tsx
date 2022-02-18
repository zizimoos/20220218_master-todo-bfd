import { atom } from "recoil";

const localStorageData = localStorage.getItem("workList");
const workList = localStorageData ? JSON.parse(localStorageData) : [];

export interface ITodo {
  id: number;
  text: string;
}

export interface IWorkList {
  [key: string]: ITodo[];
}

export const workListState = atom<IWorkList>({
  key: "workListState",
  default: {
    TODO: workList["TODO"] || [],
    DOIN: workList["DOIN"] || [],
    DONE: workList["DONE"] || [],
    WAST: workList["WAST"] || [],
  },
});
