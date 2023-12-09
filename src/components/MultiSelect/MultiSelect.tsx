import React, { FC } from "react";
import "./MultiSelect.css";
import Search from "./components/Search/Search";
import { useMultiSelect } from "./hooks/useMultiSelect";
import Loading from "../Loading/Loading";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const MultiSelect: FC = () => {
  const {
    updateSearchTerm,
    updateSelectedItems,
    onFilterItems,
    loading,
    selectedItems,
  } = useMultiSelect();
  const filteredItems = onFilterItems();
  const renderCheckboxes = () => {
    return (
      <div className="checkboxes">
        {selectedItems.length > 0 && (
          <>
            {selectedItems.map((item, index) => {
              return (
                <div key={`${item.id}`} className="checkboxContainer">
                  <input
                    onChange={(e) => {
                      updateSelectedItems(e.target.checked, item);
                    }}
                    checked
                    id={`${item.id}`}
                    type="checkbox"
                  />
                  <label htmlFor={`${item.id}`}>{item.title}</label>
                </div>
              );
            })}
          </>
        )}
        {filteredItems.map((item, index) => {
          return (
            <div key={`${item.id}`} className="checkboxContainer">
              <input
                onChange={(e) => {
                  updateSelectedItems(e.target.checked, item);
                }}
                id={`${item.id}`}
                type="checkbox"
              />
              <label htmlFor={`${item.id}`}>{item.title}</label>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="multiselect">
        <h3>Kategoriler</h3>
        <Search setValue={updateSearchTerm} />
        <ErrorBoundary>
          {loading ? <Loading /> : renderCheckboxes()}
        </ErrorBoundary>
        <div className="buttonContainer">
          <button className="button">Ara</button>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
