import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import { Button, Container, Grid } from "@mui/material";
// import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import {
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import CreateFormDialog from "./CreateFormDialog";
import CreateElement from "./CreateElement";
import EmptyPage from "./EmptyPage";

function CreateForm({ isOpenDialog, setIsOpenDialog }) {
  const [formInputDetails, setFormInputDetails] = useState("");

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleFormSave = () => {
    let localStorageFormValues =
      JSON.parse(localStorage.getItem("forms")) || [];
    localStorageFormValues.push(formInputDetails);
    localStorage.setItem("forms", JSON.stringify(localStorageFormValues));
    window.location.reload();
  };

  console.log("isOpenDialog", isOpenDialog);
  return (
    <Box
      sx={{
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        background: "#edefef3b",
        border: "1px solid #f3f3f3",
      }}
    >
      {formInputDetails?.formElements?.length ? (
        formInputDetails?.formElements?.map((element) => (
          <div style={{ border: "1px solid red !important", margin: "10px" }}>
            <CreateElement element={element} />
          </div>
        ))
      ) : (
        <EmptyPage />
      )}

      {formInputDetails?.formElements?.length ? (
        <Button variant="outlined" onClick={handleFormSave}>
          Save
        </Button>
      ) : (
        <></>
      )}
      <CreateFormDialog
        isOpenDialog={isOpenDialog}
        handleCloseDialog={handleCloseDialog}
        setIsOpenDialog={setIsOpenDialog}
        setFormInputDetails={setFormInputDetails}
      />
    </Box>
  );
}

export default CreateForm;
