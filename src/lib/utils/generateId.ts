export const generateId = () => {
  const length = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};
