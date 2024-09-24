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

export function createSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

export interface Heading {
  text: string;
  children: Heading[];
}

export function getHeadingsFromMD(markdown: string): Heading[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm; // Matches h2, h3, h4
  const headings: Heading[] = [];
  const stack: { level: number; heading: Heading }[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length; // h2 => 2, h3 => 3, h4 => 4
    const text = match[2].trim();
    const newHeading: Heading = { text, children: [] };

    // Find the appropriate parent for the current heading
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // If no parent, it's an h2
      headings.push(newHeading);
    } else {
      // Add as a child of the last item in the stack
      stack[stack.length - 1].heading.children.push(newHeading);
    }

    // Add the current heading to the stack
    stack.push({ level, heading: newHeading });
  }

  return headings;
}
