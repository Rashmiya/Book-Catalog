import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { OrderModel } from '../../utils/interface';
import { insertOrderService } from '../../services/OrderService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updateStudentService } from '../../services/BookServices';
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

export default function PlaceOrderModal({ open, handleClose,data,qty }:any) {
  const navigate = useNavigate();
  const user=localStorage.getItem('userDetails');
  
  const [userName,setUserName]=React.useState<any>();
  React.useEffect(()=>{
    if (user) {
      const userDetails = JSON.parse(user);
      setUserName(userDetails.name);
    }
    
  },[]);


  const [value, setValue] = React.useState('Cash On delivery');
  const [address, setAddress] = React.useState('');
  const [shippingAddressError, setShippingAddressError] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };


  function addressAction(value: string) {
    const addressResgx = /^[A-z 0-9]{2,40}$/;
    if (addressResgx.test(value)) {
      setShippingAddressError('');
      setAddress(value);
    } else {
      setShippingAddressError('Enter valid address');
      setAddress(value);
    }
  }

  async function makeOrderAction() {
    console.log(data);
    if(address !== ''){
      const orderObj:OrderModel={
        'customer_name':userName,
        'itemList':[{
          'book_name':data.book_name,
          'quantity':qty,
          'price':data.book_price
        }],
        'totalAmount':data.book_price*qty,
        'shippingAddress':address,
        'orderDate':new Date
      };
      const bookSample = {
        _id: data._id,
        bid: data.bid,
        book_name: data.book_name,
        book_author: data.book_author,
        book_qty: data.book_qty-qty,
        book_price: data.book_price,
        book_type: data.book_type,
      };
      await updateStudentService(bookSample);
      const response=await insertOrderService(orderObj);
      console.log(response.data);
      if(response!=null){
        handleClose();
        setAddress('');
        toast.success('Payment successful!!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate('/AllProducts');
      }
    }else{
      setShippingAddressError('Enter Shipping address');
    }
  }

  return (
    <div>
      <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            onClick={handleClose} 
            style={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon /> 
          </Button>
          <Typography sx={{color:'red'}}id="modal-modal-title" variant="h6" component="h2">
            Place Order
          </Typography>
          <br/>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'left' }}>
            Customer Name : {userName}
            <br />
            Book Name : {data.book_name}
            <br />
            Total amount : LKR {data.book_price*qty}.00 
          </Typography>
          <br />
          <FormControl>
            <Typography>Payment method :</Typography>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="Card payment" control={<Radio />} label="Card payment" />
              <FormControlLabel value="Cash On delivery" control={<Radio />} label="Cash On delivery" />
            </RadioGroup>
            <br />
            <TextField 
              error={shippingAddressError !== ''}
              required 
              sx={{ width: '170%',}} 
              label="Shipping Address" 
              id="address" 
              onChange={(e)=>{addressAction(e.target.value);}}
              value={address}
              helperText={shippingAddressError}
            />
            <br />
            <Button sx={{
              width: '170%',
            }}variant="contained" onClick={()=>{makeOrderAction();}}>Continue to purchasing</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
