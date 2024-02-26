import { ColumnFilterList, ListLength, ViewSwitch } from "./Filter";
import { MMPResult } from "../types";
import { Key, Selection } from "react-aria-components";
import { useEffect } from "react";

interface SearchResultTableProps {
  results?: {
    count: number;
    results: Array<MMPResult>;
  };
  error?: string;
  searchTerm?: string;
  loadTime?: number;
  filterSelectedKeys: Array<string>;
  filterSetSelectedKeys: React.Dispatch<React.SetStateAction<Array<string>>>;
  pageMaxResults: number;
  pageSetMaxResults: React.Dispatch<React.SetStateAction<number>>;
  // pageSetMaxResults: any;
  // pageSetMaxResults: React.SetStateAction<number>;
}
// filterSetSelectedKeys: React.Dispatch<React.SetStateAction<Array<string>>> => (newKeys) ;
// filterSetSelectedKeys: (value: React.SetStateAction<string[]>) => void;
// pageSetMaxResults: (keys: Key) => void;
// pageSetMaxResults: (keys: React.SetStateAction<number>) => void;

export default function SearchResultTable({
  results,
  error,
  searchTerm,
  loadTime,
  filterSelectedKeys: filterKeys,
  filterSetSelectedKeys,
  pageMaxResults,
  pageSetMaxResults,
}: SearchResultTableProps) {
  const handleFilterChange = (sel: Selection) => {
    filterSetSelectedKeys(Array.from(sel as string));
  };
  const handleMaxResultsChange = (key: Key) => {
    pageSetMaxResults(key as number);
  };
  const getPermaLink = (id: number) => {
    return `https://mmp.acdh-dev.oeaw.ac.at/archiv/stelle/detail/${id}`;
  };

  useEffect(() => {
    console.log("filter:", filterKeys);
  }, [filterKeys]);

  return (
    <section aria-label="Search Results">
      {error && <p>{error}</p>}
      {results && results.count === 0 && (
        <p>
          Keine Ergebnisse für den Suchbegriff{" "}
          <span>"{searchTerm}" gefunden.</span>
        </p>
      )}
      {results && results.count > 0 && (
        <>
          <h2 className="text-2xl">Such-Resultate</h2>
          <section aria-label="Search Settings">
            <ViewSwitch />
            <ColumnFilterList
              selectedKeys={filterKeys}
              onSelectionChange={handleFilterChange}
              selectionMode="multiple"
            />

            <ListLength
              selectedKey={pageMaxResults}
              onSelectionChange={handleMaxResultsChange}
            />
          </section>
          <section aria-label="Search Results Summary">
            <p>
              Es wurden <span>{results.count}</span> Zitate in{" "}
              <span>{loadTime}s</span> für den Suchbegriff "
              <span>{searchTerm}</span>" gefunden.{" "}
            </p>
            <p>Filter: {filterKeys && [...filterKeys].join(", ")}</p>
            <p>Max Num: {pageMaxResults}</p>
          </section>
          <div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Zitat</th>
                  <th>Stichwörter</th>
                  {filterKeys.includes("authors") && <th>Autor(en)</th>}
                  {filterKeys.includes("title") && <th>Titel</th>}
                  {filterKeys.includes("start_date") && (
                    <th>Früheste mögl. Datierung</th>
                  )}
                  {filterKeys.includes("end_date") && (
                    <th>Spätest mögl. Datierung</th>
                  )}
                  {/* <th>Summary</th> */}
                </tr>
              </thead>
              <tbody>
                {results.results.map((item, i: number) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    {item.display_label && <td>{item.display_label}</td>}
                    {item.key_word && (
                      <td>
                        {item.key_word
                          .map((keyword) => keyword.stichwort)
                          .join(", ")}
                      </td>
                    )}
                    {item.text?.autor && filterKeys.includes("authors") && (
                      <td>
                        {item.text.autor.map((autor) => autor.name).join(", ")}
                      </td>
                    )}
                    {item.text?.title && filterKeys.includes("title") && (
                      <td>
                        <a href={getPermaLink(item.id)} target="_blank">
                          {item.text.title}
                        </a>
                      </td>
                    )}
                    {item.text?.start_date &&
                      filterKeys.includes("start_date") && (
                        <td>{item.text.start_date}</td>
                      )}
                    {item.text?.end_date && filterKeys.includes("end_date") && (
                      <td>{item.text.end_date}</td>
                    )}
                    {/* <td>{item.summary}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
