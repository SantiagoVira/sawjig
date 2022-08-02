import { useAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import {
  errorCodeAtom,
  inputImageNaturalSizeAtom,
  // gridSizeAtom,
  // originalImageFileAtom,
} from "../atoms";

export const useErrorCode = () => {
  const [errorCode] = useAtom(errorCodeAtom);

  const messages = [
    "Sawjig!",
    "Upload your own image to try it out!",
    "You gotta have some rows!",
    "You gotta have some columns!",
    "You gotta have at most 50 rows!",
    "You gotta have at most 50 columns!",
    "The image has gotta be at least 300x300",
  ];

  return {
    errorMessage: messages[errorCode],
    errorCode: errorCode,
  };
};

export const useCheckError = () => {
  const [, setErrorCode] = useAtom(errorCodeAtom);
  // const [[gridRows, gridCols]] = useAtom(gridSizeAtom);
  // const [originalImageFile] = useAtom(originalImageFileAtom);
  const [[inputImageWidth, inputImageHeight]] = useAtom(
    inputImageNaturalSizeAtom
  );
  const stuff = useRef({ inputImageWidth, inputImageHeight });

  stuff.current = { inputImageWidth, inputImageHeight };

  useEffect(
    () => console.log("useEffect", [inputImageWidth, inputImageHeight]),
    [inputImageWidth, inputImageHeight]
  );

  return useCallback(() => {
    // if (originalImageFile === "") setErrorCode(1);
    // else if (gridRows === "" || parseInt(gridRows) < 1) setErrorCode(2);
    // else if (gridCols === "" || parseInt(gridCols) < 1) setErrorCode(3);
    // else if (parseInt(gridRows) > 50) setErrorCode(4);
    // else if (parseInt(gridCols) > 50) setErrorCode(5);
    // else if (stuff.current.width < 300 || stuff.current.height < 300)
    //   setErrorCode(6);
    // else setErrorCode(0);
    // console.log(
    //   "useCallback",
    //   stuff,
    //   stuff.current,
    //   stuff.current.width,
    //   stuff.current.height
    // );
    setErrorCode(0);
  }, [setErrorCode]);
};
