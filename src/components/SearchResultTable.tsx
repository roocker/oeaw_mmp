import { ColumnFilterList, ListLength, ListSortBy, ViewSwitch } from "./Filter";
import { MMPResult } from "../types";
import { Key, Selection } from "react-aria-components";
import { useEffect } from "react";
import Pagination from "./Pagination";

interface SearchResultTableProps {
  data?: {
    count: number;
    results: Array<MMPResult>;
  };
  error?: string;
  searchTerm?: string;
  loadStatus: boolean;
  loadTime?: number;
  filterKeys: Array<string>;
  filterSetKeys: React.Dispatch<React.SetStateAction<Array<string>>>;
  pageMaxResults: number;
  pageSetMaxResults: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  handlePageChange: (page: number | string) => void;
  pageOrdering: string;
  pageSetOrdering: (ordering: string) => void;
}

export default function SearchResultTable({
  data,
  error,
  searchTerm,
  loadStatus,
  loadTime,
  filterKeys,
  filterSetKeys,
  pageMaxResults,
  pageSetMaxResults,
  currentPage,
  handlePageChange,
  pageOrdering,
  pageSetOrdering,
}: SearchResultTableProps) {
  const handleFilterChange = (sel: Selection) => {
    filterSetSelectedKeys(Array.from(sel as string));
  };
  const handleMaxResultsChange = (key: Key) => {
    pageSetMaxResults(key as number);
  };

  const handleOrderingChange = (key: Key) => {
    pageSetOrdering(key as string);
  };
  const getPermaLink = (id: number) => {
    return `https://mmp.acdh-dev.oeaw.ac.at/archiv/stelle/detail/${id}`;
  };

  /* const data = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageMaxResults;
    const lastPageIndex = firstPageIndex + pageMaxResults;
    return results.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, results]); */

  useEffect(() => {
    // console.log("filter:", filterKeys);
    // console.log("loadStatus:", loadStatus);
  }, [filterKeys, loadStatus]);

  return (
    <section aria-label="Search Results">
      {error && <p>{error}</p>}
      {data && data.count === 0 && !loadStatus && (
        <>
          <h2>Keine Ergebnisse</h2>
          <p>
            {" "}
            ... für den Suchbegriff <span>"{searchTerm}" gefunden.</span>
          </p>
        </>
      )}

      {data && data.count > 0 && (
        <>
          <h2 className="text-2xl">Such-Resultate</h2>
          <p className="text-center">
            Es wurden <span>{data.count}</span> Zitate in{" "}
            <span>{loadTime}s</span> für den Suchbegriff "
            <span>{searchTerm}</span>" gefunden.{" "}
          </p>
          <section aria-label="Search Settings">
            <div className="text-sm flex flex-row justify-center my-4 items-center gap-4">
              <ViewSwitch />
              <ListLength
                selectedKey={pageMaxResults}
                onSelectionChange={handleMaxResultsChange}
              />
              <ListSortBy
                selectedKey={pageOrdering}
                onSelectionChange={handleOrderingChange}
              />
            </div>
            <div className="">
              <ColumnFilterList
                selectedKeys={filterKeys}
                onSelectionChange={handleFilterChange}
                selectionMode="multiple"
              />
            </div>
          </section>

          {/* <section aria-label="Search Results Summary">
            <p>Filter: {filterKeys && [...filterKeys].join(", ")}</p>
            <p>Max Num: {pageMaxResults}</p>
            <p>Current Page: {currentPage}</p>
          </section> */}

          <section aria-label="pagination" className="flex justify-center my-4">
            <Pagination
              totalCount={data.count}
              pageSize={pageMaxResults}
              onPageChange={handlePageChange}
              siblingCount={1}
              currentPage={currentPage}
            />
          </section>

          {!loadStatus && (
            <section aria-label="result table">
              <table className="">
                <thead>
                  <tr className="">
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
                  {data.results.map((item, i: number) => (
                    <tr key={item.id}>
                      <td>{i + 1 + (currentPage - 1) * pageMaxResults}</td>
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
                          {item.text.autor
                            .map((autor) => autor.name)
                            .join(", ")}
                        </td>
                      )}
                      {item.text?.title && filterKeys.includes("title") && (
                        <td>
                          <a href={getPermaLink(item.id)} target="_blank">
                            {item.text.title}
                          </a>
                        </td>
                      )}
                      {/* beim sortieren nicht wirklich sortiert: // text?.start_date */}
                      {item.start_date && filterKeys.includes("start_date") && (
                        <td>{item.start_date}</td>
                      )}

                      {/* beim sortieren nicht wirklich sortiert: // text?.end_date */}
                      {item.end_date && filterKeys.includes("end_date") && (
                        <td>{item.end_date}</td>
                      )}
                      {/* <td>{item.summary}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}
    </section>
  );
}
