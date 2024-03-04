import React, { useContext, useState } from "react";
import { fetchContext } from "../../contexts/FetchProvider";
import { tokenContext } from "../../contexts/TokenProvider";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/DateRangePicker/styles/index.css";
import toast from "react-hot-toast";

function AdminEventsModal({ setIsOpen, name, values }) {
  const { apiCategories, apiPlaces } = useContext(fetchContext);
  const { token } = useContext(tokenContext);
  const [input, setInput] = useState(values);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      input[e.target.id] = e.target.files[0];
    } else {
      input[e.target.id] = e.target.value;
    }
    setInput({ ...input });
  };

  const handleDate = (date) => {
    if (!!date) {
      const d0 = new Date(date[0]);
      const d1 = new Date(date[1]);
      const d0p = Date.parse(
        `${d0.getFullYear()}-${d0.getMonth()}-${d0.getDate()}`
      );
      const d1p = Date.parse(
        `${d1.getFullYear()}-${d1.getMonth()}-${d1.getDate()}`
      );
      input["date"] = date ? [d0p, d1p] : "";
      setInput({ ...input });
    }
  };

  const dateValue = () => {
    const data = !!values._id
      ? input.date.split(",").map((d) => new Date(+d))
      : "";
    console.log(data);
    return data;
  };

  const postFetch = async () => {
    const formData = new FormData();
    Object.keys(input).forEach((element) => {
      formData.append(element, input[element]);
    });
    await fetch("http://localhost:3000/events/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).catch((err) => console.error(err.message));
  };

  const putFetch = async (id) => {
    const formData = new FormData();
    Object.keys(input).forEach(async (element) => {
      formData.append(element, input[element]);
    });
    await fetch(`http://localhost:3000/events/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).catch((err) => console.error(err.message));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    !values._id ? await postFetch() : await putFetch(values._id);
    setIsOpen(false);
    toast.success(!values._id ? "Added" : "Saved");
  };

  // console.log(input);
  // console.log([new Date("2017-02-01"), new Date("2017-05-20")]);

  return (
    <div className="admin-modal">
      <div className="admin-modal__content">
        <div className="admin-modal__header">
          <div>{!values._id ? "Add" : "Edit"}</div>
          <div className="admin-modal__close" onClick={() => setIsOpen(false)}>
            &times;
          </div>
        </div>
        <div className="admin-modal__body">
          <form className="admin-modal__form" onSubmit={handleSubmit}>
            <div className="admin-modal__form__item">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={input["name"]}
                onChange={handleChange}
              />
            </div>
            <div className="admin-modal__form__item">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                value={input["price"]}
                onChange={handleChange}
              />
            </div>
            <div className="admin-modal__form__item">
              <label htmlFor="price">Date</label>
              <DateRangePicker
                size="lg"
                format="dd.MM.yyyy"
                block
                ranges={[]}
                defaultValue={dateValue}
                showHeader={false}
                onChange={handleDate}
              />
            </div>
            <div className="admin-modal__form__item">
              <label htmlFor="about">About</label>
              <input
                type="text"
                id="about"
                value={input["about"]}
                onChange={handleChange}
              />
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                value={input["age"]}
                onChange={handleChange}
              />
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="language">Language</label>
              <input
                type="text"
                id="language"
                value={input["language"]}
                onChange={handleChange}
              />
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="img_fr">Card Front</label>
              <input type="file" id="img_fr" onChange={handleChange} />
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="img_bg">Card Back</label>
              <input type="file" id="img_bg" onChange={handleChange} />
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="detail_img">Detail Image</label>
              <input type="file" id="detail_img" onChange={handleChange} />
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="slide_img">Slide Image</label>
              <input type="file" id="slide_img" onChange={handleChange} />
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="category_id">Category</label>
              <select
                className="admin-modal__form__select"
                id="category_id"
                onChange={handleChange}
                defaultValue={input.category_id}
              >
                <option value="" disabled>
                  -- select an option --
                </option>
                {apiCategories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="place_id">Place</label>
              <select
                className="admin-modal__form__select"
                id="place_id"
                onChange={handleChange}
                defaultValue={input.place_id}
              >
                <option value="" disabled>
                  -- select an option --
                </option>
                {apiPlaces.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              className="admin-modal__form__submit"
              value={!values._id ? "Add" : "Edit"}
            />
          </form>
        </div>
        <div className="admin-modal__footer"></div>
      </div>
    </div>
  );
}

export default AdminEventsModal;
