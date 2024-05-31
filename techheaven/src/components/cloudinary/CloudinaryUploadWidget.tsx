import React, { useContext, useEffect, useCallback } from "react";
import { CloudinaryScriptContext } from "./CloudinaryScriptLoader";

interface CloudinaryUploadWidgetProps {
  uwConfig: { cloudName: string; uploadPreset: string };
  setPublicId: (publicId: string) => void;
}

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({ uwConfig, setPublicId }) => {
  const scriptContext = useContext(CloudinaryScriptContext);

  const initializeCloudinaryWidget = useCallback(() => {
    if (scriptContext?.loaded) {
      const myWidget = (window as any).cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);
          } else if (error) {
            console.error("Upload error:", error);
          }
        }
      );

      const uploadButton = document.getElementById("upload_widget");

      const handleClick = () => {
        myWidget.open();
      };

      uploadButton?.addEventListener("click", handleClick);

      // Cleanup event listener on component unmount
      return () => {
        uploadButton?.removeEventListener("click", handleClick);
      };
    }
  }, [scriptContext?.loaded, uwConfig, setPublicId]);

  useEffect(() => {
    const cleanup = initializeCloudinaryWidget();
    return cleanup;
  }, [initializeCloudinaryWidget]);

  return (
    // <button id="upload_widget" className="cloudinary-button w-full">
    //   Upload
    // </button>
    <label htmlFor="upload_widget"
      className="bg-white text-gray-500 font-semibold text-base rounded max-w-xl h-20 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
        <path
          d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
          data-original="#000000" />
        <path
          d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
          data-original="#000000" />
      </svg>
      Upload image

      <input id="upload_widget" className=" w-full hidden" />
    </label>
  );
}

export default CloudinaryUploadWidget;
