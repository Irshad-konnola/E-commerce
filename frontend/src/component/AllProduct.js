import React, { useEffect, useState } from 'react';
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import { useSelector } from 'react-redux';


const AllProduct = ({heading}) => {
    const productData = useSelector((state)=>state.product.productList);
    const categoryList = [...new Set(productData.map(el=>el.category))]
    console.log(categoryList);

    // filter data display
   const [filterby,setFilterby] = useState("")
   const [dataFilter,setDataFilter] = useState([])

   useEffect(()=>{
    setDataFilter(productData)
   },[productData])

  const handleFilterProduct =(category)=>{
    setFilterby(category)
    const filter = productData.filter(el=>el.category.toLowerCase() === category.toLowerCase())
    setDataFilter(()=>{
      return[
       ...filter
      ]
    })
  }
  const loadingArrayFeature =new Array(10).fill(null)
  return (
    <div>
        <div className='my-5'>
    <h2 className='font-bold text-2xl text-slate-800 mb-4 '> {heading}</h2>

    <div className='flex gap-4 justify-center overflow-scroll scroll-none'>
      {
        categoryList[0] ? categoryList.map(el=>{
          return(
            <FilterProduct isActive={el.toLowerCase() === filterby.toLowerCase()} category={el} key={el} onClick={()=>handleFilterProduct(el)}/>
          )
        })
        :
        <div className='min-h-[150px] flex justify-center items-center'>
                <p>Loading...</p>
            </div>
      }
    </div>
      
     <div className='flex flex-wrap justify-center gap-4 my-4'>
       {dataFilter[0] ? dataFilter.map(el=>{
        return(
          <CardFeature key={el._id}
           id={el._id} 
           image={el.image} 
           name={el.name} 
           category={el.category} 
           price={el.price }/>
        )
       })
       :
       loadingArrayFeature.map((el,index)=><CardFeature loading={"Loading..."} key={index+"allProduct"} />)
      }
       
     </div>
    </div>
    </div>
  )
}

export default AllProduct