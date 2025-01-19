
import { createContext, useState } from "react";

export const YoutubeContext = createContext();

const YoutubeContextProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [category, setCategory] = useState(0);
  const [apidata, setApiData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  const value = {
    sidebar,
    setSidebar,
    category,
    setCategory,
    apidata,
    setApiData,
    searchQuery,
    setSearchQuery,
  };
  return (
    <YoutubeContext.Provider value={value}>{children}</YoutubeContext.Provider>
  );
};
export default YoutubeContextProvider;
