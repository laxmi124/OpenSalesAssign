import React from "react";
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

function CreateElement({ element }) {
  console.log("element --- ",element)
  return (
    <>
      {element.inputType === "textInput" && (
        <TextField
          placeholder={element?.input_label_name}
          variant="outlined"
          disabled
          maxLength={element?.minTextInputLength}
        />
      )}
      {element.inputType === "checkbox" && (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={element?.checkBoxDefaultValue} disabled />
            }
            label={element?.input_label_name}
          />
        </FormGroup>
      )}
      {element.inputType === "radio" && (
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {element.radioOptionsName.map((labelName) => (
              <FormControlLabel
                value={labelName}
                disabled
                control={<Radio />}
                label={labelName}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}

      {element.inputType === "dropdown" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{element?.input_label_name}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Input Type"
          >
            {element?.dropDownOptionsName.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}

export default CreateElement;
