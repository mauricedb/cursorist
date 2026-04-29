import { parse } from "chrono-node";

const collapseWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toUtcStartOfDay = (value: Date) =>
  new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));

const removeParsedDateFragment = (input: string, fragment: string) => {
  const pattern = new RegExp(`\\b${escapeRegExp(fragment)}\\b`, "i");
  const withoutDate = input.replace(pattern, " ");
  return collapseWhitespace(withoutDate);
};

export type ParsedDueDate = {
  title: string;
  dueDate: Date | null;
  matchedText: string | null;
};

export function parseDueDateFromTaskTitle(rawTitle: string): ParsedDueDate {
  const normalizedTitle = collapseWhitespace(rawTitle);
  if (!normalizedTitle) {
    return { title: "", dueDate: null, matchedText: null };
  }

  const [result] = parse(normalizedTitle, new Date(), { forwardDate: true });
  if (!result) {
    return { title: normalizedTitle, dueDate: null, matchedText: null };
  }

  const parsedDate = result.start.date();
  const dueDate = toUtcStartOfDay(parsedDate);
  const cleanedTitle = removeParsedDateFragment(normalizedTitle, result.text);

  return {
    title: cleanedTitle || normalizedTitle,
    dueDate,
    matchedText: result.text,
  };
}
