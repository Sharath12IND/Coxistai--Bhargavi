import { createContext, useContext, useState, ReactNode } from "react";
import PageLoader from "@/components/ui/page-loader";

interface LoadingContextType {
  isLoading: boolean;
  loadingText: string;
  showLoader: (text?: string) => void;
  hideLoader: () => void;
  setLoadingText: (text: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const showLoader = (text: string = "Loading...") => {
    setLoadingText(text);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const updateLoadingText = (text: string) => {
    setLoadingText(text);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingText,
        showLoader,
        hideLoader,
        setLoadingText: updateLoadingText,
      }}
    >
      {children}
      <PageLoader isLoading={isLoading} loadingText={loadingText} />
    </LoadingContext.Provider>
  );
}