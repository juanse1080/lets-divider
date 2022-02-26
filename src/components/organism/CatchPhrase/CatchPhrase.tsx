import { useForm, Controller } from "react-hook-form";

import { Grid, Textarea, Input, Button } from "components/atoms";

import { useSplitContext } from "context";
import { useYupResolve } from "hooks";

import { CatchPhraseSchema, CatchPhraseSchemaType } from "./CatchPhrase.schema";

export type CatchPhraseProps = {};

const onValidate = async (data: CatchPhraseSchemaType) => {
  const { sentence, maxSentence } = data;

  const minLength = sentence
    ?.trim()
    .split(" ")
    .reduce<number>((minLength, currentValue) => {
      if (minLength === 0) return currentValue.length;
      else if (minLength < currentValue.length) return currentValue.length;
      else return minLength;
    }, 0);

  const currentSchema = CatchPhraseSchema({
    maxSentence: maxSentence as number,
    minLength: minLength as number,
  });

  const values = await currentSchema.validate(data, {
    abortEarly: false,
  });

  return values;
};

const CatchPhrase = (props: CatchPhraseProps) => {
  const { onSuccess, loading, setItems } = useSplitContext();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    resetField,
    formState: { errors },
  } = useForm<CatchPhraseSchemaType>({
    mode: "onSubmit",
    resolver: useYupResolve<CatchPhraseSchemaType>(onValidate),
    defaultValues: {
      maxSentence: 500,
    },
  });

  const maxSentence = watch("maxSentence");

  const clear = () => {
    setItems([]);
    resetField("sentence");
    resetField("dividend");
  };

  const onSubmit = async (data: CatchPhraseSchemaType) => {
    try {
      await onSuccess(data);
    } catch (error) {
      const err = error as Record<keyof CatchPhraseSchemaType, string>;
      (Object.keys(err) as Array<keyof CatchPhraseSchemaType>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: err[key],
          });
        }
      );
    }
  };

  return (
    <>
      <form
        id="catchData"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <Grid container alignItems="center" justify="flex-end" spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="maxSentence"
              control={control}
              render={({ field }) => (
                <Input
                  disabled
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.maxSentence}
                  helperText={
                    errors.maxSentence
                      ? errors.maxSentence.message
                      : "Enter the maximum length of the phrase"
                  }
                  fullWidth
                  type="number"
                  label="Maximum length"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Textarea
              {...register("sentence")}
              error={!!errors.sentence}
              helperText={errors?.sentence?.message}
              fullWidth
              label="Sentence"
              rows={10}
              maxLength={maxSentence}
              helperTextInfo={(lenght, maxLength) =>
                `Max can type ${maxLength} characters, he has ${
                  maxLength - lenght
                } characters left.`
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              {...register("dividend")}
              error={!!errors.dividend}
              helperText={
                errors.dividend
                  ? errors.dividend.message
                  : "Enter the maximum length you want in the substrings"
              }
              fullWidth
              type="number"
              label="Length to split"
            />
          </Grid>
        </Grid>
      </form>
      <Grid container alignItems="center" justify="flex-end" spacing={3}>
        <Grid item>
          <Button disabled={loading} onClick={clear} variant="secondary">
            Clear
          </Button>
        </Grid>
        <Grid item>
          <Button
            form="catchData"
            disabled={loading}
            type="submit"
            variant="secondary"
          >
            Split
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CatchPhrase;
