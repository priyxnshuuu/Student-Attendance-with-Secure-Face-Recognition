export const GenerateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * max);
};
