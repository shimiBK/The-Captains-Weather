import { useContext, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { locationContext } from "../context/locationContext";
import { AUTOCOMPLETE_API_URL } from "../utils/api";
import { API_KEY } from "../utils/api";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import axios from "axios";


// eslint-disable-next-line react/prop-types
const Search = () => {
  const [search, setSearch] = useState(null);
  const { setLocationData } = useContext(locationContext);
  
 

  const loadOptions = async (inputValue) => {
    try {
      const res = await axios.get(
        `${AUTOCOMPLETE_API_URL}?apikey=${API_KEY}&q=${inputValue}`
      );
      if (res.data) {
        const options = res.data.map((obj) => {
          return {
            value: obj.Key,
            label: `${obj.LocalizedName}, ${obj.Country.LocalizedName}`,
          };
        });
        return {
          options: options,
        };
      } else {
        return {
          options: [],
        };
      }
    } catch (error) {
      toast.error("Error occured while trying to load locations");
      return {
        options: [],
      };
    }
  };
  


  const handleOnChange = (searchData) => {
    setSearch(searchData);
    setLocationData(searchData);
  };

  return (
    <Box data-testid="search">
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
    </Box>
  );
};

export default Search;
