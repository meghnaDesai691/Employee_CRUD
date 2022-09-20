import axios from "axios";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import CancelIcon from '@mui/icons-material/Cancel';
import {IconButton} from "@mui/material";
const DeleteEmployee = (props)=>{
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 20,
        p: 4,
    };
    const {EmployeeToBeDeleted,onEmployeeDelete} = props;
    const deleteEmp=() =>{
        axios.delete(`http://localhost:8000/employees/${EmployeeToBeDeleted.id}`)
            .then((res)=>console.log("deleted"));
        onEmployeeDelete();

    }

    return(
        <div className="del-modal">
            <Box sx={style}>
            <h1>Are You sure?
                <IconButton style={{float:"right"}} onClick={onEmployeeDelete}>
                    <CancelIcon/>
                </IconButton>
            </h1>

            <h3>Do you want to delete {EmployeeToBeDeleted.name}</h3>
            <Button style={{backgroundColor:"yellow",color:"black"}} onClick={onEmployeeDelete}>
                No,Cancel
            </Button>
            <Button style={{float:"right",backgroundColor:"violet",color:"black"}} onClick={deleteEmp}>
                Yes,Delete
            </Button>
            </Box>

        </div>
    )

}

export default DeleteEmployee;