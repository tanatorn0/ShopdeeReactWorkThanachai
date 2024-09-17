import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/employee', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    navigate('/AddEmployee');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/AdminLogin');
  };

  return (
    <Container component={Paper} sx={{ mt: 8, p: 4, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)', borderRadius: 3, backgroundColor: '#f4f6f8' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
        รายชื่อพนักงาน
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddEmployee} sx={{ py: 1.5, px: 3, fontSize: '1rem', textTransform: 'none' }}>
          เพิ่มพนักงาน
        </Button>

        <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ py: 1.5, px: 3, fontSize: '1rem', textTransform: 'none' }}>
          ออกจากระบบ
        </Button>
      </Box>

      <Table sx={{ mt: 3, backgroundColor: '#ffffff', borderRadius: 2 }}>
        <TableHead sx={{ backgroundColor: '#1976d2' }}>
          <TableRow>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ชื่อผู้ใช้</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ชื่อจริง</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>นามสกุล</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>อีเมล</TableCell>
            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>เพศ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.empID} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
              <TableCell>{employee.username}</TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
