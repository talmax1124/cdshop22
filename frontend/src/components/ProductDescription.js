import React, { useEffect } from 'react'

 const ProductInformation = ({ Product }) => {
   useEffect(() => {
     const productDesc = document.querySelector('.productDesc')
     if (productDesc) {
      productDesc.innerHTML = Product.description
       let images = document.querySelectorAll('.productDesc img')
       if (images) {
         images.forEach((item) => {
           item.style.width = '100%'
         })
       }
     } else {
        console.log('productImportantInformation is not found')
     }
   }, [Product])

   return <p className='productDesc'></p>
 }

 export default ProductInformation