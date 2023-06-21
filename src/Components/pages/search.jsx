import React, { useState, useEffect, useCallback } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { debounce } from "lodash"; // import the debounce function from the lodash library
import { db } from "../../firebase-config"; // import your Firebase Firestore instance

const Search = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query) {
        const studentsQuery = query(
          collection(db, "user-details")
        );
        const unsubscribe = onSnapshot(studentsQuery, (snapshot) => {
          let studentList = [];
          snapshot.docs.forEach((doc) => {
            studentList.push({ ...doc.data(), id: doc.id });
          });
          setSearchResults(studentList);
        });
        console.log("Data from user details retrieved");
        return () => unsubscribe(); // unsubscribe from the query when the component unmounts
      } else {
        setSearchResults([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      <button onClick={handleSearchChange}>search</button>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
