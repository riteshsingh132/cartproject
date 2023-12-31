import React from 'react'

function ShoppingCart({newData,setNewData,totalAmount,counData,setOrigCount,toggle}) {
    

  const recdData=JSON.parse(localStorage.getItem("data")) || [];

  const handleRemoveProduct = (productId) => {
    
    const updatedCart = newData.filter(item => item.id !== productId);
    setNewData(updatedCart)

    // Update localStorage
    localStorage.setItem("data", JSON.stringify(updatedCart));
  }
  



  return (
    <>
    
    <div className="container mx-auto ">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-5">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">{newData.length} Items</h1>
          </div>
          <div className="flex mt-10 mb-3">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
          </div>

          { recdData.map((item) => (
              
            <>
            
    
            <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-2" key={item.id}>
            {/* product */}
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24" src={item.prodimage} alt="Product" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                <span className="font-bold text-sm">{item.productname}</span>
                  <span className="text-red-500 text-xs">{item.brand}</span>
                  <a onClick={() => handleRemoveProduct(item.id)} href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">
                  Remove
                  </a>
                  </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                  {/* <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg> */}
                
                <input className="mx-2 border text-center w-8" type="text" value={item.quantity} />
                
                {/* <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg> */}
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">{item.price}</span>
              
                    <span className="text-center w-1/5 font-semibold text-sm">{item.totalPrice}</span>
                    
            {/* <span className="text-center w-1/5 font-semibold text-sm">{totalAmount}</span> */}
            </div>  
                  
            
            </>
          ))}
        </div>
        
          {/* <h3>Total Price:{item.quantity * item.price}</h3> */}

       
        <h3>Total Price:{totalAmount}</h3>
      </div>
    </div>
    

    </>
  )
}
export default ShoppingCart;