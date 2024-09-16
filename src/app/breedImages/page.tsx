'use client'
import { useEffect, useState } from 'react';
import '../styles/images.scss'
import Link from "next/link";

export default function breedImages(){
   const[images, setImages] = useState<string []>([])
    
    useEffect(()=>{
      let specificBreed: any = localStorage.getItem('breedName')
     
     if(specificBreed?.includes('-')){
      let parts = specificBreed.split('-')
      let breed = parts.slice(1).join('-')
      getData(breed)
    }else{
      getData(specificBreed)
    }
    },[])

    function getData(breed:string){
      fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then(res=>{
          if(res.ok){
            return res.json()
          }
        })
        .then(data=>{
          for(let i in data.message){
            setImages((images: string[])=>[...images, data.message[i]])
          }
        }).catch((error:any)=>{
          console.log(error)
        })
      
    }

    function addFavorite(image:string){
      const url = new URL(image);
      const pathname = url.pathname;

      const segments = pathname.split('/');
      const breedIndex = segments.indexOf('breeds') + 1;
      const breed = segments[breedIndex];
      
      let newFavorite = {image: image, breedName: breed}
     
      const favoritesString = localStorage.getItem('favorites');
      const existingArray = favoritesString ? JSON.parse(favoritesString) : [];
      
      if(existingArray.length>0){
         if(existingArray.some((item:any) => {if(item.image === newFavorite.image){
          return true
         }} )===false){
          existingArray.push(newFavorite);  
         }
       }else{
       existingArray.push(newFavorite);
       }
       
       localStorage.setItem('favorites', JSON.stringify(existingArray));
      
      
    }

    return(
        <>
        <h1>Images</h1>
        <div>
        {images.map((image:string ,index:number)=>{
             return <div key={index}>
              <Link  href="/favorites">
              <img  src={image} onClick={()=>addFavorite(image)}/>
              </Link>
              <Link  href="/favorites" >
              <button onClick={()=>addFavorite(image)}>Like</button>
              </Link>
              </div>
          })}
        </div>
        </>
    )
}