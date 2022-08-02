import { atom } from "jotai";

export const displayImage = atom<string>("/logo.png");
export const originalImageFileAtom = atom<string | Blob>("");
export const inputImageSize = atom<number[]>([0, 0]);
export const inputImageNaturalSize = atom<number[]>([0, 0]);
export const numTiles = atom<string[]>(["2", "2"]);
export const errorCodeAtom = atom<number>(1);
export const isLoadingImage = atom<boolean>(false);
