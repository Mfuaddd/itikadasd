import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { fetchContext } from "../../contexts/FetchProvider";
import { tokenContext } from "../../contexts/TokenProvider";
import { deleteFetch } from "../../helpers/FetchHelper";
import AdminPlacesModal from "../AdminPlacesModal";
import toast, { Toaster } from "react-hot-toast";

function AdminPlaces() {
  const [isModal, setIsModal] = useState(null);
  const { getApiPlaces, apiPlaces } = useContext(fetchContext);
  const { token } = useContext(tokenContext);

  useEffect(() => {
    getApiPlaces();
  }, [isModal]);

  const deletePost = async (id) => {
    await deleteFetch("http://localhost:3000/places/", id, token);
    getApiPlaces();
    toast.success("Deleted");
  };

  const handleEdit = (id) => {
    const data = apiPlaces.find((item) => item._id === id);
    setIsModal(data);
  };

  const handleAdd = () => {
    setIsModal({
      address: "",
      image: "",
      link: "",
      location: "",
      mobile: "",
      name: "",
      phone: "",
    });
  };

  return (
    <>
      <Helmet>
        <title>Places | Admin Panel</title>
      </Helmet>
      <Toaster />
      <div className="admin-page">
        {isModal ? (
          <AdminPlacesModal setIsOpen={setIsModal} values={isModal} />
        ) : null}
        <div className="admin-page__header">
          <div className="admin-page__logo">Places</div>
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
                {/* <th>Location Api</th> */}
                <th>Phone</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Map Link</th>
                <th>Control</th>
              </tr>
            </thead>
            <tbody>
              {apiPlaces.map((item) => (
                <tr key={item._id}>
                  <td className="admin-page__table__image">
                    <img src={item.image} alt="" />
                  </td>
                  <td>{item.name}</td>
                  {/* <td>
                    <a href={item.location}>link</a>
                  </td> */}
                  <td>{item.phone}</td>
                  <td>{item.mobile}</td>
                  <td>{item.address}</td>
                  <td>
                    <a href={item.link} target="_blank">link</a>
                  </td>
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

export default AdminPlaces;
