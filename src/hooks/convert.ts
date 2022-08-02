import axios from "axios";
import { useAtom } from "jotai";
import {
  displayImage,
  originalImageFileAtom,
  inputImageSize,
  isLoadingImage,
  numTiles,
} from "../atoms";

export const useConvert = () => {
  const [originalImageFile] = useAtom(originalImageFileAtom);
  const [, setDisplay] = useAtom(displayImage);
  const [[rows, cols]] = useAtom(numTiles);
  const [[imageWidth, imageHeight]] = useAtom(inputImageSize);
  const [, setIsLoading] = useAtom(isLoadingImage);

  const convert = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", originalImageFile);
    formData.append("rows", rows);
    formData.append("cols", cols);
    formData.append("isPortrait", imageHeight > imageWidth ? "isPortrait" : "");

    const response = await axios.put(
      process.env.REACT_APP_BACKEND_URL!,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      }
    );
    setDisplay(URL.createObjectURL(response.data));
    setIsLoading(false);
  };

  return convert;
};
