import axios from "axios";
import { useAtom } from "jotai";
import {
  displayImageBlobAtom,
  inputImageFileAtom,
  isLoadingImageAtom,
  gridSizeAtom,
  inputImageNaturalSizeAtom,
} from "../atoms";

export const useConvert = () => {
  const [inputImageFile] = useAtom(inputImageFileAtom);
  const [, setDisplayImageBlob] = useAtom(displayImageBlobAtom);
  const [[gridRows, gridCols]] = useAtom(gridSizeAtom);
  const [[inputImageWidth, inputImageHeight]] = useAtom(
    inputImageNaturalSizeAtom
  );
  const [, setIsLoadingImage] = useAtom(isLoadingImageAtom);

  const convert = async (data?: {
    inputImageWidth?: number;
    inputImageHeight?: number;
  }) => {
    setIsLoadingImage(true);
    const imgWidth = (data?.inputImageWidth ?? inputImageWidth).toString();
    const imgHeight = (data?.inputImageHeight ?? inputImageHeight).toString();

    const formData = new FormData();
    formData.append("image", inputImageFile);
    formData.append("rows", gridRows);
    formData.append("cols", gridCols);
    formData.append("width", imgWidth);
    formData.append("height", imgHeight);
    //formData.append("isPortrait", isPortrait ? "isPortrait" : "");

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
