import React, { useContext, useState } from "react";
import { tokenContext } from "../../contexts/TokenProvider";
import toast from "react-hot-toast";

function AdminPlacesModal({ setIsOpen, name, values }) {
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

  //.replace(/!1d[a-zA-Z0-9_.-]*!/g, "!1d5000!")

  const postFetch = async () => {
    const formData = new FormData();
    Object.keys(input).forEach((element) => {
      if (element === "location") {
        formData.append(
          element,
          input[element].slice(
            input[element].indexOf(`src="`) + 5,
            input[element].indexOf(`"`, 13)
          )
          .replace(/!1d[a-zA-Z0-9_.-]*!/g, "!1d3000!")
        );
      } else {
        formData.append(element, input[element]);
      }
    });
    await fetch("http://localhost:3000/places/", {
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
      if (element === "location" && !input[element].startsWith("http")) {
        formData.append(
          element,
          input[element].slice(
            input[element].indexOf(`src="`) + 5,
            input[element].indexOf(`"`, 13)
          )
          .replace(/!1d[a-zA-Z0-9_.-]*!/g, "!1d3000!")
        );
      } else {
        formData.append(element, input[element]);
      }
    });
    await fetch(`http://localhost:3000/places/${id}`, {
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
              <label htmlFor="location">Location Api</label>
              <input
                type="text"
                id="location"
                value={input["location"]}
                onChange={handleChange}
              />
            </div>
            <div className="admin-modal__form__item">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                value={input["phone"]}
                onChange={handleChange}
              />
            </div>
            <div className="admin-modal__form__item">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                id="mobile"
                value={input["mobile"]}
                onChange={handleChange}
              />
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={input["address"]}
                onChange={handleChange}
              />
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="link">Link Map</label>
              <input
                type="text"
                id="link"
                value={input["link"]}
                onChange={handleChange}
              />
            </div>

            <div className="admin-modal__form__item">
              <label htmlFor="image">Image</label>
              <input type="file" id="image" onChange={handleChange} />
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

export default AdminPlacesModal;
