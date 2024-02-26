import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResultTable from "./components/SearchResultTable";
import { MMPResult } from "./types";
import "./App.css";

import "@fontsource/lato";

function App() {
  const [results, setResults] = useState<
    { count: number; results: MMPResult[] } | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(0);

  // const [selected, setSelected] = useState(new Set(["titel"]));

  const [selected, setSelected] = useState(["titel"]);
  const [maxResults, setMaxResults] = useState(20);

  const handleSearch = async (searchTerm: string, maxResults: number) => {
    try {
      setLoading(true);
      const startTime = new Date().getTime();
      const response = await fetch(
        `https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?zitat=${searchTerm}&limit=${maxResults}&zitat_lookup=icontains`,
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
      setLastSearchTerm(searchTerm);
    } catch (error) {
      console.error("Error from MMP-Server:", error);
      setError(
        `Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut. `,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">MMP Zitat Suche</h1>
      <SearchBar
        label="Suche"
        name="Suche"
        onChange={setSearchTerm}
        onSubmit={() => handleSearch(searchTerm, maxResults as number)}
        description="Durchsuche die MMP Zitat Bibliothek"
        autoFocus={true}
        autoComplete="on"
      />
      {loading && <p>Suche Zitat...</p>}
      <SearchResultTable
        results={results}
        error={error}
        searchTerm={lastSearchTerm}
        loadTime={loadTime}
        filterSelectedKeys={selected}
        filterSetSelectedKeys={setSelected}
        pageMaxResults={maxResults}
        pageSetMaxResults={setMaxResults}
      />
    </>
  );
}

export default App;
