import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { tokenContext } from "../../contexts/TokenProvider";
import { deleteFetch, getFetch } from "../../helpers/FetchHelper";
import AdminUsersModal from "../AdminUsersModal";
import toast, { Toaster } from "react-hot-toast";

function AdminUsers() {
  const [isModal, setIsModal] = useState(null);
  const [Users, setUsers] = useState([]);
  const { token } = useContext(tokenContext);

  useEffect(() => {
    getFetch("http://localhost:3000/users/", setUsers, token);
  }, [isModal]);

  const deletePost = async (id) => {
    await deleteFetch("http://localhost:3000/users/", id, token);
    getFetch("http://localhost:3000/users/", setUsers, token);
    toast.success("Deleted");
  };

  const handleEdit = (id) => {
    const data = Users.find((item) => item._id === id);
    setIsModal(data);
  };

  const handleAdd = () => {
    setIsModal({
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      role: "",
    });
  };

  return (
    <>
      <Helmet>
        <title>Users | Admin Panel</title>
      </Helmet>
      <Toaster />
      <div className="admin-page">
        {isModal ? (
          <AdminUsersModal setIsOpen={setIsModal} values={isModal} />
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
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Control</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((item) => (
                <tr key={item._id}>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.role}</td>
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

export default AdminUsers;
