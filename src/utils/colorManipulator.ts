type ColorFormat = "rgb" | "rgba" | "hsl" | "hsla";
type ValueType = [number, number, number] | [number, number, number, number];

interface ColorObject {
  type: ColorFormat;
  values: ValueType;
}

const clamp = (value: number, min: number = 0, max: number = 1) => {
  return Math.min(Math.max(min, value), max);
};

export const hexToRgb: (hex: string) => string = (color) => {
  color = color.substr(1);

  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, "g");
  let colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }

  return colors
    ? `rgb${colors.length === 4 ? "a" : ""}(${colors
        .map((n, index) => {
          return index < 3
            ? parseInt(n, 16)
            : Math.round((parseInt(n, 16) / 255) * 1000) / 1000;
        })
        .join(", ")})`
    : "";
};

export const decomposeColor: (color: string) => ColorObject = (color) => {
  if (color.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf("(");
  const type = color.substring(0, marker) as ColorFormat;

  const valuesInString = color
    .substring(marker + 1, color.length - 1)
    .split(",");
  valuesInString.slice(0, 4);
  const values = valuesInString.map((value) => parseFloat(value)) as ValueType;

  return { type, values };
};

export const recomposeColor: (color: ColorObject) => string = (color) => {
  const { type } = color;
  const { values } = color;

  let valuesWithType: Array<number | string> = [...values];

  if (type.indexOf("rgb") !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    valuesWithType = values.map((n, i) =>
      i < 3 ? Math.round(n) : n
    ) as ValueType;
  } else if (type.indexOf("hsl") !== -1) {
    valuesWithType[1] = `${values[1]}%`;
    valuesWithType[2] = `${values[2]}%`;
  }

  return `${type}(${valuesWithType.join(", ")})`;
};

export const darken: (color: string, coefficient: number) => string = (
  color,
  coefficient
) => {
  const colorObj = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (colorObj.type.indexOf("hsl") !== -1) {
    colorObj.values[2] *= 1 - coefficient;
  } else if (colorObj.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      colorObj.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(colorObj);
};

export const lighten: (color: string, coefficient: number) => string = (
  color,
  coefficient
) => {
  const colorObj = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (colorObj.type.indexOf("hsl") !== -1) {
    colorObj.values[2] += (100 - colorObj.values[2]) * coefficient;
  } else if (colorObj.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      colorObj.values[i] += (255 - colorObj.values[i]) * coefficient;
    }
  }

  return recomposeColor(colorObj);
};
