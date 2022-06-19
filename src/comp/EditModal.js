import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

import {
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  FormHelperText,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import Notification from "./Notification";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};
const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
}));


const EditModal = (props) => {
  const [data, setData] = useState([]);
  const open = props.open
  const setOpen = props.setOpen
  const handleOpen = props.handleOpen
  const handleClose = props.handleClose
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const { register, handleSubmit, control, errors, setError, setValue } = useForm();
  const onSubmit = (data) => {

    handleClose()
    props.updateItem(data, props.name)

  }


  useEffect(() => {

    setTimeout(() => {

      const name = props.name
      let data = JSON.parse(localStorage.getItem('data'))
      data.map((item) => {
        if (item.name == name) {
          console.log(item, "name")

          setValue("name", item.name)
          setValue("email", item.email)
          setValue("gender", item.gender)

          setValue("designation", item.designation)
          setValue("date", item.date)
          setValue("skill", item.skill)
        }
      })
    }, 500);
  }, [props])


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style}>
          Edit model

          <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
              placeholder="Enter Your First Name"
              label="name"
              variant="outlined"
              fullWidth
              className={classes.inputField}
              name="name"
              inputRef={register({
                required: "Name is required.",
              })}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />


            <TextField
              placeholder="Enter Your E-mail Address"
              label="E-mail"
              variant="outlined"
              fullWidth
              className={classes.inputField}
              name="email"
              inputRef={register({
                required: "E-mail Address is required.",
              })}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />


            <FormControl
              className={classes.inputField}
              error={Boolean(errors.gender)}
            >
              <FormLabel>Choose Your Gender</FormLabel>
              <RadioGroup row name="gender">
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      inputRef={register}
                    />
                  }
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      inputRef={register}
                    />
                  }
                  label="Male"
                />
              </RadioGroup>
              <FormHelperText>{errors.gender?.message}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              className={classes.inputField}
              error={Boolean(errors.designation)}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Your Designation
              </InputLabel>
              <Controller
                render={(props) => (
                  <Select value={props.value} onChange={props.onChange}>
                    <MenuItem value={"Trainee"}>Trainee</MenuItem>
                    <MenuItem value={"Junior devloper"}>Junior devloper</MenuItem>
                    <MenuItem value={"senior developer"}>Sinior devloper</MenuItem>
                  </Select>
                )}
                name="designation"
                control={control}
                defaultValue=""
                rules={{
                  required: "please choose your Designation",
                }}
              />
              <FormHelperText>{errors.course?.message}</FormHelperText>
            </FormControl>

            <TextField
              placeholder="Enter Your skill"
              label="skill"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.inputField}
              name="skill"
              inputRef={register({
                required: "skill is required.",
              })}
              error={Boolean(errors.skill)}
              helperText={errors.skill?.message}
            />


            <MuiPickersUtilsProvider utils={DateFnsUtils}>

              <Controller
                render={(props) => (
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Date"
                    value={props.value}
                    onChange={props.onChange}
                    fullWidth
                    error={Boolean(errors.date)}
                    helperText={errors.date?.message}
                  />
                )}
                name="date"
                defaultValue={null}
                control={control}
                rules={{
                  required: "Date is required.",
                }}
              />



            </MuiPickersUtilsProvider>

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default EditModal;
