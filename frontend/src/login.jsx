import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';
import loginService from './http-common'
import { useNavigate } from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Afif Fahreza 18219058 '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const [open, setOpen] = React.useState(false);

  const [input, setInput] = React.useState({
    username: '',
    password: ''
  })

  const handleInputChange = (event) => {
    event.preventDefault()
    let content = event.target.name
    let val = event.target.value.toString()

    setInput({
        ...input,
        [content]: val,
    })
  }

  let history = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    //setOpen(true)
    const userData = {
      username: input.username,
      password: input.password
    }
    console.log(userData)
    try {
      const { data: jwt } = await loginService(userData);
      localStorage.setItem('token', jwt);
      history('/home');
    }
    catch (e) {
      console.log(e)
      setOpen(true)
    }
    // http.post(`/token`, userData).then(
    //   res => {
    //     let data = res.data
    //     if (data.access_token) {
    //       sessionStorage.setItem('data',data)
    //       history(`/home`)
    //     }
    //     else {
    //       setOpen(true)
    //     }
    //   }
    // ).catch(e => {
    //   console.log(e)
    //   setOpen(true)
    // })
  };

  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} onChange={handleInputChange} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <Box sx={{ width: '50%' }} margin='auto'>
      <Collapse in={open}>
        <Alert severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
            <AlertTitle>Error</AlertTitle>
            Incorrect username/password!
        </Alert>
      </Collapse>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
    </React.Fragment>
  );
}