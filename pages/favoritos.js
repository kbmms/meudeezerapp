
import React, { useEffect, useState } from "react"
import ReactAudioPlayer from 'react-audio-player';
import styles from './estilos/search.module.css'
import Link from 'next/link'
export default function Favorites(){
    const [fav, setFav] = useState([]);
    useEffect(()=>{
        const musicStorage = localStorage.getItem('newFav');
        if(musicStorage){
            setFav(JSON.parse(musicStorage))
        }
    }, [])
    console.log(fav)
    return(
        <div>

        <div className={styles.favHeader}>
            <h1 className={styles.favTitle}>Favoritos</h1>
            <Link href="/" style={{color:"#fff", textDecoration:'none', fontSize:13}}>
                <a>VOLTAR</a>
            </Link>
        </div>
        
        <div className={styles.favoritesMain}>
            {fav.length < 1 &&
                <h1 className={styles.favNoMusic}>Adicione suas múscias na página inicial</h1>
            }
           {fav.map((item)=>(
               <div className={styles.favoritesCard}>
                    <Link href={`/single/${encodeURIComponent(item.id)}`}>
                    <a className={styles.searchMainA}>{item.title}</a>
                    </Link>
                   <h3 className={styles.favoritesCardH3}>{item.title}</h3>
                   <h4 className={styles.favoritesCardH4}>{item.album.title}</h4>
                   <img className={styles.favoritesCardImg} src={item.album.cover_medium} alt="" />
                   <ReactAudioPlayer controls src={item.preview} />
               </div>
           )).sort().reverse()}
        </div>
        </div>
    )
}