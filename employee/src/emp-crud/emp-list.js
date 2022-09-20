import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {Chip} from "@mui/material";
import axios from 'axios';
import Modal from "@mui/material/Modal";
import AddEmployee from "./emp-add";
import EditEmployee from "./emp-edit";
import DeleteEmployee from "./emp-delete";
import ViewEmployee from "./emp-view";
import './emp-list.css';
import moment from "moment/moment";
import {Link} from 'react-router-dom';
import {TableSortLabel} from "@mui/material";


const EmployeeList = ()=> {

    const [isEmployeeAddModalOpened, setIsEmployeeAddModalOpened] = React.useState(false);
    const [isEmployeeEditModalOpened, setIsEmployeeEditModalOpened] = React.useState(false);
    const [isEmployeeDeleteModalOpened,setIsEmployeeDeleteModalOpened] = React.useState(false);
    const [isEmployeeViewModalOpened,setIsEmployeeViewModalOpened] = React.useState(false);
    const [ employeeList, setEmployeeList ] = React.useState([]);
    const [filteredEmployeeList,setFilteredEmployeeList] = React.useState(employeeList);
    const [ selectedEmployeetoEdit, setSelectedEmployeetoEdit ] = React.useState({});
    const [ selectedEmployeetoDelete, setSelectedEmployeetoDelete ] = React.useState({});
    const [ selectedEmployeetoView, setSelectedEmployeetoView ] = React.useState({});
    const [searchField,setSearchField] = React.useState("");
    const [nameSortDirection,setNameSortDirection] = React.useState("asc");
    const [emailSortDirection,setEmailSortDirection] = React.useState("asc");



    const getList=()=>{
        axios.get('http://localhost:8000/employees')
            .then((res)=>{(setEmployeeList(res.data));setFilteredEmployeeList(res.data)});
    }
    const openAddEmployeeModal = ()=>{
        setIsEmployeeAddModalOpened(true);
    }
    const closeAddEmployeeModal = ()=>{
        setIsEmployeeAddModalOpened(false);
    }
    const closeDeleteEmployeeModal = ()=>{
        setIsEmployeeDeleteModalOpened(false);
    }
    const openViewEmployeeModal = (row)=>{
        setIsEmployeeViewModalOpened(true);
        setSelectedEmployeetoView(row);
    }
    const closeViewEmployeeModal = ()=>{
        setIsEmployeeViewModalOpened(false);
    }

    const openEditEmployeeModal = (emp)=>{
        setIsEmployeeEditModalOpened(true);
        setSelectedEmployeetoEdit(emp);
    }
    const closeEditEmployeeModal = ()=>{
        setIsEmployeeEditModalOpened(false);
    }
    const openDeleteEmployeeModal = (emp)=>{
        setIsEmployeeDeleteModalOpened(true);
        setSelectedEmployeetoDelete(emp);
    }
    const handleEmployeeAdd=()=>{
        closeAddEmployeeModal();
        getList();
    }
    const handleEmployeeEdit=()=>{
        closeEditEmployeeModal();
        getList();
    }
    const handleEmployeeDelete = ()=>{
        closeDeleteEmployeeModal();
        getList();
    }
    const handleEmployeeView = ()=>{
        closeViewEmployeeModal();
        getList();
    }
    const onSearchChange = (event)=> {
        const filtered_emps = event.target.value;
        setSearchField(filtered_emps);
    }
    const sortArray = (arr,orderBy,prop)=>{
        console.log(arr,prop);
          switch(orderBy){
              case "asc":
              default:
                  return arr.sort((a,b)=>a[prop] > b[prop] ? -1 : 0 );
              case"desc":
                  return arr.sort((a,b)=>a[prop] < b[prop] ? -1 : 0 );
          }
    }
    const handleSortReq = (props)=>{
        console.log(props);
        const orderDir =
         props== "name"? nameSortDirection : emailSortDirection;

        setFilteredEmployeeList(sortArray(employeeList,orderDir,props));
       props=="name"? setNameSortDirection(nameSortDirection=="asc"?"desc":"asc"):setEmailSortDirection(
           emailSortDirection=="asc"?"desc":"asc"
        )
        console.log(filteredEmployeeList);

    }

    React.useEffect(()=>
        {
            getList();
        },[]
    );
    React.useEffect(()=>{
        const filtered = employeeList
            .filter((emp)=>emp.name.toLowerCase()
                .includes(searchField))
        setFilteredEmployeeList(filtered);
    },[searchField]);

    return(
        <div className="screen">
            <div className="header" >
                <span className="emp-head">EMPLOYEE</span>


                    <Link to="/employees/addEmployee" >
                        <Button variant="contained" onClick={openAddEmployeeModal}style={{float:"right"}} >
                            Add</Button>
                    </Link>
                <TextField id="email"  label="search" variant="outlined" placeholder="searchEmployee"
                           onChange={onSearchChange} style={{float:"right",paddingRight:"1%"}} size="small"
                />

                    <Modal open={isEmployeeAddModalOpened}>
                        <AddEmployee onEmployeeAdd = {handleEmployeeAdd}/>
                    </Modal>

                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell style={{fontWeight:"bold"}}>ID</TableCell>
                                    <TableCell style={{fontWeight:"bold"}} onClick={()=>handleSortReq("name")}>
                                        <TableSortLabel active={true}direction={nameSortDirection}>
                                            Name
                                        </TableSortLabel>
                                        </TableCell>
                                <TableCell style={{fontWeight:"bold"}} onClick={()=>handleSortReq("email")}>
                                    <TableSortLabel active={true} direction={emailSortDirection}>
                                    Email</TableSortLabel>
                                    </TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Phone</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>DOB</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Gender</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Hobbies</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {(filteredEmployeeList)?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell>{row.name?row.name : "--"}</TableCell>
                                <TableCell>{row.email?row.email:"--"}</TableCell>
                                <TableCell>{row.phone?row.phone:"--"}</TableCell>
                                <TableCell>{row.dob? moment(row.dob).format("MM/DD/YYYY"):"--"}</TableCell>
                                <TableCell>{row.gender?row.gender:"-"}</TableCell>
                                <TableCell className="hobbies">
                                    {(row.hobbies.length==0)?
                                        <center><div>--</div></center> : row.hobbies?.map((hobby)=>
                                            <Chip label={hobby} variant="outlined"/>)
                                    }
                                </TableCell>
                                <TableCell className="actions">
                                    <Link to="/employees/editEmployee" style={{textDecoration:"none"}}>
                                        <Button variant={"contained"} style={{backgroundColor:"yellow",color:"black"}} onClick={()=>openEditEmployeeModal(row)}>Edit</Button>
                                    </Link>
                                    <Link to="/employees/viewEmployee" style={{textDecoration:"none"}}>
                                        <Button variant={"contained"} style={{backgroundColor:"lightblue",color:"black"}} onClick={()=>openViewEmployeeModal(row)}>View</Button>
                                    </Link>
                                    <Link to="/employees/deleteEmployee" style={{textDecoration:"none"}}>
                                        <Button variant={"contained"} style={{backgroundColor:"red",color:"black"}} onClick={()=>openDeleteEmployeeModal(row)}>Delete</Button>
                                    </Link>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={isEmployeeEditModalOpened}>
                <EditEmployee EmployeeDetails={selectedEmployeetoEdit} onEmployeeEdit={handleEmployeeEdit}/>
            </Modal>
            <Modal open={isEmployeeDeleteModalOpened}>
                <DeleteEmployee EmployeeToBeDeleted = {selectedEmployeetoDelete} onEmployeeDelete = {handleEmployeeDelete}/>
            </Modal>
            <Modal open={isEmployeeViewModalOpened} onEmployeeView={handleEmployeeView}>
                <ViewEmployee EmployeeToBeViewed = {selectedEmployeetoView} onEmployeeView = {handleEmployeeView}/>
            </Modal>


        </div> )
}
export default  EmployeeList;