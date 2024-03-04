import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { fetchContext } from "../../contexts/FetchProvider";
import { tokenContext } from "../../contexts/TokenProvider";
import { deleteFetch } from "../../helpers/FetchHelper";
import AdminCategoriesModal from "../AdminCategoriesModal";
import toast, { Toaster } from "react-hot-toast";

function AdminCategories() {
  const [isModal, setIsModal] = useState(null);
  const { getApiCategories, apiCategories } = useContext(fetchContext);
  const { token } = useContext(tokenContext);

  useEffect(() => {
    getApiCategories();
  }, [isModal]);

  const deletePost = async (id) => {
    await deleteFetch("http://localhost:3000/categories/", id, token);
    getApiCategories();
    toast.success("Deleted");
  };

  const handleEdit = (id) => {
    const data = apiCategories.find((item) => item._id === id);
    setIsModal(data);
  };

  const handleAdd = () => {
    setIsModal({
      name: "",
      index: "",
    });
  };

  return (
    <>
      <Helmet>
        <title>Categories | Admin Panel</title>
      </Helmet>
      <div className="admin-page">
        <Toaster />
        {isModal ? (
          <AdminCategoriesModal setIsOpen={setIsModal} values={isModal} />
        ) : null}
        <div className="admin-page__header">
          <div className="admin-page__logo">Categories</div>
          <div className="admin-page__control">
            <div onClick={handleAdd}>Add</div>
          </div>
        </div>
        <div className="admin-page__table table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Index</th>
                <th>Control</th>
              </tr>
            </thead>
            <tbody>
              {apiCategories.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.index}</td>
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

export default AdminCategories;
