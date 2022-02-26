import { FC, useState } from "react";
import SplitContext, { SplitContextType } from "./SplitContext";

export type SplitProviderProps = {
  onSuccess: (
    contextValue: Omit<SplitContextType, "onSuccess">
  ) => (data: any) => Promise<void>;
};

const SplitProvider: FC<SplitProviderProps> = ({ children, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  const context = {
    loading,
    items,
    setLoading,
    setItems,
  };

  return (
    <SplitContext.Provider
      value={{
        ...context,
        onSuccess: onSuccess(context),
      }}
    >
      {children}
    </SplitContext.Provider>
  );
};

export default SplitProvider;
