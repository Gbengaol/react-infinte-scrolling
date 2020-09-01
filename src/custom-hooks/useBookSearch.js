import { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [firstLanding, setFirstLanding] = useState(true);
  useEffect(() => {
    setBooks([]);
  }, [query]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://openlibrary.org/search.json",
      params: {
        page: pageNumber,
        q: query,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((books) => [
          ...new Set([
            ...books,
            ...res.data.docs.map((b) => {
              return {
                title: b.title,
                publisher: b.publisher,
                publish_date: b.publish_date,
              };
            }),
          ]),
        ]);
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
        setFirstLanding(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
        setLoading(false);
      });

    return () => cancel();
  }, [query, pageNumber]);
  return {
    loading,
    error,
    books,
    hasMore,
    firstLanding,
  };
}
