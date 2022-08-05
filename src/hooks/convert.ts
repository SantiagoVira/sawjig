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
    formData.append("duration", "5000");

    const path = process.env.REACT_APP_BACKEND_URL! + "animation";

    await axios
      .post(path, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        responseType: "blob",
      })
      .then((response) => {
        console.log(response);
        setDisplayImageBlob(URL.createObjectURL(response.data));
      })
      .catch((err) => {
        console.error(err);
        errorToast(`${err.message}, Please try a different image`);
      });
    setIsLoadingImage(false);
  };

  return convert;
};
