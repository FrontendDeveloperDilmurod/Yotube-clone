import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            const fetchSearchResults = async () => {
                const response = await fetch(
                    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
                        query
                    )}&key=YOUR_API_KEY`
                );
                const data = await response.json();
                setResults(data.items || []);
            };
            fetchSearchResults();
        }
    }, [query]);

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">Search Results for "{query}"</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {results.map((result) => (
                    <div key={result.id.videoId} className="rounded-lg shadow-lg">
                        <img
                            src={result.snippet.thumbnails.medium.url}
                            alt={result.snippet.title}
                            className="object-cover w-full h-48"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">{result.snippet.title}</h3>
                            <p className="text-sm text-gray-600">
                                {result.snippet.channelTitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
