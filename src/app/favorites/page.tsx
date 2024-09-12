'use client'
import '../styles/favorites.scss'
import { useEffect, useState } from "react"

interface favorites{
  breedName: string
  image: string
}

export default function(){
   const[favoritesContainer, setFavoritesContainer] = useState<favorites []>([])
   const[selected, setSelected] = useState('')
   
    useEffect(()=>{
        const favorites = localStorage.getItem('favorites');
        let favoritesArr: any = favorites ? JSON.parse(favorites) : [];
        setFavoritesContainer(favoritesArr)
        
    },[])

    function selectBreed(e:any){
      setSelected(e.currentTarget.textContent)
    }

    return(
        <>
        <div>
            {favoritesContainer.map((data: any,index:number)=>{
               if(selected===''){
                return <div key={index}>
                <p onClick={selectBreed}>{data.breedName}</p>
                <img src={data.image}/>
               </div>
               }else{
                if(data.breedName===selected){
                    return <div key={index}>
                <p onClick={selectBreed}>{data.breedName}</p>
                <img src={data.image}/>
               </div>
                }
               }
               
            })}
            
        </div>
        </>
    )
}