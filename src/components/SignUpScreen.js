import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import  "./form.css";
import backN from "./../images/backG.jpg"
import {GoogleButton} from "react-google-button"
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



function SignUpScreen() {
  const {createAccountByEmail,googleSign,user}=UserAuth();
  const navigate=useNavigate();
    const {handleSubmit,control}=useForm({
      defaultValues: {
        email: '',
        password:''
    }});
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
    },[user])

  return (
    <div className='sign_up_page' style={{ backgroundImage: `url(${backN})` }}>
        
        <form style={{margin:'30px'}} onSubmit={handleSubmit((data) => createAccountByEmail(data.email,data.password))} >
        <div className='form-bg'>
          <div >
        <Typography variant="h6" gutterBottom style={{color:'white'}}></Typography>
            <Grid container spacing={5} gutterBottom  className='form-container'>
            {/* item xs={12} sm={7} */}
            <Grid item gutterBottom>
              <Controller
                name="name"
                control={control}
                render={({ field :{onChange,value}}) => {
                  return (
                    <TextField
                    className='form-input'
                    fullWidth
                    onChange={onChange}
                    value={value}
                      label="Name"
                      InputLabelProps={{
                        style:{color:'white',backgroundColor:'black'}
                      }}
                      InputProps={{
                        style:{color:'white'}
                      }}
                     
                    required
                    />
                  );
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name="email"
                control={control}
                render={({ field :{onChange,value}}) => {
                  return (
                    <TextField
                    className='form-input'
                    fullWidth
                    onChange={onChange}
                    value={value}
                      label="Email address"
                      InputLabelProps={{
                        style:{color:'white',backgroundColor:'black'}
                      }}
                      InputProps={{
                        style:{color:'white'}
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
                render={({ field :{onChange,value}}) => {
                  return (
                    <TextField
                    className='form-input'
                    fullWidth
                    onChange={onChange}
                    value={value}
                      label="Password"
                      InputLabelProps={{
                        style:{color:'white',backgroundColor:'black'}
                      }}
                      InputProps={{
                        style:{color:'white'}
                      }}
                    required
                    />
                  );
                }}
              />
            </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center',margin:'20px',flexDirection:'column'}}>
            <Button type="submit" variant="contained" color="error">Sign in</Button>
            <br/>
            <GoogleButton onClick={()=>handlerGoogleSign()}/>
          </div>
          </div>
          </div>
        </form>
    </div>
  )
}

export default SignUpScreen