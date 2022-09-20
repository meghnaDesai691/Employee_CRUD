import './App.css';
import emp from './database.json';
import * as React from 'react';
import EmployeeList from "./emp-crud/emp-list";
import AddEmployee from "./emp-crud/emp-add";
import EditEmployee from "./emp-crud/emp-edit";
import ViewEmployee from "./emp-crud/emp-view";
import DeleteEmployee from "./emp-crud/emp-delete";
import {Route,Routes} from "react-router-dom";
import Home from './emp-crud/home';
import Sidebar from "./emp-crud/sidebar";


const App = () => {
    return (
        <div className="app">
            <Sidebar/>
            <Routes>
                <Route index element={<Home/>}> </Route>
                    <Route path="/employees" element={<EmployeeList/>}>
                    <Route path= "/employees/addEmployee" element={<AddEmployee/>}></Route>
                    <Route path= "/employees/editEmployee" element={<EditEmployee/>}></Route>
                    <Route path= "/employees/deleteEmployee" element={<DeleteEmployee/>}></Route>
                    <Route path="/employees/viewEmployee" element={<ViewEmployee/>}></Route>
                    </Route>

            </Routes>


        </div>
    )
}

export default App;