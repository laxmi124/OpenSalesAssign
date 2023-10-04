import React, { useEffect, useState } from "react";
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
  Radio,
  FormLabel,
  RadioGroup,
} from "@mui/material";

function GenerateFormInputs({ element }) {
  console.log("element", element);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        padding: "5px",
        background:"#edefef3b",
        border : "1px solid #f3f3f3",
        height:"100%"
      }}
    >
      {element.map((item, index) => {
        switch (item.inputType) {
          case "textInput":
            return (
              <TextField
                key={index}
                placeholder={item?.input_label_name}
                variant="outlined"
                sx={{margin:"5px"}}
              />
            );
          case "checkbox":
            return (
              <FormControlLabel
                key={index}
                control={<Checkbox checked={item?.checkBoxDefaultValue} />}
                label={item?.input_label_name}
                
              />
            );
          case "radio":
            return (
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {item.radioOptionsName.map((labelName) => (
                    <FormControlLabel
                      value={labelName}
                      control={<Radio />}
                      label={labelName}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            );
          case "dropdown":
            return (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {item?.input_label_name}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Input Type"
                >
                  {item?.dropDownOptionsName.map((itemValue) => (
                    <MenuItem value={itemValue}>{itemValue}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default GenerateFormInputs;
