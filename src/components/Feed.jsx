import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { API_KEY, value_converter } from "../data";
import { YoutubeContext } from "../context/YotubeContext";

const Feed = () => {
  const [data, setData] = useState([]);
  const { category, searchQuery } = useContext(YoutubeContext);

  // Fetch the data when category changes
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
      );
      const result = await response.json();
      if (result.items) {
        setData(result.items);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  // Filter data based on the search query
  const filteredData = data.filter((item) =>
    item.snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRelativeTime = (isoDate) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const timeUnits = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "week", seconds: 604800 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 },
    ];

    for (const { unit, seconds } of timeUnits) {
      const value = Math.floor(diffInSeconds / seconds);
      if (value > 0) {
        return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
          -value,
          unit
        );
      }
    }

    return "just now";
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredData.length === 0 ? (
        <p>No results found</p>
      ) : (
        filteredData.map((item, index) => (
          <Link
            to={`video/${item.snippet.categoryId}/${item.id}`}
            key={index}
            className="block overflow-hidden transition-shadow duration-200 rounded-lg shadow-lg hover:shadow-xl"
          >
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <Tooltip title={item.snippet.title}>
                <h3 className="text-lg font-semibold line-clamp-2">
                  {item.snippet.title}
                </h3>
              </Tooltip>
              <p className="mt-2 text-sm text-gray-500">
                {item.snippet.channelTitle}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {value_converter(item.statistics.viewCount)} views •{" "}
                {getRelativeTime(item.snippet.publishedAt)}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Feed;
