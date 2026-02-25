
import React, { createContext, useContext, useState, ReactNode } from "react";

type SearchContextType = {
  term: string;
  setTerm: (t: string) => void;
};

const SearchContext = createContext<SearchContextType>({
  term: "",
  setTerm: () => {},
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [term, setTerm] = useState("");
  return (
    <SearchContext.Provider value={{ term, setTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
