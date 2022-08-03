import axios from "axios";
import { useAtom } from "jotai";
import {
  displayImageBlobAtom,
  inputImageFileAtom,
  isLoadingImageAtom,
  gridSizeAtom,
  inputImageNaturalSizeAtom,
} from "../atoms";
import { useErrorToast } from "./useErrorToast";

export const useConvert = () => {
  const [inputImageFile] = useAtom(inputImageFileAtom);
  const [, setDisplayImageBlob] = useAtom(displayImageBlobAtom);
  const [[gridRows, gridCols]] = useAtom(gridSizeAtom);
  const [[inputImageWidth]] = useAtom(inputImageNaturalSizeAtom);
  const [, setIsLoadingImage] = useAtom(isLoadingImageAtom);

  const errorToast = useErrorToast();

  const convert = async (data?: {
    inputImageWidth?: number;
    inputImageHeight?: number;
  }) => {
    setIsLoadingImage(true);
    const imgWidth = (data?.inputImageWidth ?? inputImageWidth).toString();

    const formData = new FormData();
    formData.append("image", inputImageFile);
    formData.append("rows", gridRows);
    formData.append("cols", gridCols);
    formData.append("width", imgWidth);

    await axios
      .put(process.env.REACT_APP_BACKEND_URL!, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
        responseType: "blob",
      })
      .then((response) => {
        console.log(response);
        setDisplayImageBlob(URL.createObjectURL(response.data));
      })
      .catch((err) =>
        errorToast(`${err.message}, Please try a different image`)
      );
    setIsLoadingImage(false);
  };

  return convert;
};
