import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import logo from '../assets/download.png'
import { Link, useParams, useLocation } from 'react-router-dom'

const drawerWidth = 200;
const styles = {
    sidebar: {
        display: "flex"
    },
    drawer:{
        width:drawerWidth
    },
    Link :{
        textDecoration:"none",
    },
    ListItemButton :{
        fontSize:23,
        color:"black"
    }
}

function SideBar() {
    const [isHomeSelected,setIsHomeSelected] = React.useState(true);
    const [isEmployeeSelected,setIsEmployeeSelected] = React.useState(false);
    const[temp,tempSelected] = React.useState(false);
    const selectedHandler=(props)=>{
       setIsHomeSelected(!isHomeSelected) ;
       setIsEmployeeSelected(!isEmployeeSelected);
    }

    return(
        <div className="sidebar" style={styles.sidebar}>
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },}}
            className={styles.drawer}
            variant="permanent"
            anchor="left"
            classes={{paper:drawerWidth}}
        >
            <div className="logo">
                <img height="90" width="100" src = {logo} alt="logo here"/>
            </div>
            <List>
                <Link exact to="/" style={styles.Link}  onClick={()=>selectedHandler("home")}>
                   <ListItemButton style={styles.ListItemButton} selected={isHomeSelected}>Home</ListItemButton>
                </Link>
                <Link to='/employees' style={styles.Link} onClick={()=>selectedHandler("Employee")}>
                   <ListItemButton style={styles.ListItemButton} selected={isEmployeeSelected}>Employees</ListItemButton>
                </Link>
            </List>
        </Drawer>
        </div>

    )
}

export default SideBar;
