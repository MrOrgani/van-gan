import { randomPrompts } from "../constants";

import * as FileSaver from "file-saver";

export function getRandomPrompt(prompt: string): string {
  const randomIndex = Math.floor(Math.random() * randomPrompts.length);

  const randomPrompt = randomPrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export const downloadImage = (_id: string, photo: string) => {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
};
