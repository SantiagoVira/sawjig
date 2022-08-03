import axios from "axios";
import { useAtom } from "jotai";
import {
  displayImageBlobAtom,
  inputImageFileAtom,
  inputImageSizeAtom,
  isLoadingImageAtom,
  gridSizeAtom,
} from "../atoms";

export const useConvert = () => {
  const [inputImageFile] = useAtom(inputImageFileAtom);
  const [, setDisplayImageBlob] = useAtom(displayImageBlobAtom);
  const [[gridRows, gridCols]] = useAtom(gridSizeAtom);
  const [[inputImageWidth, inputImageHeight]] = useAtom(inputImageSizeAtom);
  const [, setIsLoadingImage] = useAtom(isLoadingImageAtom);

  const convert = async () => {
    setIsLoadingImage(true);
    const formData = new FormData();
    formData.append("image", inputImageFile);
    formData.append("rows", gridRows);
    formData.append("cols", gridCols);
    formData.append(
      "isPortrait",
      inputImageHeight > inputImageWidth ? "isPortrait" : ""
    );

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
    setDisplayImageBlob(URL.createObjectURL(response.data));
    setIsLoadingImage(false);
  };

  return convert;
};
