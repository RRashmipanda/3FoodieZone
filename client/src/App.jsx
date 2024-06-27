import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Searchresult from './Components/Searchresult/Searchresult';
export const BASE_URL = "http://localhost:9000";



const App = () => {



const[data,setData] = useState(null);
const[filteredData,setFilteredData] = useState(null)
const [selectBtn,setSelectBtn] =useState('all')




useEffect(()=>{

  const fetchFoodData= async() =>{
    try {
      const response = await fetch(BASE_URL);
      const json= await response.json();
      setData(json);
      setFilteredData(json);
    } catch (error) {
       console.log("error");
    }   
    
  }
  fetchFoodData();
 },[])


const searchFood=(e) =>{
  const searchValue=e.target.value;
  console.log(searchValue);

  if(searchValue===""){
  setFilteredData(null);
  }

  const filter=data?.filter((food) =>
  food.name.toLowerCase().includes(searchValue.toLowerCase())
  )
  setFilteredData(filter);

}


const filteredFood =(type) =>{
  if(type === "all"){
  setFilteredData(data);
  setSelectBtn("all");
  return;
  }

  const filter=data?.filter((food) =>
  food.type.toLowerCase().includes(type.toLowerCase())
  );
  setFilteredData(filter);
  setSelectBtn(type);
}


const filterBtns=[
  {
    name:"All",
    type:"all",
  },
  {
    name:"Breakfast",
    type:"breakfast",
  },
  {
    name:"Lunch",
    type:"lunch",
  },
  {
    name:"Dinner",
    type:"dinner",
  },
];

  return (
    <>
    <Container>

      <Navbar>
         <div className='logo'>
          <img src='/Foody Zone.svg' alt='logo' />
         </div>

         <div className='search'>
          <input onChange={searchFood}  placeholder='Seacrh Food...'/>
         </div>

      </Navbar>
    
    <Filtercontainer>
      {filterBtns.map((value) =>(
        <Button key={value.name} onClick={() => filteredFood(value.type)}>
        {value.name}
         </Button>    
         ))}
    </Filtercontainer>

    </Container>

    <Searchresult data = {filteredData} />
    </>
  )
}

export default App


const Container = styled.div`

max-width:1200px;
margin:0 auto;
`;


const Navbar=styled.section`
  min-height:140px;
  display:flex;
  justify-content:space-between;
  padding:16px;
  align-items:center;


  .search{
  input{
     background-color: transparent;
     border:1px solid red;
     color:white;
     border-radius:5px;
     height:40px;
     font-size:16px;
     padding:0 10px;
}
  }

`;

const Filtercontainer=styled.section`
 display:flex;
 justify-content:center;
 gap: 12px;
padding-bottom : 40px;
`;

export const Button=styled.button`
   background:red;
   border-radius:5px;
   padding:6px 12px;
   border:none;
   color:white;
`;
