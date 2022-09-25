export const RandomID = () => {
  return Math.random().toString(32).replace('.', '');
};

export const ShortID = () => {
  return RandomID().slice(-6);
};
