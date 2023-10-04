import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormList from "../Components/FormList";
import CreateForm from "../Components/CreateForm";
import GenerateFormInputs from "../Components/GenerateFormInputs";

function DashBoard() {
  const [selectedFormInputDetails, setSelectedInputDetails] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    console.log("called function");
    setIsOpenDialog(true);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleOpenDialog}>
        Create Form
      </Button>
      <div
        style={{
          display: "flex",
          height: "700px",
          width: "100%",
        }}
      >
        <FormList
          setSelectedInputDetails={setSelectedInputDetails}
          selectedFormInputDetails={selectedFormInputDetails}
        />
        {selectedFormInputDetails?.formName && !isOpenDialog ? (
          <GenerateFormInputs element={selectedFormInputDetails.formElements} />
        ) : (
          <CreateForm
            setIsOpenDialog={setIsOpenDialog}
            isOpenDialog={isOpenDialog}
          />
        )}
      </div>
    </div>
  );
}

export default DashBoard;
