export const formatImageBase64 = (imageData) => {
  return imageData ? `data:${imageData?.mime};base64,${imageData?.data}` : null;
};
