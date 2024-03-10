export const BD_PHONE_NUMBER_PATTERN = /^(01[3-9]\d{8})$/;

export const escapeRegex = (text: any) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
