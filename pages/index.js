import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import ReactAudioPlayer from 'react-audio-player';
import styles from './estilos/search.module.css'

export default function Search(){
    const [search, setSearch] = useState('')
    const [mysearch, setMysearch] = useState([])
    const [loading, setLoading] = useState(false)
    const [itemFav, setItemFav] = useState([])
    const [bg, setBg] = useState('')
    let timeOutSearch = useRef(null)
    let bgError = `data:image/png;base64,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`
    
    useEffect(()=>{
        function loadDeezers(){
            let response = null;

            setLoading(true)

            if(timeOutSearch.current){
                clearInterval(timeOutSearch.current)
            }

            timeOutSearch.current = window.setTimeout( async ()=>{
                try{
                    response = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/search`,{
                        headers:{
                            "x-rapidapi-key": "2c2c184f96msh1a94b9d80f1253ap1c3ca7jsnd78690428f06",
                            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                            "useQueryString": true
                        },
                        params:{
                            "q": search
                        }
                    })
                    
                }catch(erro){
                    console.log(erro)
                }
                setMysearch(response.data.data)

                setLoading(false)
                if(response.data.data){

                    if(response.data.total == 0){
                        setBg(`${bgError}`)
                    }else{
                        setBg(response.data.data[1].artist.picture_xl)
                    }
                
                }
               

            }, 500)

        }   

        loadDeezers();

        //Carregar os itens do localstorage
        const json = localStorage.getItem("newFav");
        const savedFavorites = JSON.parse(json);
        if (savedFavorites) {
            setItemFav(savedFavorites);
        }

 

    }, [search])

    useEffect(() => {
        //Salvar os favoritos no localstorage
        const json = JSON.stringify(itemFav);
        localStorage.setItem("newFav", json);
        
      }, [itemFav]);

    function handleFav(itemFavId){
        setItemFav([...itemFav, mysearch[itemFavId]]);
        }

    return(
        <div className={styles.App}>
        <div className={styles.bgRel}>
            {bg &&
             <div className={styles.uiBackgroundBox} style={{backgroundImage: `url("${bg}")` }}>  </div>
           }
            <div className={styles.search}>
                <h1>New ReactJs Deezer App</h1>
                <Link href="/favoritos">
                    <a  className={styles.searchMainA}>Favoritos</a>
                </Link>
                    <div>{loading && <span>Carregando...</span>}</div>
                   
                    <div>
                        {!loading &&
                         <div>
                         {mysearch &&
                            <div>{mysearch.length <= 0 &&
                                (
                                <span>Não encontramos nada...</span>
                                )}
                            </div>
                         }
                        </div>
                        }                           
                    </div>

            <input type="text" className={styles.searchMainInput} placeholder="Faça sua busca aqui" value={search} onChange={(text) => setSearch(text.target.value)} />
            
            <div className={styles.cardsSearchResult}>
                {mysearch ? (
                    <div>

                        {mysearch.map((searchResults, index)=>{
                            return(
                            <div key={searchResults.id} className={styles.resultSearchCard}>
                         
                                <Link href={`/single/${encodeURIComponent(searchResults.id)}`}>
                                <a className={styles.searchMainA}><span>{searchResults.title}</span></a>
                                </Link>
                                
                                <span>Album: {searchResults.album.title}</span>

                                <img src={searchResults.album.cover_small} alt="" />

                                <a className={styles.searchMainA} href={searchResults.link}>Ouvir no deezer</a>

                                <ReactAudioPlayer controls src={searchResults.preview} />
                                
                                <button className={styles.btnFavorites} onClick={()=> handleFav(index)}>Favoritar!</button>
                                
                            </div>
                            )
                        })}
                    </div>
                ) : (
                    <span>Pesquise por sua música!</span>
                    
                )
                

                }
            </div>
            </div>
 
        </div>
   </div>
    )
}