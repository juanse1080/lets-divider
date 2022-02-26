export const fontVariant = {
   h1: {
      fontSize: 22,
      lineHeight: 1.334,
      "--bold": 600
   },
   h2: {
      fontSize: 16,
      lineHeight: 1.75,
      "--bold": 600
   },
   h3: {
      fontSize: 14,
      lineHeight: 1.57,
      "--bold": 600
   },
   p: {
      fontSize: 14,
      lineHeight: 1.57,
      "--bold": 400
   },
   p1: {
      fontSize: 12,
      lineHeight: 1.66,
      "--bold": 400
   },
   p2: {
      fontSize: 10,
      lineHeight: 1.66,
      "--bold": 500
   },
   field: {
      fontSize: 10,
      lineHeight: 1.66,
      "--bold": 400
   },
   link: {
      fontSize: 10,
      lineHeight: 1.66,
      "--bold": 400
   },
   italic: {
      fontSize: 10,
      lineHeight: 1.66,
      fontStyle: 'italic',
      "--bold": 400
   }
}

export type variantType = keyof typeof fontVariant;

type variantMappingType = {
   [idx in variantType]: React.ElementType
}

export const variantMapping: variantMappingType = {
   h1: 'h1',
   h2: 'h2',
   h3: 'h3',
   p: 'p',
   p1: 'p',
   p2: 'p',
   field: 'p',
   link: 'p',
   italic: 'i',
}


