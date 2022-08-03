import { useAtom } from "jotai";

import {
  errorCodeAtom,
  inputImageNaturalSizeAtom,
  gridSizeAtom,
  inputImageFileAtom,
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

interface useCheckErrorProps {
  gridRows?: string;
  gridCols?: string;
  inputImageFile?: string | File;
  inputImageWidth?: number;
  inputImageHeight?: number;
}

export const useCheckError = () => {
  const [, setErrorCode] = useAtom(errorCodeAtom);
  const [[gridRows, gridCols]] = useAtom(gridSizeAtom);
  const [inputImageFile] = useAtom(inputImageFileAtom);
  const [[inputImageWidth, inputImageHeight]] = useAtom(
    inputImageNaturalSizeAtom
  );

  return (data?: useCheckErrorProps) => {
    let code = 0;
    if ((data?.inputImageFile ?? inputImageFile) === "") code = 1;
    else if (
      (data?.gridRows ?? gridRows) === "" ||
      parseInt(data?.gridRows ?? gridRows) < 1
    )
      code = 2;
    else if (
      (data?.gridCols ?? gridCols) === "" ||
      parseInt(data?.gridCols ?? gridCols) < 1
    )
      code = 3;
    else if (parseInt(data?.gridRows ?? gridRows) > 50) code = 4;
    else if (parseInt(data?.gridCols ?? gridCols) > 50) code = 5;
    else if (
      (data?.inputImageWidth ?? inputImageWidth) < 300 ||
      (data?.inputImageHeight ?? inputImageHeight) < 300
    )
      code = 6;

    setErrorCode(code);
    return code;
  };
};
