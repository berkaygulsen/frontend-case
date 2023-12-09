import React, { FC, useState, useCallback } from "react";
import { ReactComponent as SearchIcon } from "../../../../assets/search.svg";

type SearchProps = {
  setValue: (value: string) => void;
};
const Search: FC<SearchProps> = ({ setValue }) => {
  return (
    <div className="inputGroup">
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Kategori ara..."
      />
      <div className="searchIcon">
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
