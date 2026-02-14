import React from "react";
import './Video.css'
import PlayVideo from "../../Components/PlayVideo/PlayVideo.jsx";
import Recommended from "../../Components/Recommended/Recommended.jsx";
import { useParams } from "react-router-dom";

const Video=()=>{
    const { catagoryId: categoryId, videoId } = useParams();

    return(
        <div className='play-container'>
            <PlayVideo videoId={videoId} categoryId={categoryId}/>
            <Recommended categoryId={categoryId}/>
        </div>
    )
}

export default Video