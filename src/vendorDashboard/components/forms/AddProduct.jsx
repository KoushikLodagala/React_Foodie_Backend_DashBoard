import React, {useState} from 'react'
import {API_URL} from '../../data/apiPath'
import { data } from 'react-router-dom';


const AddProduct = () => {

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');


  const handleCategoryChange = (event)=>{
    const value = event.target.value;
      if(category.includes(value)){
        setCategory(category.filter((item)=> item !== value));
  
      }else{
        setCategory([...category,value]);
      }
  }

    const handleBestSeller = (event)=>{
      const value = event.target.value === 'true'
      setBestSeller(value);
    }

    const handleImageUpload = (event)=>{
      const selectedImage = event.target.files[0];
      setImage(selectedImage)
    }


    const handleAddProduct = async(e)=>{
          e.preventDefault()

          try {
            const loginToken = localStorage.getItem('loginToken');    
            const firmId = localStorage.getItem('firmId')
              if(!loginToken || firmId){
                  console.error("User not Authenticated")
              }
              const formData = new FormData()
              formData.append('productName', productName)
              formData.append('price', price)
              formData.append('description', description)
              formData.append('image',image)


              category.forEach((value)=>{
                formData.append('category', value)
              })

            const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
              method: 'POST',
              body: formData,
            })
              const data = await response.json()
              if(response.ok){
                alert('Product added successfully')
              }

              setProductName("")
              setPrice("")
              setCategory([])
              setBestSeller(false)
              setImage(null)
              setDescription("")

          } catch (error) {
            alert('Failed to add the product')
            
          }
    }


  return (
    <div className="firmSection">
        <form className='tableForm' onSubmit={handleAddProduct} >
            <h3>Add Product</h3>
        
            <label > Product Name</label>
            <input type="text" name="productName" value={productName} onChange={(e)=> setProductName(e.target.value)} placeholder="Enter Product Name" />

            <label > Price </label>
           <input type="number" name="price" onChange={(e)=> setPrice(e.target.value)} value={price} placeholder="Enter Price" />

           <div className="checkinp">
              <label>Category</label>
             <div className="inputsContainer">
             <div className="checkboxContainer">
                <label >Veg</label>
                <input type="checkbox"  checked={category.includes('veg')} onChange={handleCategoryChange}  value="veg"/>
              </div>

              <div className="checkboxContainer">
                <label >Non-Veg</label>
                 <input type="checkbox" checked={category.includes('non-veg')}  onChange={handleCategoryChange}  value="non-veg" />
              </div>
             </div>
            </div>


            <div className="checkinp">
              <label>Best Seller</label>
             <div className="inputsContainer">
             <div className="checkboxContainer">
                <label >Yes</label>
                <input type="radio" checked = {bestseller===true} onChange={handleBestSeller}  value="true"/>
              </div>

              <div className="checkboxContainer">
                <label >No</label>
                 <input type="radio" checked = {bestseller===false} onChange={handleBestSeller}  value="false" />
              </div>
             </div>
            </div>


            <label > Description</label>
            {/* <textarea name="description" onChange={(e)=> setDescription(e.target.value)}  value={description} placeholder="Enter Description"></textarea> */}
            <input type="text" name="description" onChange={(e)=> setDescription(e.target.value)}  value={description} placeholder="Enter Description"  />
               <br />

            <label >Product Image </label>
            <input type="file" name="image" onChange={handleImageUpload} placeholder="Enter Image"/>
            <br />

            <div className="btnSubmit">
            <button type="submit">Submit</button>
   

        </div>
        </form>
   </div>
  )
}

export default AddProduct