import { string, object, TypeOf, number } from "yup";

export type CatchPhraseSchemaParams = {
  minLength: number;
  maxSentence: number;
};

export const CatchPhraseSchema = ({
  minLength,
  maxSentence,
}: CatchPhraseSchemaParams) =>
  object({
    sentence: string().max(maxSentence).required(),
    maxSentence: number().required(),
    dividend: number().min(minLength).max(maxSentence).required(),
  });

export type CatchPhraseSchemaType = TypeOf<
  ReturnType<typeof CatchPhraseSchema>
>;
