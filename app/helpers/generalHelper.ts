export const divideLines = (text: string) => {
  const middleIndex = Math.ceil(text.length / 2);
  const firstHalf = text.slice(0, middleIndex);
  const secondHalf = text.slice(middleIndex);

  return [firstHalf, secondHalf];
};
