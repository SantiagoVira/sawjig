import { atom } from "jotai";

export const displayImageBlobAtom = atom<string>("/logo.png");
export const originalImageFileAtom = atom<string | Blob>("");
export const inputImageSizeAtom = atom<number[]>([0, 0]);
export const inputImageNaturalSizeAtom = atom<number[]>([0, 0]);
export const gridSizeAtom = atom<string[]>(["2", "2"]);
export const errorCodeAtom = atom<number>(1);
export const isLoadingImageAtom = atom<boolean>(false);
