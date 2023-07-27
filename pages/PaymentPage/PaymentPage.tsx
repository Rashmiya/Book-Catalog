import * as React from 'react';
import ResponsiveAppBar from '../../components/AppBar/AppBar';
import Grid from '@mui/material/Grid';
import './PaymentPage.css';
import selectedImage from '../../assets/images/book1.jpg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchBookService } from '../../services/BookServices';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import PlaceOrderModal from '../../components/PlaceOrderModal/PlaceOrderModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PaymentPage = () => {
  const [open, setOpen] = React.useState(false);
  const data=localStorage.getItem('selectedBook');
  const[book,setBook]=React.useState<any>([]);
  const [quantity, setQuantity] = React.useState(1);

  const navigate = useNavigate();
  const user = useSelector((state: any) => state.signIn.user);
  const userDetails = useSelector((state: any) => state.signIn.userDetail);
  React.useEffect(() => {
    if (user === false) {
      navigate('/');
    }
    console.log('details_ ',userDetails);
  },[]);

  const user2 = useSelector((state: any) => state.signIn.user);
  React.useEffect(() => {
    if (user2 === false) {
      navigate('/');
    }
  });

  React.useEffect(()=>{
    getBookDetails(data);
  },[]);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>setOpen(false);

  async function getBookDetails(data: any) {
    const fetchedBook=await fetchBookService(data);
    console.log(fetchedBook.data[0]);
    setBook(fetchedBook.data[0]);
  }
  const handleAdd = () => {
    if(book.book_qty>quantity)
      setQuantity(quantity + 1);
  };
  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  function placeOrderAction() {
    throw new Error('Function not implemented.');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>

        {/* header */}
        <Grid item xs={12}>
          <ResponsiveAppBar/>
        </Grid>

        {/* body */}
        <Grid container item xs={12}>

          <Grid item xs={2}>
            <div className='sidebar'>side bar</div>
          </Grid>

          <Grid item xs={10}>
            <div className='content'>
              <img
                className="zoom-image"
                src={selectedImage}
                alt="Preview"
                style={{ width: '1000' ,height: '1449' }}
              />

              <Box sx={{margin:'10%', width: '200%', maxWidth: 1000 }}>
                <Typography variant="h3" gutterBottom  sx={{ textAlign: 'left' }}>
                  {book.book_name}
                </Typography>
                <Typography gutterBottom  sx={{ textAlign: 'left' }}>
                  <Rating name="read-only" value={3} readOnly />
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ textAlign: 'left' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
                </Typography>
                <br />
                <Typography variant="body2" fontSize={16} gutterBottom sx={{ textAlign: 'left' }}>
                    Author :&nbsp;  {book.book_author}
                  <br />
                    Type   :&nbsp;  {book.book_type}
                </Typography>
                <Typography variant="h6" display="block" gutterBottom sx={{ textAlign: 'left' }}>
                      LKR {book.book_price}.00 <s style={{color:'gray'}} className="price-item price-item--regular">
            
                    LKR {book.book_price +book.book_price*0.5}.00
            
                  </s>
                </Typography>
                <Typography variant="body2" fontSize={16} gutterBottom sx={{ textAlign: 'left' }}>
                    Avilability :&nbsp;  {book.book_qty}
                </Typography>
                <br />
                <Typography variant="h6" gutterBottom  sx={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 8 }}>Quantity:</span>
                    <IconButton onClick={handleRemove} size="small">
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      onChange={(e)=>setQuantity(parseInt(e.target.value))}
                      type="number"
                      value={quantity}
                      style={{ width: 50, textAlign: 'center', marginLeft: 8, marginRight: 8 }}
                      
                    />
                    <IconButton onClick={handleAdd} size="small">
                      <AddIcon />
                    </IconButton>
                  </div>
                </Typography>
                <br />
                <Typography  display="block" gutterBottom sx={{ textAlign: 'left' ,color:'red'}}>
                  <span style={{ marginRight: 8 ,color:'black'}}>Total</span> : LKR {book.book_price*quantity}.00 
          
                </Typography>
                <br />
                <div style={{display:'flex',flexDirection:'row'}}>
                  <Button sx={{width:'50%',backgroundColor:'#20bf6b',color:'black',border:'1px solid #20bf6b',left:0,display:'flex'}} onClick={handleOpen}>Buy</Button>
                  <PlaceOrderModal open={open} handleClose={handleClose} data={book} qty={quantity}/>
                  <Tooltip title="Add to cart">
                    <IconButton>
                      <ShoppingCartIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <br />
                <span style={{ textAlign: 'left',display:'flex' }}><LocalShippingOutlinedIcon/> Estimated deliver 5-7 days</span>
              </Box>
            </div>
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

export default PaymentPage;

