import { atom } from "recoil";

const localStorageData = localStorage.getItem("workList");
const workList = localStorageData ? JSON.parse(localStorageData) : [];

interface IWorkList {
  [key: string]: string[];
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
