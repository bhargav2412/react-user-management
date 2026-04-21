import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import AddEditUser from "./pages/AddEditUser";
import MainLayout from "./layout/MainLayout";

import { useRef } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

function App() {
  const toast = useRef(null);

  return (
    <BrowserRouter>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<UserList toast={toast} />} />
          <Route path="/add-user" element={<AddEditUser toast={toast} />} />
          <Route
            path="/edit-user/:id"
            element={<AddEditUser toast={toast} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
