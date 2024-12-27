import Reactc,{useState} from 'react'
import {API_URL} from '../../data/apiPath'

const AddFirm = () => {
const [firmname, setFirmName] = useState('');
const [area, setArea] = useState('');
const [category, setCategory] = useState([]);
const [region, setRegion] = useState([]);
const [offer, setOffer] = useState("");
const [file, setFile] = useState(null);


const handleCategoryChange = (event)=>{
  const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value));

    }else{
      setCategory([...category,value]);
    }
}



const handleRegionChange = (event)=>{
  const value = event.target.value;
    if(region.includes(value)){
      setRegion(category.filter((item)=> item !== value));

    }else{
      setRegion([...region,value]);
    }
}

const handleImageUpload = (event)=>{
  const selectedImage = event.target.files[0];
  setFile(selectedImage);
}


const handleFirmSubmit = async (e)=>{
  e.preventDefault();
  try {
    const loginToken = localStorage.getItem('loginToken');
    if(!loginToken){
      console.error("User not authenticated")
    }

    const formData = new FormData();
    formData.append('firmname', firmname);
    formData.append('area', area);
    formData.append('offer', offer);
    formData.append('image', file);

    category.forEach((value)=>{
      formData.append('category', value);
    })

    region.forEach((value)=>{
      formData.append('region', value);
    })

    const response =await fetch(`${API_URL}/firm/add-firm`,{
      method: 'POST',
      headers: {
        'token': `${loginToken}`
      },
      body: formData
    })
    const data = await response.json()
    if(response.ok){
      console.log(data)
      setFirmName("")
      setArea("")
      setCategory([])
      setRegion([])
      setOffer("")
      setFile(null)
      alert("Firm added Successfully")
     
      
    }else if (data.message === "Vendor can have only one firm"){
      alert("Firm Exists 🥗 . Only one firm can be added by a vendor")
    }else{
      alert("Failed to add firm")
    }
     console.log("this is firmId", data.firmId)
    
     const firmId = data.firmId;

     localStorage.setItem('firmId',firmId)
     

  } catch (error) {
    console.error( error,"failed to add firm")
  }
}




  return (
   <div className="firmSection">
        <form className='tableForm' onSubmit={handleFirmSubmit}  > 
            <h3>Add Firm</h3>
        
            <label > Firm Name</label>
            <input type="text" name="firmName" value={firmname} onChange={(e)=>setFirmName(e.target.value)} placeholder="Enter Firm Name"/>

            <label > Area</label>
            <input type="text" name="area" value={area} onChange={(e)=>setArea(e.target.value)} placeholder="Enter Area"/>

            {/* <label > Category</label> */}
            <div className="checkinp">
              <label>Category</label>
             <div className="inputsContainer">
             <div className="checkboxContainer">
                <label >Veg</label>
                <input type="checkbox" checked={category.includes('veg')}  value="veg" onChange={handleCategoryChange}  />
              </div>

              <div className="checkboxContainer">
                <label >Non-Veg</label>
                 <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}  />
              </div>
             </div>
            </div>


            <div className="checkinp">
              <label>Region</label>
             <div className="inputsContainer">
             <div className="regboxContainer">
                <label >South-Indian</label>
                <input type="checkbox" checked={region.includes('south-indian')}  value="south-indian" onChange={handleRegionChange} />
              </div>

              <div className="regboxContainer">
                <label >North-Indian</label>
                 <input type="checkbox" checked={region.includes('north-indian')} value="north-indian" onChange={handleRegionChange} />
              </div>

              <div className="regboxContainer">
                <label >Chinese</label>
                 <input type="checkbox" checked={region.includes('chinese')} value="chinese" onChange={handleRegionChange} />
              </div>

              <div className="regboxContainer">
                <label >Bakery</label>
                 <input type="checkbox" checked={region.includes('bakery')} value="bakery" onChange={handleRegionChange} />
              </div>
             </div>
            </div>
             
  

            <label > offer</label>
            <input type="text" value={offer} name="offer" onChange={(e)=>setOffer(e.target.value)} placeholder="Enter Offer"/>

            <label > image</label>
            <input type="file" name="image" placeholder="Enter Image"  onChange={handleImageUpload} />
            <br />

            <div className="btnSubmit">
            <button type="submit">Submit</button>
   

        </div>
        </form>
   </div>
  )
}

export default AddFirm