import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResultTable from "./components/SearchResultTable";
import { MMPResult } from "./types";
import "./App.css";

import "@fontsource/lato";

interface SearchResults {
  count: number;
  next: string;
  previous: string;
  results: MMPResult[];
}

function App() {
  //basic
  const [results, setResults] = useState<SearchResults | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSearchTerm, setNewSearchTerm] = useState("");
  const [lastsearchTerm, setLastSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(0);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  //filter
  const [selected, setSelected] = useState(["title"]);
  const [maxResults, setMaxResults] = useState(20);

  useEffect(() => {
    const handleSearch = async (
      searchTerm: string,
      maxResults: number,
      offset: number,
    ) => {
      console.log(
        "handleSearch got triggered:",
        "searchTerm:",
        searchTerm,
        "maxResults:",
        maxResults,
        "offset:",
        offset,
        "currentPage:",
        currentPage,
      );
      try {
        setLoading(true);
        const startTime = new Date().getTime();
        const response = await fetch(
          `https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?zitat=${searchTerm}&limit=${maxResults}&offset=${offset}&zitat_lookup=icontains`,
          // ordering = zitat
          // ordering = -zitat
        );
        const endTime = new Date().getTime();
        const timeDiff = (endTime - startTime) / 1000;
        setLoadTime(timeDiff);

        if (!response.ok) {
          throw new Error("Error: Got no response from server.");
        }

        const data = await response.json();
        console.log("recieved data:", data);

        setResults(data);
      } catch (error) {
        console.error("Error from MMP-Server:", error);
        setError(
          `Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut. `,
        );
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm !== "") {
      handleSearch(searchTerm, maxResults, offset);
    }
  }, [currentPage, maxResults, offset, searchTerm]);

  if (lastsearchTerm !== searchTerm) {
    console.log("new search, resetting");
    setCurrentPage(1);
    setOffset(0);
    setLastSearchTerm(searchTerm);
  }

  const handlePageChange = (page: number | string) => {
    const totalPageCount = results?.count
      ? Math.ceil(results?.count / maxResults)
      : 1;

    if (typeof page === "number") {
      if (page < 1) {
        page = totalPageCount;
      } else if (page > totalPageCount) {
        page = 1;
      }
      setCurrentPage(page);
      setOffset((page - 1) * maxResults);
    }
  };

  return (
    <main className="w-full flex justify-center ">
      <div className=" min-w-100 w-full max-w-screen-xl center bg-gray-50 mt-8 mx-4">
        <h1 className="line-clamp-1 mb-8 text-center">
          Mapping Medieval Peoples (MMP) - Zitat Suche
        </h1>
        <SearchBar
          label="Suche"
          name="Suche"
          onChange={setNewSearchTerm}
          onSubmit={() => setSearchTerm(newSearchTerm)}
          // onSubmit={() => handleSearch(newSearchTerm, maxResults, offset)}
          description="Durchsuche die MMP Zitat Datenbank"
          autoFocus={true}
          autoComplete="on"
        />

        {loading && <p className="absolute">Suche Zitat...</p>}

        <SearchResultTable
          data={results}
          error={error}
          searchTerm={searchTerm}
          loadStatus={loading}
          loadTime={loadTime}
          filterSelectedKeys={selected}
          filterSetSelectedKeys={setSelected}
          pageMaxResults={maxResults}
          pageSetMaxResults={setMaxResults}
          currentPage={currentPage}
          // currentOffset={offset}
          handlePageChange={handlePageChange}
        />
      </div>
    </main>
  );
}

export default App;
