import { SplitContextProvider, SplitContextType } from "context";
import { SplitTemplate } from "templates";
import { CatchPhraseSchemaType } from "components/organism/CatchPhrase";

const Client = () => {
  const onSuccess =
    ({ setLoading, setItems }: Omit<SplitContextType, "onSuccess">) =>
    ({ sentence, dividend }: Required<CatchPhraseSchemaType>) => {
      return new Promise<void>(async (resolve, reject) => {
        setLoading(true);
        try {
          // Exception if phrase is empty
          if (!sentence)
            reject({
              sentence: "sentence is a required field",
            });

          const splitSentence = sentence?.trim().split(" ") as string[];
          const min = splitSentence.reduce<number>(
            (minLength, currentValue) => {
              if (minLength === 0) return currentValue.length;
              else if (minLength < currentValue.length)
                return currentValue.length;
              else return minLength;
            },
            0
          );

          // Exception if there is a word greater than the length of the split
          if (min > (dividend as number))
            reject({
              sentence: `lenght must be greater than or equal to ${min}`,
            });

          const items = splitSentence.reduce<string[]>((acc, word) => {
            if (
              !acc.length ||
              `${acc[acc.length - 1]} ${word}`.length > (dividend as number)
            ) {
              acc.push(word);
              return acc;
            }

            acc[acc.length - 1] += ` ${word}`;
            return acc;
          }, []);

          setItems(items);
          setLoading(false);
          resolve();
        } catch (error) {
          setLoading(false);
          reject(error);
        }
      });
    };

  return (
    <SplitContextProvider onSuccess={onSuccess}>
      <SplitTemplate />
    </SplitContextProvider>
  );
};

export default Client;
