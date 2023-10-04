import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Button, Container, Grid, Chip } from "@mui/material";

function FormList({ setSelectedInputDetails, selectedFormInputDetails }) {
  const [formLists, setFormLists] = useState([]);
  const formsList = JSON.parse(localStorage.getItem("forms")) || [];

  useEffect(() => {
    setFormLists(formsList);
  }, []);

  const handleSelectForm = (selectedFormName) => {
    let selectedFormInputDetails = formLists.find(
      (item) => item.formName === selectedFormName
    );
    setSelectedInputDetails(selectedFormInputDetails);
  };

  return (
    <Box
      sx={{
        width: "30%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        background:"#edefef3b"
      }}
    >
      <h4>Your Created Forms Count {formLists.length}</h4>
      {formLists.map((items) => (
        <Chip
          label={items?.formName}
          onClick={() => handleSelectForm(items?.formName)}
          variant={
            selectedFormInputDetails?.formName !== items?.formName
              ? "outlined"
              : "filled"
          }
          color="primary"
          sx={{
            margin: "5px",
          }}
        />
      ))}
    </Box>
  );
}

export default FormList;
