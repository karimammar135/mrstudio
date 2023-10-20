import React from "react";

export default function VideoPlayer({ page, hotel }) {
    const[demensions, setDemensions] = React.useState(window.innerWidth);
    const[showVideo, setShowVideo] = React.useState(false);
    const[video_path, setVideo_path] = React.useState("");

    window.addEventListener('resize', () => {
        setDemensions(window.innerWidth);
    });

    // Set height according to the width of the video container
    React.useEffect(() =>{
        const video_cover = document.querySelector('.video-cover');
        const cover_width = video_cover.offsetWidth;
        video_cover.style.height = `calc(0.664 * ${cover_width}px)`;
    }, [demensions]);

    // Set Video src
    React.useEffect(() => {
        if (page === "main_page"){
            setVideo_path("https://www.youtube.com/embed/Or0uSGol0GI?si=RsjygcZHr-bxsPTz?autoplay=1&mute=1");
        } else {
            setVideo_path(hotel.youtube_video);
        }
    }, []);

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

    // Default background images
    let img_default = (require('./images/3-hotel.jpg')).default;


    return (
        <div className="video-container">
            <div className="video-cover" onClick={startVideo} style={{ backgroundImage: (hotel != null) ? `url(${hotel.picture_url})`: `url(${img_default})` }}>
                <i className="fa-regular fa-circle-play" id="start-icon"></i>
                <i className="fa-solid fa-spinner fa-spin" id="loading-icon"></i>
            </div>
            <div className="blue-background"></div>
            {showVideo && 
                <div className="video-player">
                    <div className="video-wrapper">
                        <iframe width="100%" src={video_path} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <i className="fa-solid fa-rectangle-xmark close-video" onClick={closeVideo}></i>
                    </div>
                </div>
            }
        </div>
    ); 
}