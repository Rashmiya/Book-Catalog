
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import bookImage from '../../assets/images/book1.jpg';
import IconButton from '@mui/material/IconButton';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { deleteBookService } from '../../services/BookServices';
import { toast } from 'react-toastify';
import ConfirmDialog from '../DeleteDialog/ConfirmDialog';
import UpdateBookModal from '../UpdateBookModal/UpdateBookModal';
import { useNavigate } from 'react-router-dom';


export default function BookCard(props:any) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  const handleUpdateClickOpen = () => {
    setOpenUpdate(true);
  };
  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const user=localStorage.getItem('userDetails');
  const [userPermision, setUserPermision] = React.useState(false);
  React.useEffect(()=>{
    if (user) {
      const userDetails = JSON.parse(user);
      const status=userDetails.userRoll;
      status==='Admin'?setUserPermision(true):setUserPermision(false);
    }
  },[]);
  
 
  return (
    <><Card sx={{ maxWidth: 250 }}>

      <CardMedia
        onClick={()=>{navigate('/payment');localStorage.setItem('selectedBook', props.data.bid);}}
        sx={{ height: 250, cursor: 'pointer' }}
        image={bookImage}
        title="book img"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.data.book_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.data.book_author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rs.{props.data.book_price}
        </Typography>
      </CardContent>
      <Tooltip title="Update" placement="top" style={{display:userPermision?'':'none'}}>
        <IconButton aria-label="add to favorites" onClick={handleUpdateClickOpen}>
          <EditCalendarIcon sx={{ color: '#1e90ff' }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" placement="top" style={{display:userPermision?'':'none'}}>
        <IconButton aria-label="share" onClick={handleDialogClickOpen} >
          <DeleteIcon sx={{ color: '#ff4757' }} />
        </IconButton>
      </Tooltip>
      <UpdateBookModal open={openUpdate} handleClose={handleUpdateClose} data={props.data}/>
      <ConfirmDialog open={openDialog} handleClose={handleDialogClose} id={props.data._id}/>
    </Card>
    
    </>
  );
}
