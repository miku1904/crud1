import * as React from 'react';
import { styled, StyledEngineProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
// import Home from './Home';
import FormModel from './FormModal';
import IconButton from '@mui/material/IconButton';
import Notification from './Notification';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditModal from './EditModal';
import SearchBar from './SearchBar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: 2
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const TableList = () => {
  const [rows, setRows] = useState([])
  const [filterData, setFilterData] = useState([])
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [search,setSearch] = useState("");

  // For Edit Model
  const [openEditModel, setOpenEditModel] = React.useState(false);
  const handleOpenEditModel = () => setOpenEditModel(true);
  const handleCloseEditModel = () => setOpenEditModel(false);
  const [name, setName] = useState("")

  const getData = () => {
    try {
      let data = JSON.parse(localStorage.getItem("data"))
      if (data) {
        if (data.length > 0) {
          setRows(data)
          setFilterData(data)
        }
      } else {
        let arr = new Array()
        localStorage.setItem("data", JSON.stringify(arr))
      }
    }
    catch {
      console.log("")
    }
  }

  const addData = (data) => {
    let newData = JSON.parse(localStorage.getItem("data"))
    newData.push(data)
    localStorage.setItem("data", JSON.stringify(newData))
    getData()
    setNotify({
      isOpen: true,
      message: "Data submitted successfully.",
      type: "success",
    });
  }

  const deleteItem = (name) => {
    // console.log(name,"name")
    const filteredData = rows.filter((item) => item.name !== name);
    localStorage.setItem("data", JSON.stringify(filteredData))
    setRows(filteredData)
    setFilterData(filteredData)
    setNotify({
      isOpen: true,
      message: `${name} is deleted successfully`,
      type: "error",
    });
  }

  const updateItem = (data, name) => {
    console.log(data, 'data')
   
    var index = rows.findIndex((x) => x.name === name);
    let newState = [...rows];
    let tempobj = { ...newState[index] };

    tempobj.name = data.name
    tempobj.email = data.email
    tempobj.gender = data.gender
    tempobj.designation = data.designation
    tempobj.skill = data.skill
    tempobj.date = data.date
    newState[index] = tempobj;
    setRows(newState);
    setFilterData(newState)
      
    localStorage.setItem('data', JSON.stringify(newState))
  }

  const editItem = (name) => {
    setOpenEditModel(true)
    setName(name)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(search.length > 0){

      let filtered_users = filterData.filter(function (user) {
        user =
        user.name.toLowerCase() +
        user.email.toLowerCase() +
        user.gender.toLowerCase();
        return user.indexOf(search) > -1;
      });
      setRows(filtered_users)
    }
    else{
      getData()
    }
  }, [search])


  return (
    <TableContainer component={Paper} sx={{ width: 900, mt: 2, m: "auto" }} >
      <div className="searchmodal">
        
      <FormModel rows={rows} addData={addData} /> 
      <SearchBar search={search} setSearch={setSearch} />
      </div>
      
      <Table sx={{ minWidth: 700, marginTop: 1 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Id</StyledTableCell> */}
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledTableRow key={row.name}>
              
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.gender}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton aria-label="edit" onClick={() => editItem(row.name)} color="primary">
                  <ModeEditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteItem(row.name)} color="primary">
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>

            </StyledTableRow>

          ))}
        </TableBody>
      </Table>
      <EditModal
        open={openEditModel}
        setOpen={setOpenEditModel}
        handleClose={handleCloseEditModel}
        handleOpen={handleOpenEditModel}
        name={name}
        rows={rows}
        updateItem={updateItem}
      />
    <Notification notify={notify} setNotify={setNotify} />
    </TableContainer>
  )
}
