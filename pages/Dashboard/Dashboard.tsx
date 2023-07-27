import * as React from 'react';
import ResponsiveAppBar from '../../components/AppBar/AppBar';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dashboard from '../../assets/images/dashboard.jpg';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.signIn.user);
  React.useEffect(() => {
    if (user === false) {
      navigate('/');
    }
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>

        {/* header */}
        <Grid item xs={12}>
          <ResponsiveAppBar/>
        </Grid>

        {/* body */}
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <img src={dashboard} style={{width:'100%',height:'100%'}} alt="" />
            
          </Grid>

        </Grid>

        {/* footer */}
        <Grid item xs={12}>
          <div className='footer'>footer</div>
        </Grid>

      </Grid>
    </Box>

  );
};

export default Dashboard;