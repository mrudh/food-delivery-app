import RestaurantCard from "./RestaurantCard";
// import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();

        //console.log(json);
        setListOfRestaurants(
          json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        setFilteredRestaurant(
          json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
    };

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) {
      return (
        <h1>
          Looks like you're offline!! Please check your internet connection;
        </h1>   
      )
    }

    //Conditional rendering
   return listOfRestaurants.length === 0 ? (
         <Shimmer/>
    ):
    (
        <div className="body">
            <div className="filter">
              <div className="search m-4 p-4">
                  <input
                    type="text"
                    className="search-box"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      console.log(searchText);

                      const filteredRestaurant = listOfRestaurants.filter((res) =>
                        res?.info.name.toLowerCase().includes(searchText.toLowerCase())
                      );

                      setFilteredRestaurant(filteredRestaurant);
                    }}
                  >
                    Search
                  </button>
              </div>
              <button
                className="filter-btn"
                onClick={() => {
                  const filteredList = listOfRestaurants.filter(
                    (res) => res?.info.avgRating > 4
                  );
                  console.log(listOfRestaurants.filter(
                    (res) => res?.info.avgRating > 4
                  ));
                  //setListOfRestaurants(filteredList);
                  setFilteredRestaurant(filteredList);
                }}
              >
                Top Rated Restaurants
              </button>
            </div>
            <div className="res-container">
                {filteredRestaurant.map((restaurant) => (
                    // <RestaurantCard key={restaurant.data.id} resData={restaurant}/>
                    <Link key={restaurant?.info.id} to={"/restaurants/" + restaurant?.info.id}>
                      <RestaurantCard resData={restaurant?.info}/>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;