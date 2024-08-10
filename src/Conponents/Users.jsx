import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, styled, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from "axios";

const Component = styled(Box)`
    width: 80%;
    margin: 50px auto;
    & > h4 {
        margin-bottom: 20px;
    }
    & > div > table > thead {
        background-color: #000;
    }
    & > div > table > thead > tr > th {
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 600;
    }
    & > div > table > tbody > tr > td {
        font-size: 16px;
        color: #000000;
    }
`;


function Users() {

    const [users, setUsers] = useState([]);

    const API_URL="https://5tyowwue10.execute-api.us-east-2.amazonaws.com/test"

    useEffect(()=>{
        const getdata= async ()=>{
            const res= await axios.get(API_URL);
            setUsers(JSON.parse(res.data.body).Items);
        }
        getdata();
    },[])

    const removeUser=(id)=>{
        const updatedList = users.filter(user => user.id !== id);
        setUsers(updatedList)
    }

    return (
        <Component>
            <Typography variant="h4">Users</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Remove Entry</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => (
                                <TableRow>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.salary}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell><Button variant="contained" color="error" onClick={()=>removeUser(user.id)}>Remove</Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </Component>
    );
}
  
  export default Users;
  