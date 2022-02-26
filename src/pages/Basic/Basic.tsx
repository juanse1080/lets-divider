import axios from "axios";

import { Response } from "types";
import { SplitTemplate } from "templates";
import { SplitContextProvider, SplitContextType } from "context";

const Basic = () => {
  const onSuccess =
    ({ setLoading, setItems }: Omit<SplitContextType, "onSuccess">) =>
    async (form: any) => {
      setLoading(true);
      try {
        const { data } = await axios.post("/api/split", form);
        console.log(data);
        setItems(data.data.items);
        setLoading(false);
      } catch (error) {
        const err = error as unknown as Response<Record<string, string>>;
        console.log("onSuccess: error", error);
        setLoading(false);
        throw err.data;
      }
    };

  return (
    <SplitContextProvider onSuccess={onSuccess}>
      <SplitTemplate />
    </SplitContextProvider>
  );
};

export default Basic;
