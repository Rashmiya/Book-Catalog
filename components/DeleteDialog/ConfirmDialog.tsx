import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { deleteBookService } from '../../services/BookServices';
import { useDispatch ,useSelector} from 'react-redux';
import { setUpdates } from '../../pages/AllProducts/AllProductsSlice';

const ConfirmDialog = ({ open, handleClose ,id }:any) => {
  const dispatch = useDispatch();

  async function deleteFunction() {
    const response=await deleteBookService(id);
    if(response.data!=null){
      handleClose();
      dispatch(setUpdates(true));
      toast.success('Book Deleted Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this book?'}
        </DialogTitle>
       
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{deleteFunction();}} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
