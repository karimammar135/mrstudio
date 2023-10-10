import React from "react";
import video from './video.mp4';

export default function VideoPlayer() {
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
                        <iframe width="100%" src="https://www.youtube.com/embed/Or0uSGol0GI?si=RsjygcZHr-bxsPTz?autoplay=1&mute=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <i className="fa-solid fa-rectangle-xmark close-video" onClick={closeVideo}></i>
                    </div>
                </div>
            }
        </div>
    ); 
}