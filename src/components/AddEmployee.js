import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import axios from "axios";
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // เปลี่ยนไอคอนให้สื่อความหมายมากขึ้น
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

export default function AddEmployee() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4000/api/employee', {
        username,
        firstName,
        lastName,
        email,
        gender
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = response.data;
      console.log(result);
      alert(result['message']);

      if (result['status'] === true) {
        navigate('/EmployeeList');
      }
    } catch (error) {
      console.error('Error adding employee', error);
    }
  }

  const handleViewEmployees = () => {
    navigate('/EmployeeList');
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff', // เปลี่ยนพื้นหลังให้เป็นสีขาว
            borderRadius: 3,
            padding: 4,
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.2)', // เพิ่มเงาให้เด่นขึ้น
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddIcon /> {/* ใช้ไอคอนที่สื่อถึงการเพิ่มผู้ใช้ */}
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ color: 'primary.main', mb: 2 }}> {/* ขยายขนาดฟอนต์และปรับสี */}
            เพิ่มพนักงาน
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ชื่อผู้ใช้"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="ชื่อจริง"
              name="firstName"
              autoComplete="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="นามสกุล"
              name="lastName"
              autoComplete="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="อีเมล"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="เพศ"
              name="gender"
              autoComplete="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }} // เพิ่มขนาดปุ่มและขนาดฟอนต์
            >
              เพิ่มพนักงาน
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ mt: 2, py: 1.5, fontSize: '1rem' }}
              onClick={handleViewEmployees}
            >
              ดูข้อมูลพนักงาน
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
