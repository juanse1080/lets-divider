import { createContext, Dispatch, SetStateAction } from "react";

export interface SplitContextType {
  loading: boolean;
  items: string[];
  setLoading: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<string[]>>;
  onSuccess: (data: any) => Promise<void>;
}

export default createContext<SplitContextType>({} as SplitContextType);
