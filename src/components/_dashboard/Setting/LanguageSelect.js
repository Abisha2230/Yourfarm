import React,{useState} from "react";
import {Dialog,DialogTitle,DialogContent,DialogActions,Button, 
  Divider,FormControl,OutlinedInput,ListItemText,Checkbox,MenuItem,InputLabel} from "@mui/material";
import {LanguageData} from "../../../_apis_/DummyApis/languageapi";
import Select, { SelectChangeEvent } from '@mui/material/Select';
const LanguageSelect=({Dialogopen,popUpOpen,popUpClose})=>{
  const [personName, setPersonName] = useState([]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
    return(
        <Dialog
        open={Dialogopen}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>{"You want to select this language?"}</DialogTitle>
        <Divider/>
        <DialogContent>
        <FormControl sx={{my:"15px",width:"100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Language</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {LanguageData.map((langu) => (
            <MenuItem key={langu.id} value={langu.name}>
              <Checkbox checked={personName.indexOf(langu.name) > -1} />
              <ListItemText primary={langu.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </DialogContent>
        <Divider/>
        <DialogActions sx={{padding:"13px 25px"}}>
          <Button onClick={popUpClose}>Discard</Button>
          <Button onClick={popUpClose}>Select</Button>
        </DialogActions>
      </Dialog>
    )
}
export default LanguageSelect;