import React from "react";
import './Recommended.css';
import { API_KEY, value_converter } from "../../data.js";
import moment from "moment";
import { useEffect,useState} from "react";
import { Link } from "react-router-dom";


const Recommended=({categoryId})=>{
    const [apiDatas,setApiDatas]=useState([]);

    const fetchRecommendedVideos=async()=>{
            if(!categoryId) return;
            const recommendedVideos_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=52&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(recommendedVideos_url).then(res=>res.json()).then(data=>setApiDatas(data.items || []));
    }

    useEffect(()=>{
        fetchRecommendedVideos();
    },[categoryId])

    return(
        <div className="recommended">
                {(apiDatas || []).map((item,index)=>{
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h2>{item.snippet.title}</h2>
                            <h4>{item.snippet.channelTitle}</h4>
                            <p>{item.statistics ? value_converter(item.statistics.viewCount) : "0"} views &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
                        </div>
                    </Link>
                )
            })}
            
        </div>

    )
}

export default Recommended
