import React, { useState } from "react";
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

function CreateFormDialog({
  isOpenDialog,
  handleCloseDialog,
  setIsOpenDialog,
  setFormInputDetails,
}) {
  const [selectedInputType, setSelectedInputType] = useState("");
  const [inputLabelName, setInputLabelName] = useState("");
  const [formName, setFormName] = useState("");
  const [checkBoxDefaultValue, setCheckBoxDefaultValue] = useState(true);
  const [inputDetails, setInputDetails] = useState([]);
  const [radioOptionsName, setRadioOptionsName] = useState([]);
  const [dropDownOptionsName, setDropDownOptionsName] = useState([]);
  const [minTextInputLength, setMinTextInputLength] = useState(0);
  const [maxTextInputLength, setMaxTextInputLength] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);

  const inputTypesList = [
    { typeName: "Radio", value: "radio" },
    { typeName: "Text Input", value: "textInput" },
    { typeName: "Dropdown", value: "dropdown" },
    { typeName: "Checkbox", value: "checkbox" },
  ];

  const handleChangeInputFieldType = (event) => {
    setSelectedInputType(event.target.value);
  };

  const handleChangeLabelName = (event) => {
    setInputLabelName(event.target.value);
  };

  const handleChangeRadioOptions = (event) => {
    setRadioOptionsName(event.target.value);
  };

  const handleClickDone = () => {
    handleCreateMoreInputFields()
      .then((formDetail) => {
        setFormInputDetails(formDetail);
        setFormName("");
        handleCloseDialog();
      })
      .catch((err) => {
        console.log("there is an", err);
      });
  };

  const handleCreateMoreInputFields = () => {
    return new Promise((resolve, reject) => {
      let radioOptionsList = radioOptionsName?.length
        ? radioOptionsName.split(",")
        : [];
      let dropDownOptionsList = !Array.isArray(dropDownOptionsName)
        ? dropDownOptionsName.split(",")
        : [];

      if (Number(minTextInputLength) > Number(maxTextInputLength)) {
        reject();
      }

      let formDetails = {
        input_label_name: inputLabelName,
        inputType: selectedInputType,
        checkBoxDefaultValue: checkBoxDefaultValue,
        radioOptionsName: radioOptionsList,
        dropDownOptionsName: dropDownOptionsList,
        minTextInputLength,
        maxTextInputLength,
      };

      let updatedInputDetails = inputDetails.formElements || [];

      updatedInputDetails.push(formDetails);

      let formDetail = {
        formName: formName,
        formElements: updatedInputDetails,
      };

      setInputDetails(formDetail);

      setInputLabelName("");
      setSelectedInputType("");
      resolve(formDetail);
    });
  };

  const handleChangeFormName = (event) => {
    setFormName(event.target.value);
  };

  const handleChangeCheckDefaultValue = (event) => {
    setCheckBoxDefaultValue(event.target.checked);
  };
  const handleChangeMinLength = (event) => {
    if (event.target.value > 0) {
      setMinTextInputLength(event.target.value);
    }
  };
  const handleChangeMaxLength = (event) => {
    if (event.target.value > 0) {
      setMaxTextInputLength(event.target.value);
    }
  };

  const handleChangeDropDownOptions = (event) => {
    setDropDownOptionsName(event.target.value);
  };

  return (
    <Dialog open={isOpenDialog} onClose={handleCloseDialog}>
      <DialogTitle>Create Input Fields</DialogTitle>
      <DialogContent>
        <Grid
          sx={{
            width: "400px",
            padding: "5px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Input Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedInputType}
              label="Input Type"
              onChange={(event) => handleChangeInputFieldType(event)}
            >
              {inputTypesList.map((item) => (
                <MenuItem value={item?.value}>{item?.typeName}</MenuItem>
              ))}
            </Select>

            <TextField
              placeholder="Form Name"
              variant="outlined"
              value={formName}
              onChange={(event) => handleChangeFormName(event)}
            />

            <TextField
              placeholder="Label"
              variant="outlined"
              value={inputLabelName}
              onChange={(event) => handleChangeLabelName(event)}
            />

            {selectedInputType === "checkbox" && (
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={"Check Box Default Value"}
                  onChange={handleChangeCheckDefaultValue}
                />
              </FormGroup>
            )}

            {selectedInputType === "radio" && (
              <>
                <TextField
                  placeholder="Radio Options"
                  variant="outlined"
                  value={radioOptionsName}
                  onChange={(event) => handleChangeRadioOptions(event)}
                />
                <Typography
                  sx={{ fontSize: "12px", fontWeight: "400", color: "red" }}
                >
                  ** Please add comma between options **
                </Typography>
              </>
            )}

            {selectedInputType === "dropdown" && (
              <>
                <TextField
                  placeholder="dropdown Options"
                  variant="outlined"
                  value={dropDownOptionsName}
                  onChange={(event) => handleChangeDropDownOptions(event)}
                />
                <Typography
                  sx={{ fontSize: "12px", fontWeight: "400", color: "red" }}
                >
                  ** Please add comma between options **
                </Typography>
              </>
            )}

            {selectedInputType === "textInput" && (
              <>
                <TextField
                  placeholder="Min Length"
                  type={"Number"}
                  variant="outlined"
                  value={minTextInputLength}
                  onChange={(event) => handleChangeMinLength(event)}
                />
                <TextField
                  placeholder="Max Length"
                  type={"Number"}
                  variant="outlined"
                  value={maxTextInputLength}
                  onChange={(event) => handleChangeMaxLength(event)}
                />
              </>
            )}

            <Button onClick={handleCreateMoreInputFields}>Create More</Button>
            <Button onClick={handleClickDone}>Done</Button>
          </FormControl>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormDialog;
