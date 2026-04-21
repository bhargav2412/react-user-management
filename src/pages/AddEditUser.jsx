import { use, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../validations/userSchema";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

const AddEditUser = ({ toast }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (id) {
        await api.put(`/users/${id}`, data);
        toast.current.show({
          severity: "success",
          summary: "User Updated",
          detail: "User details updated successfully",
          life: 3000,
        });
      } else {
        await api.post("/users", data);
        toast.current.show({
          severity: "success",
          summary: "User Added",
          detail: "User added successfully",
          life: 3000,
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  useEffect(() => {
    if (id) {
      api
        .get(`/users/${id}`)
        .then((response) => {
          console.log("Edit User Response", response);
          const user = response.data;
          setValue("name", user.name);
          setValue("username", user.username);
          setValue("email", user.email);
          setValue("age", user.age);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  });

  return (
    <div>
      <h2>{id ? "Edit User" : "Add User"}</h2>
      <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Name</label>
          <InputText
            {...register("name")}
            className={errors.name ? "p-invalid" : ""}
          />
          <small className="p-error">{errors.name?.message}</small>
        </div>
        <div className="field">
          <label>Username</label>
          <InputText
            {...register("username")}
            className={errors.username ? "p-invalid" : ""}
          />
          <small className="p-error">{errors.username?.message}</small>
        </div>
        <div className="field">
          <label>Email</label>
          <InputText
            {...register("email")}
            className={errors.email ? "p-invalid" : ""}
          />
          <small className="p-error">{errors.email?.message}</small>
        </div>
        <div className="field">
          <label>Age</label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <InputNumber
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                className={errors.age ? "p-invalid" : ""}
              />
            )}
          />
          <small className="p-error">{errors.age?.message}</small>
        </div>

        <Button label={id ? "Update" : "Add"} icon="pi pi-check" />
      </form>
    </div>
  );
};

export default AddEditUser;
