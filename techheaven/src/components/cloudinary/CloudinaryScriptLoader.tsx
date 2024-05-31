import React, { useEffect, useState, createContext, ReactNode } from "react";

interface CloudinaryScriptContextType {
  loaded: boolean;
}

export const CloudinaryScriptContext = createContext<CloudinaryScriptContextType | undefined>(undefined);

interface CloudinaryScriptLoaderProps {
  children: ReactNode;
}

const CloudinaryScriptLoader: React.FC<CloudinaryScriptLoaderProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const uwScript = document.getElementById("uw") as HTMLScriptElement;
    if (!uwScript) {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "uw");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      {children}
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryScriptLoader;
