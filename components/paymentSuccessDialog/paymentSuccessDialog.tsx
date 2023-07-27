import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function paymentSuccessDialog({open, handleClose}:any) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Button
            onClick={handleClose} 
            style={{ position: 'absolute', top: 10, right: 10 }}
          ></Button>
          <Typography variant="h6" id="modal-modal-description" sx={{ mt: 2 }}>
            Payment successful!
            <br/>
            <CheckCircleOutlineIcon color='success'/>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
