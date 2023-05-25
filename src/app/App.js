import React from 'react';
import './App.css';
import { SearchBar } from '../features/searchBar/SearchBar';
import { CircularIndeterminate } from '../features/loading/LoadingSpinner';
import { useDataContext } from './appContext';
import { ErrorMessage } from '../features/searchBar/error/Error'
import { BasicTabs } from '../features/tabs/Tabs';


/**
 * App entry point. 
 * @returns
 *  the search bar, loading icon and table component trees
 */

export default function App() {
  const { isFileError, isConfigError, isLoading, isDataError, tabledata } = useDataContext();
  const error = isFileError || isConfigError || isDataError;
  console.log("app rerendered");

  if (error) {
    return (
      <div className="App">
        <header className="App-header">

          <h1>Config report</h1>
          <ErrorMessage />
          <div data-testid="searchBar">
            <SearchBar />
          </div>
        </header>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">

          <h1>Config report</h1>

          <div data-testid="searchBar">
            <SearchBar />
            <CircularIndeterminate />
          </div>
        </header>
      </div>
    )
  }


  return (
    <div className="App">
      <header className="App-header">

        <h1>Config report</h1>
        <div data-testid="searchBar">
          <SearchBar />
        </div>
        <div>
          {tabledata && <BasicTabs />}
        </div>

      </header>
    </div>
  )
}
