import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { confirmDialog } from "primereact/confirmdialog"; // For confirmDialog method

const UserList = ({ toast }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    confirmDialog({
      message: "Are you sure you want to delete this user?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          await api.delete(`/users/${id}`);
          toast.current.show({
            severity: "success",
            summary: "User Deleted",
            detail: "User deleted successfully",
            life: 3000,
          });
          fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      },
    });
  };

  const actionTemplate = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        size="small"
        className="p-button-sm p-button-warning mr-2"
        onClick={() => navigate(`/edit-user/${rowData.id}`)}
      />
      <Button
        icon="pi pi-trash"
        size="small"
        className="p-button-sm p-button-danger"
        onClick={() => handleDelete(rowData.id)}
      />
    </>
  );

  return (
    <div>
      <div className="flex justify-content-end mb-2">
        <Button
          label="Add User"
          icon="pi pi-plus"
          size="small"
          onClick={() => navigate("/add-user")}
        />
      </div>
      <DataTable
        value={users}
        showGridlines
        stripedRows
        paginator
        rows={5}
        size="small"
        filterDisplay="row"
      >
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search"
          sortable
        ></Column>
        <Column
          field="username"
          header="Username"
          filter
          filterPlaceholder="Search"
          sortable
        ></Column>
        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Search"
          sortable
        ></Column>
        <Column
          field="age"
          header="Age"
          filter
          filterPlaceholder="Search"
          sortable
        ></Column>
        <Column
          header="Action"
          style={{ width: "13%" }}
          body={actionTemplate}
        ></Column>
      </DataTable>
    </div>
  );
};

export default UserList;
