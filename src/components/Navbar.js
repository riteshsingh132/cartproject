import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Dialog, DialogTitle, DialogContent, TextField, Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import ShoppingCart from './ShoppingCart';

function Navbar() {

 const navigate=useNavigate()
  const [data, setData] = useState({
    productname: "",
    prodimage: "",
    price: "",
    quantity:1,
    image: null
  })
  const [storagedata, setStorageData] = useState([])
  const [newData, setNewData] = useState([])
  const [counData,setCountData]=useState(0)
  const [totalAmount, setTotalAmount] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [orgCount,setOrigCount]=useState(0)
  const [showBox,setshowBox]=useState(false)

console.log(data)
  const handleOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    console.log(file)

    // Perform size validation here (100KB)
    if (file && file.size <= 100 * 1024) {
      const imageUrl = URL.createObjectURL(file);
      setData((prev) => ({ ...data, prodimage: imageUrl, image: file }))
      setProductImage(imageUrl);

      // setImage(file);

    } else {
      alert("Please upload a file below 100 kb")
    }

  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
    setData((prev) => ({ ...prev, productname: event.target.value }))
  };

  const handlePriceChange = (event) => {
    setData((prev) => ({ ...prev, price: event.target.value }));
  };

  
  const handleSubmit = () => {
    if(data.productname ===""){
      alert("Please File Product Name")
    }else if(data.price ==""){
      alert("Please File Product Price")
    
    }else{
    const id=uuidv4();
    const newProduct={...data,id}
    setNewData([...newData, newProduct])
    setData({productname: "",prodimage: "",price: "",image: null})
     localStorage.setItem("data", JSON.stringify([...newData, data]))
     navigate("./")
     setshowBox(true)
     setOpen(false);
    // Perform form submission logic here
    setTimeout(() => {
      const updatedData = [...newData, newProduct];
      localStorage.setItem("data", JSON.stringify(updatedData));
    }, 0);

    }

  };

  useEffect(() => {
    const receData = JSON.parse(localStorage.getItem("data"))
    if(receData){
      setNewData(receData)
    }
    setStorageData(receData)
  }, [])

  const handleIncre = (productId) => {
    setCountData((prev) => {
      const updatedCountData = { ...prev };
      updatedCountData[productId] = (prev[productId] || 0) + 1;
      return updatedCountData;
    });
  };

  const handleDecre = (productId) => {
    setCountData((prev) => {
      const prevCount = prev[productId] || 0;
      const newCount = Math.max(prevCount - 1, 0);
      return {
        ...prev,
        [productId]: newCount
      };
    });
  };
  // const handleAddToBag = (productId, price) => {
  //   const count = counData[productId] || 0;
  //   const updatedTotalAmount = Object.keys(counData).reduce((acc, currProductId) => {
  //     const productCount = counData[currProductId] || 0;
  //     const productPrice = newData.find(item => item.id === currProductId)?.price || 0;
  //     return acc + productCount * productPrice;
  //   }, 0);
  //   setTotalAmount(updatedTotalAmount);
  // };



  // const handleAddToBag = (prd) => {
  //   const cart=JSON.parse(localStorage.getItem("data")) || []
  //   const prdamt=cart?.find((item)=>item.id===prd.id)

  //   let totalPrice = 0;
    

  //   newData.forEach((item) => {
  //     const count = counData[item.id] || 0;
  //     totalPrice += count * item.price;
  //     setOrigCount(count)

  //   });

  //   setTotalAmount(totalPrice);
    
  // };


  const [toggle,setToggle]=useState(false)

  const handleAddToBag = (prd) => {
    const cart = JSON.parse(localStorage.getItem("data")) || [];
    const updatedCart = cart.map((item) => {
      if (item.id === prd.id) {
        const count = counData[item.id] || 0;
        const totalPrice = count * item.price;
        return {
          ...item,
          quantity: count,
          totalPrice: totalPrice,
        };
      }
      return item;
    });
  
    localStorage.setItem("data", JSON.stringify(updatedCart));
    setNewData(updatedCart);
  
    let totalPrice = 0;
    updatedCart.forEach((item) => {
      totalPrice += item.totalPrice || 0;
    });
  
    setTotalAmount(totalPrice);
    setToggle(true)
  };
  // const handleAddToBag = (productId, price) => {
  //   const count = counData[productId] || 0;
  //   const amount = count * price;
  //   setTotalAmount((prev) => prev + amount);
  // };


  return (
    <div>
      <AppBar  position="fixed" style={{  backgroundColor:"black" }}  >
        
        <Toolbar className='justify-content-between'>
          <Typography style={{fontWeight:"bold",fontSize:"20px"}}>RITESH SINGH</Typography>
          <Button sx={{ backgroundColor: "red", ":hover":{bgcolor:"green"}}} color="inherit" onClick={handleOpen}>
            Add Product
          </Button> 
        </Toolbar>
      </AppBar>

       <Dialog open={open}>
        <DialogTitle sx={{margin:"0 0 5px 0" }}>Add Product</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
           <input type="file" style={{margin:"0 0 5px 0"}} accept="image/*" onChange={handleImageChange} />
            <TextField sx={{margin:"10px 0 10px 0"}}
              label="Product Name"
              value={data.productname}
              onChange={handleProductNameChange}
              required
            />
            <TextField
              label="Price"
              value={data.price}
              onChange={handlePriceChange}
              type='number'
              required
            />
            <Button  onClick={handleSubmit}>Add Product</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <div style={{border:"1px solid red"}}>

      {newData && <div className='container d-flex flex-wrap col-10' style={{marginTop:"100px"}}>
          {newData.map((item) => {

            const count = (counData[item.id] || 0);
            const totalPrice = count * item.price;
          

            return (
              <>
              <div style={{ gap: "25px", margin: "0 auto 10px auto",padding:"0 0 10px 0", textAlign: "center", borderRadius:"10px",boxShadow:"2px 5px 10px #ccc"}}>
                <div style={{  gap: "20px", width: "200px", margin: "15px 10px" }}>
                  <img src={item.prodimage} alt="Product" style={{ width: "200px", height: "200px" }} />
                </div>
                <div><h5>{item.productname}</h5></div>
                <div><p>{item.price}</p></div>
            
                <div className='container d-flex justify-content-center' style={{ margin: "0 auto", padding:"10px 0 0 0" }}>
                  <div >
                    <button style={{ width: "25px", backgroundColor: "green",borderRadius:"5px",color:"white",fontWeight:"bold" }} onClick={()=>handleIncre(item.id)} >+</button>
                  </div>
                  <div style={{ margin: "0 10px" }}>
                    <p>{String(counData[item.id] || 0)}</p>

                  </div>
                  <div>
                    <button style={{ width: "25px", backgroundColor: "red",borderRadius:"5px",color:"white",fontWeight:"bold" }} onClick={()=>handleDecre(item.id)}>-</button>

                  </div>

                </div>

                <button class="btn-primary" style={{width:"100px",padding:"10px 10px",borderRadius:"5px",color:"white"}} onClick={() => handleAddToBag(item)}>Add to Bag</button>
               
              </div>
              
              </>
            )
          })}
        </div>}
       
      </div>
     
    
     <ShoppingCart newData={newData} totalAmount={totalAmount} counData={counData} setOrigCount={setOrigCount} toggle={toggle}/>
  
    </div>
  );
}

export default Navbar;