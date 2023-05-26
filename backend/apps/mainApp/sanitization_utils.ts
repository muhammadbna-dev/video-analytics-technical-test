import xss from "xss";

const sanitizeValue = (value: string): string => {
  return xss(value, {
    stripIgnoreTagBody: true,
  });
};

export { sanitizeValue };
