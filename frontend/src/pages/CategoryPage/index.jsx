import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./index.scss";
import { useLocation, useParams } from "react-router-dom";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/DateRangePicker/styles/index.css";
import RangeSlider from "rsuite/RangeSlider";
import "rsuite/RangeSlider/styles/index.css";
import SelectPicker from "rsuite/SelectPicker";
import "rsuite/SelectPicker/styles/index.css";
import Pagination from "rsuite/Pagination";
import "rsuite/Pagination/styles/index.css";
import Card from "../../components/Card";
import { fetchContext } from "../../contexts/FetchProvider";
import { getFetch } from "../../helpers/FetchHelper";
import { tokenContext } from "../../contexts/TokenProvider";
import { wishlistContext } from "../../contexts/WishlistProvider";
import { date } from "yup";

function CategoryPage({ type }) {
  const [sliderRange, setSliderRange] = useState([0, 50]);
  const [dateRange, setDateRange] = useState(null);
  const [placeFilter, setPlaceFilter] = useState(null);
  const [Search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const { apiPlaces, apiCategories } = useContext(fetchContext);
  const { wishlist } = useContext(wishlistContext);
  const { id } = useParams();
  const location = useLocation();

  const [Events, setEvents] = useState([]);
  const [Filtered, setFiltered] = useState([]);

  useEffect(() => {
    type === "wishlist"
      ? setEvents(wishlist)
      : !id
      ? getFetch("http://localhost:3000/events", setEvents)
      : getFetch(`http://localhost:3000/events/find/${id}`, setEvents);
  }, [id, location, wishlist]);

  const category = apiCategories.find((item) => item._id == id);

  const dateFilter = (item) => {
    const date = item.date.split(",");

    return dateRange
      ? date[0] <= dateRange[1] && date[1] >= dateRange[0]
      : true;
  };

  useEffect(() => {
    setFiltered(
      Events.filter(
        (item) =>
          item.price >= sliderRange[0] &&
          item.price <= sliderRange[1] &&
          (item.place_id === placeFilter || placeFilter === null) &&
          dateFilter(item) &&
          item.name.toLowerCase().includes(Search.toLowerCase())
      )
    );
  }, [Events, sliderRange, dateRange, placeFilter, Search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setActivePage(1);
  };

  const handleSubmit = (cb, data) => {
    setActivePage(1);
    cb(data);
  };

  return (
    <>
      <Helmet>
        <title>
          {type === "wishlist"
            ? "Wishlist"
            : !id
            ? "All events"
            : category?.name}
        </title>
      </Helmet>
      <div className="category">
        <div className="container-1200">
          <div className="category__header category__element">
            {type === "wishlist"
              ? "Wishlist"
              : !id
              ? "All events"
              : category?.name}
          </div>
          <div className="category__control category__element">
            <div className="category__picker category__control__item">
              <SelectPicker
                size="lg"
                placeholder="Choose venue"
                data={apiPlaces}
                valueKey="_id"
                labelKey="name"
                block
                onChange={(data) => handleSubmit(setPlaceFilter, data)}
              />
            </div>
            <div className="category__calendar category__control__item">
              <DateRangePicker
                size="lg"
                format="dd.MM.yyyy"
                block
                ranges={[]}
                showHeader={false}
                onChange={(date) => {
                  if (!!date) {
                    const d0 = new Date(date[0]);
                    const d1 = new Date(date[1]);
                    const d0p = Date.parse(
                      `${d0.getFullYear()}-${d0.getMonth()}-${d0.getDate()}`
                    );
                    const d1p = Date.parse(
                      `${d1.getFullYear()}-${d1.getMonth()}-${d1.getDate()}`
                    );
                    setDateRange([d0p, d1p]);
                  } else {
                    setDateRange(null);
                  }
                }}
              />
            </div>
            <div className="category__slider rs-input-group category__control__item">
              <div>
                Price from {sliderRange[0]} ₼ to {sliderRange[1]} ₼
              </div>
              <RangeSlider
                className="category__slider__item"
                max={50}
                defaultValue={[0, 50]}
                color={"#ffdd00"}
                onChange={(data) => handleSubmit(setSliderRange, data)}
              />
            </div>
          </div>
          <div className="category__search rs-input-group">
            <input
              type="text"
              placeholder="Search"
              value={Search}
              onChange={handleSearch}
            />
          </div>
          <div className="category__body category__element">
            {Filtered &&
              Filtered.slice((activePage - 1) * 6, activePage * 6).map(
                (item) => <Card item={item} key={item._id} />
              )}
            {console.log(Filtered, Filtered.length)}
            {Filtered.length === 0 && (
              <div className="category__is-empty">
                {type === "wishlist"
                  ? "Wishlist"
                  : !id
                  ? "All events"
                  : category?.name}
                 {" "}is Empty
              </div>
            )}
          </div>
          {Filtered.length > 6 && (
            <div className="category__pagination">
              <Pagination
                prev
                last
                next
                first
                size="lg"
                total={Filtered.length}
                limit={6}
                activePage={activePage}
                onChangePage={setActivePage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
