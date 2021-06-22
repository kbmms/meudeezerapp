import React, { useEffect, useState } from 'react'
import styles from '../../pages/estilos/search.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ReactAudioPlayer from 'react-audio-player';
export default function MusicSingle(){
    
    const [mysingle, setMysingle] = useState(null)
    const router = useRouter()

    useEffect(()=>{
        
        async function loadSingle(){
            let response = null;
            try{
                response = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/track/${router.query.id}`,{
                    headers:{
                        "x-rapidapi-key": "2c2c184f96msh1a94b9d80f1253ap1c3ca7jsnd78690428f06",
                        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                        "useQueryString": true
                    },
                })
            }catch(erro){
                console.log(response.data)
            };
            setMysingle(response.data);
        }
        loadSingle();

    }, [])

    return(
        <div className={styles.singleBox}>{
            }
           {!mysingle ? 
            (<div>Carregando...</div>):
            (<div>
                {
                    !mysingle.error ? 
                    (<div className={styles.singleBox_down}>
                        <div>

                        <Link href="/favoritos"><a className={styles.searchMainA}>Favoritos</a></Link> 
                         <Link href="/"><a className={styles.searchMainA}>Inicio</a></Link>
                        </div>
                        <h1>{mysingle.album.title}</h1>
                        <img src={mysingle.album.cover_big} alt="" />
                        <h4>{mysingle.title}</h4>
                        <ReactAudioPlayer controls src={mysingle.preview} />
                        
                       
                    </div>):
                    (<div>
                        <h1>Houve um erro, tente novamente mais tarde!</h1>
                        <Link href="/"><a className={styles.searchMainA}>Inicio</a></Link> <Link href="/favoritos"><a className={styles.searchMainA}>Favoritos</a></Link>
                    </div>)
                }

            </div>)
           }
          
      
           
        </div>
    )
}