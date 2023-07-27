/* eslint-disable @typescript-eslint/no-explicit-any */
import  React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { BookModel } from '../../utils/interface';
import { toast } from 'react-toastify';
import { insertBookService, updateStudentService } from '../../services/BookServices';
import { useDispatch } from 'react-redux';
import { setUpdates } from '../../pages/AllProducts/AllProductsSlice';
const BoxStyle = {
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

export default function UpdateBookModal({ open, handleClose ,data}:any) {
  const [bookNameError, setBookNameError] = React.useState('');
  const [bookAuthorError, setBookAuthorError] = React.useState('');
  const [bookQtyError, setBookQtyError] = React.useState('');
  const [bookPriceError, setBookPriceError] = React.useState('');
  const [bookTypeError, setBookTypeError] = React.useState('');
  
  const [book_name, setBookName] = React.useState(data.book_name);
  const [book_author, setBookAuthor] = React.useState(data.book_author);
  const [book_qty, setBookQty] = React.useState(data.book_qty);
  const [book_price, setBookPrice] = React.useState(data.book_price);
  const [book_type, setBookType] = React.useState(data.book_type);
  const _id=data._id;
  const bid=data.bid;
  const dispatch = useDispatch();
  async function updateBookFunction() {
    
    const bookSample = { _id,bid,book_name , book_author , book_qty , book_price , book_type };

    if (checkInputValidation(bookSample)) {
      const response = await updateStudentService(bookSample);
      if(response!=null){
        clearFields();
        dispatch(setUpdates(true));
        toast.success('Book Updated Successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      
    }
  }  
  function clearFields() {
    setBookName('');
    setBookAuthor('');
    setBookQty('');
    setBookPrice('');
    setBookType('');
    handleClose();
    
  }
  function checkInputValidation(dataItem:any) {
    const bookNameRegex = /^[A-z 0-9]{2,20}$/;
    const bookAuthorRegex = /^[A-z ]{2,20}$/;
    const bookQtyRegex = /^[0-9]{1,5}$/;
    const bookPriceRegex = /^[0-9.]{2,5}$/;
    const bookTypeRegex = /^[A-z]{2,20}$/;
    //const bookImgRegex = /^data:image\/(jpeg|jpg|png|gif);base64,([A-Za-z0-9+/=])+$/;
    let fieldStatus = false;

    if (dataItem.book_name !== undefined && bookNameRegex.test(dataItem.book_name)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setBookNameError('Enter valid book name');
      return;
    }

    if (dataItem.book_author !== undefined && bookAuthorRegex.test(dataItem.book_author)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setBookAuthorError('Check valid book author');
      return;
    }

    if (dataItem.book_qty !== undefined && bookQtyRegex.test(dataItem.book_qty+'')) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setBookQtyError('Check valid Password');
      return;
    }

    if (dataItem.book_price+'' !== undefined && bookPriceRegex.test(dataItem.book_price+'')) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setBookPriceError('Check valid book price');
      return;
    }

    if (dataItem.book_type !== undefined && bookTypeRegex.test(dataItem.book_type)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setBookTypeError('Check valid book type');
      return;
    }

    return fieldStatus;
  }
  function checkValidation(field: string, value: string) {
    const bookNameRegex = /^[A-z 0-9]{2,20}$/;
    const bookAuthorRegex = /^[A-z ]{2,20}$/;
    const bookQtyRegex = /^[0-9]{1,5}$/;
    const bookPriceRegex = /^[0-9.]{2,5}$/;
    const bookTypeRegex = /^[A-z]{2,20}$/;
    //const bookImgRegex = /^data:image\/(jpeg|jpg|png|gif);base64,([A-Za-z0-9+/=])+$/;
    
    switch (field) {
    case 'bookName':
      if (bookNameRegex.test(value)) {
        setBookNameError('');
        setBookName(value);
      } else {
        setBookNameError('Enter valid name');
        setBookName(value);
      }
      break;

    case 'bookAuthor':
      if (bookAuthorRegex.test(value)) {
        setBookAuthorError('');
        setBookAuthor(value);
      } else {
        setBookAuthorError('Check valid author Name');
        setBookAuthor(value);
      }
      break;

    case 'bookQty':
      if (bookQtyRegex.test(value)) {
        setBookQtyError('');
        setBookQty(value);
      } else {
        setBookQtyError('Check valid Qu');
        setBookQty(value);
      }
      break;

    case 'bookPrice':
      if (bookPriceRegex.test(value)) {
        setBookPriceError('');
        setBookPrice(value);
      } else {
        setBookPriceError('Check valid price');
        setBookPrice(value);
      }
      break;

    case 'bookType':
      if (bookTypeRegex.test(value)) {
        setBookTypeError('');
        setBookType(value);
      } else {
        setBookTypeError('Check valid price');
        setBookType(value);
      }
      break;
    }
    
  }
 
  return (
    <Modal
      open={open}
      //onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={BoxStyle}>
        <Button
          onClick={handleClose} 
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          <CloseIcon /> 
        </Button>

        <Typography marginBottom={2} id="modal-modal-title" variant="h6" component="h2">
           Update book
        </Typography>

        {/* form area */}
        <div style={{top:'10%',color:'red'}}>
          <TextField
            style={{width:'100%'}}
            error={bookNameError !== ''}
            className="txtField bookNameField"
            id="bookName"
            label="Book Name"
            type="Text"
            value={book_name}
            variant="filled"
            helperText={bookNameError}
            size="small"    
            onChange={(e) => {
              checkValidation('bookName', e.target.value);
            }}
          />
          <TextField
            style={{width:'100%'}}
            error={bookAuthorError !== ''}
            className="txtField bookAuthorField"
            id="bookAuthor"
            label="Book Author"
            type="Text"
            value={book_author}
            variant="filled"
            helperText={bookAuthorError}
            size="small"
            onChange={(e) => {
              checkValidation('bookAuthor', e.target.value);
            }}
          />
          <TextField
            style={{width:'100%'}}
            error={bookQtyError !== ''}
            className="txtField bookQtyField"
            id="bookQty"
            label="Book Qty"
            type="Text"
            variant="filled"
            value={book_qty}
            autoComplete="current-password"
            helperText={bookQtyError}
            size="small"
            onChange={(e) => {
              checkValidation('bookQty', e.target.value);
            }}
          />
          <TextField
            style={{width:'100%'}}
            error={bookPriceError !== ''}
            className="txtField bookPriceField"
            id="bookPrice"
            label="Book Price"
            type="Text"
            value={book_price}
            variant="filled"
            helperText={bookPriceError}
            size="small"
            onChange={(e) => {
              checkValidation('bookPrice', e.target.value);
            }}
          />
          <TextField
            style={{width:'100%'}}
            error={bookTypeError !== ''}
            className="txtField bookTypeField"
            id="bookType"
            label="Book Type"
            type="Text"
            variant="filled"
            value={book_type}
            helperText={bookTypeError}
            size="small"
            onChange={(e) => {
              checkValidation('bookType', e.target.value);
            }}
          />


          <Button
            className="btn saveInBtn"
            sx={{backgroundColor:'#ff7f50',width:'100%',color:'black',marginTop:'5%',border:'2px solid #ff7f50'}}
            onClick={updateBookFunction}
          >
                UPDATE
          </Button>
        </div>
      </Box>
    </Modal>
  );
}


