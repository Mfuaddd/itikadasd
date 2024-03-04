import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { fetchContext } from "../../contexts/FetchProvider";
import { tokenContext } from "../../contexts/TokenProvider";
import { deleteFetch, getFetch } from "../../helpers/FetchHelper";
import AdminEventsModal from "../AdminEventsModal";
import toast, { Toaster } from "react-hot-toast";

function AdminEvents() {
  const [isModal, setIsModal] = useState(null);
  const { apiPlaces, apiCategories } = useContext(fetchContext);
  const { token } = useContext(tokenContext);
  const [Events, setEvents] = useState([]);

  useEffect(() => {
    getFetch("http://localhost:3000/events", setEvents);
  }, [isModal]);

  const deletePost = async (id) => {
    await deleteFetch("http://localhost:3000/events/", id, token);
    getFetch("http://localhost:3000/events", setEvents);
    toast.success("Deleted");
  };

  const handleEdit = (id) => {
    const data = Events.find((item) => item._id === id);
    setIsModal(data);
  };
  const handleAdd = () => {
    setIsModal({
      name: "",
      price: "",
      date: "",
      about: "",
      age: "",
      language: "",
      img_bg: "",
      img_fr: "",
      detail_img: "",
      slide_img: "",
      category_id: "",
      place_id: "",
    });
  };

  const findName = (array, id) => {
    return array.find((item) => item._id === id)?.name;
  };

  return (
    <>
      <Helmet>
        <title>Events | Admin Panel</title>
      </Helmet>
      <div className="admin-page">
        <Toaster />
        {isModal ? (
          <AdminEventsModal setIsOpen={setIsModal} values={isModal} />
        ) : null}
        <div className="admin-page__header">
          <div className="admin-page__logo">Users</div>
          <div className="admin-page__control">
            <div onClick={handleAdd}>Add</div>
          </div>
        </div>
        <div className="admin-page__table table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Place</th>
                <th>Category</th>
                <th>Age</th>
                <th>Language</th>
                <th>Control</th>
              </tr>
            </thead>
            <tbody>
              {Events.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div
                      className="admin-page__table__image"
                      style={{ backgroundImage: `url(${item.img_bg})` }}
                    >
                      <img src={item.img_fr} alt="" />
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{findName(apiPlaces, item.place_id)}</td>
                  <td>{findName(apiCategories, item.category_id)}</td>
                  <td>{item.age}</td>
                  <td>{item.language}</td>
                  <td>
                    <div className="admin-page__table__control">
                      <div
                        className="admin-page__table__edit"
                        onClick={() => handleEdit(item._id)}
                      >
                        Edit
                      </div>
                      <div
                        className="admin-page__table__delete"
                        onClick={() => deletePost(item._id)}
                      >
                        Delete
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminEvents;
