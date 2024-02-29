import { SearchResults } from "../src/App.tsx";
import { MMPResult } from "./types";

export function sortByRelevance(
  results: SearchResults,
  searchTerm: string,
  direction?: string,
) {
  const flatten = (
    obj: MMPResult | Record<string, string> | string,
  ): string => {
    let result = "";

    if (typeof obj === "string") {
      return obj + " ";
    } else if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        result += flatten(obj[i]);
      }
    } else {
      for (const i in obj) {
        if (typeof obj[i] === "object") {
          result += flatten(obj[i]);
        } else {
          result += obj[i] + " ";
        }
      }
    }

    return result;
  };

  const countOccurrences = (item: MMPResult, searchTerm: string) => {
    const allFields = flatten(item);
    const regex = new RegExp(searchTerm.toLowerCase(), "g");
    const matches = allFields.match(regex);
    return matches ? matches.length : 0;
  };

  const sortedResults = results?.results.sort((a, b) => {
    const countA = countOccurrences(a, searchTerm);
    const countB = countOccurrences(b, searchTerm);
    if (direction === "asc") {
      return countA - countB;
    } else {
      return countB - countA;
    }
  });
  return sortedResults;
}
