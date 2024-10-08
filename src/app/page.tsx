'use client'
import { useEffect, useState } from "react";
import path from "path";
import './styles/home.scss';
import Link from "next/link";

export default function Home() {
 const[breed, setBreed] = useState< string[]>([])
 
 useEffect(()=>{
  fetch('https://dog.ceo/api/breeds/list/all')
      .then(res=>{
        if(res.ok){
          return res.json()
        }
      })
      .then(data=>{
        for(let i in data.message){
          if(data.message[i].length>0){
            for(let j in data.message[i]){
              setBreed((breed: string[])=>[...breed, `${data.message[i][j]}-${i}`])
            }
          }else{
            setBreed((breed: string[])=>[...breed, i])
          }
        }
      }).catch((error:any)=>{
        console.log(error)
      })
    
  },[])

  useEffect(() => {
    
    const timer = setTimeout(() => {
      localStorage.clear();
      console.log('localStorage has been cleared.');
    }, 600000); 

    return () => clearTimeout(timer);
  }, []);

  function seeBreed(e: React.MouseEvent<HTMLDivElement>){
    let breed: any = e.currentTarget.textContent
    localStorage.removeItem('breedName');
    localStorage.setItem('breedName', breed)
  }

 return (
    <>
     <h1>List of breeds</h1>
     <div>{breed.map((val:string, index: number)=>
     <Link href="/breedImages" key={index}>
      <p key={index}  onClick={(e)=>seeBreed(e)}>{val}</p>
      </Link>
      )
   }
      
     </div>
     
    </>
  );
}
