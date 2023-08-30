import React from "react";
import video from './video.mp4';

export default function() {
    const[demensions, setDemensions] = React.useState(window.innerWidth);
    const[showVideo, setShowVideo] = React.useState(false);

    window.addEventListener('resize', () => {
        setDemensions(window.innerWidth);
    });

    // Set height according to the width of the video container
    React.useEffect(() =>{
        const video_cover = document.querySelector('.video-cover');
        const cover_width = video_cover.offsetWidth;
        video_cover.style.height = `calc(0.664 * ${cover_width}px)`;
    }, [demensions]);


    // Function that Starts the video
    function startVideo() {
        document.querySelector('#start-icon').style.display = 'none';
        document.querySelector('#loading-icon').style.display = 'block';
        setTimeout(() => {
            setShowVideo(true);
            document.querySelector('#start-icon').style.display = 'block';
            document.querySelector('#loading-icon').style.display = 'none';
        }, 2000)
    }

    // Function that closes the video
    function closeVideo(){
        setShowVideo(false);
    }

    return (
        <div className="video-container">
            <div className="video-cover" onClick={startVideo}>
                <i className="fa-regular fa-circle-play" id="start-icon"></i>
                <i className="fa-solid fa-spinner fa-spin" id="loading-icon"></i>
            </div>
            <div className="blue-background"></div>
            {showVideo && 
                <div className="video-player">
                    <div className="video-wrapper">
                        <video width="100%" controls autoPlay>
                            <source src={video} type="video/mp4"></source>
                            Error: Video Not Found
                        </video>
                        <i className="fa-solid fa-rectangle-xmark close-video" onClick={closeVideo}></i>
                    </div>
                </div>
            }
        </div>
    ); 
}