import React, { useState, useRef, useCallback } from "react";
import useBookSearch from "./custom-hooks/useBookSearch";
import "./app.css";
import Card from "./card.component";
import Loading from "./loading.component";
import ThemeToggler from "./ThemeToggler/ThemeToggler.component";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, books, hasMore, firstLanding } = useBookSearch(
    query,
    pageNumber
  );

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((pageNumber) => pageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };
  return (
    <div className="w-100">
      <ThemeToggler />
      <input
        value={query}
        type="search"
        onChange={handleSearch}
        placeholder="Search for any book..."
      />
      <div className="card-layout">
        {books.map((book, i) => {
          if (books.length === i + 1) {
            return (
              <Card
                reference={lastBookElementRef}
                key={`${book.title}${i}`}
                book={book}
              />
            );
          } else {
            return <Card key={`${book.title}${i}`} book={book} />;
          }
        })}
      </div>
      <div>{loading && !firstLanding && <Loading />}</div>
      <div>
        {error && (
          <div>
            <h3 className="error-text">An error occured</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
