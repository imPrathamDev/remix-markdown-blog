export const divideLines = (text: string) => {
  const words = text.split(" ");
  const totalWords = words.length;
  let midPoint = Math.floor(totalWords / 2.5); // Use 1/3 instead of 1/2 for fewer words on first line

  let firstLine = words.slice(0, midPoint).join(" ");
  let secondLine = words.slice(midPoint).join(" ");

  // Ensure the first line is shorter
  while (firstLine.length >= secondLine.length && midPoint > 1) {
    firstLine = words.slice(0, midPoint - 1).join(" ");
    secondLine = words.slice(midPoint - 1).join(" ");
    midPoint--;
  }

  return [firstLine, secondLine];
};

export function getH2HeadingsFromMD(markdown: string): string[] {
  const regex = /^##\s+(.+)$/gm;
  const headings: string[] = [];
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    headings.push(match[1].trim());
  }

  return headings;
}
