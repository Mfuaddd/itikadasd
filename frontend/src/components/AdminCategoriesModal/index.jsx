import React, { useContext, useState } from "react";
import { tokenContext } from "../../contexts/TokenProvider";
import toast from "react-hot-toast";

function AdminCategoriesModal({ setIsOpen, name, values }) {
  const { token } = useContext(tokenContext);
  const [input, setInput] = useState(values);

  const handleChange = (e) => {
    input[e.target.id] = e.target.value;
    setInput({ ...input });
  };

  const postFetch = async () => {
    await fetch("http://localhost:3000/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }).catch((err) => console.error(err.message));
  };

  const putFetch = async (id) => {
    await fetch(`http://localhost:3000/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
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
              <label htmlFor="index">Index</label>
              <input
                type="number"
                id="index"
                value={input["index"]}
                onChange={handleChange}
              />
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

export default AdminCategoriesModal;
