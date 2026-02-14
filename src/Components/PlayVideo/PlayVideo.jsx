import React, { useEffect, useState } from "react";
import './PlayVideo.css';
import video1 from '../../assets/video.mp4';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY } from "../../data.js";
import { value_converter } from "../../data.js";
import { useParams } from "react-router-dom";
import moment from "moment";



const PlayVideo=()=>{
    const {videoId} = useParams();

    const [apiData,setApiData]=useState(null);
    const [channelData,setChannelData]=useState(null);
    const [commentData,setCommentData]=useState(null);

    
    const fetchChannelData=async()=>{
        //Data for channel like channel name,subscribers & etc..
    if(!apiData || !apiData.snippet) return;

    const channelData_url =`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]));

    
        //fetching comments data for the video
        const commentData_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(commentData_url).then(res=>res.json()).then(data=>setCommentData(data.items));
    }

    const fetchVideoData=async()=>{
        //Data for playVideo page like title,views & etc..

        const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));
    
    }

    useEffect(()=>{
        fetchVideoData();
    },[videoId]);

    useEffect(()=>{
        fetchChannelData();
    },[apiData]);


    return(
        <div className="play-video">
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>{apiData?apiData.snippet.title:"Title is Loading..."}</h3>
            <div className="play-video-info">
                <p>{apiData?value_converter(apiData.statistics.viewCount):"0"} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
                <div>
                    <span><img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):"0"}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <div className="publisher">
                {channelData ? (
                  <img src={channelData.snippet.thumbnails.default.url} alt="" />
                ) : null}
                <div>
                    <p>{apiData?apiData.snippet.channelTitle:"Channel Name"}</p>
                    <span>{channelData?value_converter(channelData.statistics.subscriberCount):"0"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData?apiData.snippet.description.slice(0,260):"Description is Loading..."}</p>
                <hr />
                <h4>{apiData?value_converter(apiData.statistics.commentCount):"0"} Comments</h4>

                {commentData?commentData.map((item,index)=>{
                    return (
                        <div key={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                }):<p>Comments are Loading...</p>}
                
            </div>
        </div>
    )
}

export default PlayVideo