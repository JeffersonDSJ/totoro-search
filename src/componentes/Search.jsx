import axios from "axios";
import { useState } from "react";
import totoro from "../assets/Totoro-PNG-Free-File-Download.png";

const Search = () => {
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const URL = "http://localhost:4000/search";

      const res = await axios.get(URL, {
         params:{
           query: query
         }
      });

      const data = res.data.organic_results || [];
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Totoro não encontrou sua busca");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="title">
        <h1>The Search Totoro</h1>
        <img src={totoro} alt="totoro" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <div>
          {error ? (
            <h3>{error}</h3>
          ) : loading ? (
            <h3>carregando...</h3>
          ) : (
            <ul>
           {results.map((results, index) => {
              return (
                <li key={index}>
                  <a
                    href={results.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {results.title}
                  </a>
                  <p>{results.snippet}</p>
                </li>
              );
            })}
            </ul>
          )}
        
      </div>
    </div>
  );
};

export default Search;
