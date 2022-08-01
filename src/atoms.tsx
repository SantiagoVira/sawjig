import { atom } from "jotai";

export const displayImage = atom<string>("/logo.png");
export const originalImage = atom<string>("/logo/gradient.png");
export const inputImageAtom = atom<string | Blob>("");
export const inputImageSize = atom<number[]>([0, 0]);
export const numTiles = atom<string[]>(["2", "2"]);
export const errorCodeAtom = atom<number>(1);
