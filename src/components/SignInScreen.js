import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import "./form.css";
import backN from "./../images/backG.jpg"
import { UserAuth } from '../context/AuthContext';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';

function SignInScreen() {
  const navigate=useNavigate();
  const {signInWithEmail,googleSign,user}=UserAuth();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  async function handlerGoogleSign(){
    try{
      await googleSign(); 
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    if(user!=null){
      navigate("/");
    }
  },[])
  return (
    <div className='sign_up_page' style={{ backgroundImage: `url(${backN})` }}>

      <form style={{ margin: '30px' }} onSubmit={handleSubmit((data) => signInWithEmail(data.email, data.password))} >
        <div className='form-bg'>
          <div >
          <Typography variant="h5" gutterBottom style={{ color: 'white' }}>Sign In</Typography>
          <Grid container spacing={5} gutterBottom className='form-container'>
            <Grid item  gutterBottom>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <TextField
                      className='form-input'
                      fullWidth
                      onChange={onChange}
                      value={value}
                      label="Email address"
                      InputLabelProps={{
                        style: { color: 'white', backgroundColor: 'black' }
                      }}
                      InputProps={{
                        style: { color: 'white' }
                      }}

                      required
                    />
                  );
                }}
              />
            </Grid>


            <Grid item  gutterBottom>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <TextField
                      className='form-input'
                      fullWidth
                      onChange={onChange}
                      value={value}
                      label="Password"
                      InputLabelProps={{
                        style: { color: 'white', backgroundColor: 'black' }
                      }}
                      InputProps={{
                        style: { color: 'white' }
                      }}
                      required
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px',flexDirection:'column' }}>
           
            <Button type="submit" variant="contained" color="error">Sign in</Button>
            <br/>
            <GoogleButton onClick={()=>handlerGoogleSign()}/>
          </div>
          <Typography  variant="h13" gutterBottom style={{ display: 'flex', justifyContent: 'center', margin: '20px', color: 'white' }}>
            New to netflix?  <Link href="/signup" underline="hover" color="primary" style={{marginLeft:'6px'}}> create account </Link></Typography>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignInScreen