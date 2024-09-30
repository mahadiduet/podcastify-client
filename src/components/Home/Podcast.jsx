import { useEffect, useState } from "react";
import { useRef } from "react";
import { FaShareSquare, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoPlaySkipBackSharp, IoPlaySkipForward } from "react-icons/io5";
import { MdForward10, MdReplay10 } from "react-icons/md";
import { Link } from "react-router-dom";

const Podcast = ({ podcast, isPlay, onPlay, onPlayNext, onPlayPrevious }) => {
    const { _id, title, releaseDate, coverImageUrl, audioFileUrl } = podcast;
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [totalDuration, setTotalDuration] = useState('0:00');
    const [isMuted, setIsMuted] = useState(false);

    const dateObj = new Date(releaseDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = dateObj.toLocaleDateString('en-US', options);

    // Play/Pause handler
    useEffect(() => {
        if (isPlay) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlay]);

    // Toggle Mute/Unmute
    const toggleMute = () => {
        audioRef.current.muted = !audioRef.current.muted;  // Toggle the muted property of the audio element
        setIsMuted(!isMuted);
    };

    // Skip 10 seconds forward
    const skipForward = () => {
        audioRef.current.currentTime += 10;
    };

    // Skip 10 seconds backward
    const skipBackward = () => {
        audioRef.current.currentTime -= 10;
    };

    // Format time in "minutes:seconds"
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // Update current time and total duration
    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(formatTime(audioRef.current.currentTime));
            setTotalDuration(formatTime(audioRef.current.duration || 0));
        };
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateTime);

        const handleEnded = () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            if (isPlay) {
                onPlay();
            }
        };
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateTime);
        };
    }, [onPlayNext]);
    return (
        <div className="bg-black p-6 rounded-lg shadow-lg w-full">
            <div className="flex justify-end items-center text-red-800 gap-4 mr-2">
                <button className="text-2xl">
                    <FaShareSquare />
                </button>
                <button className="text-2xl">
                    <FiDownload />
                </button>
                <button className="text-sm border border-red-800 p-1">1px</button>
            </div>
            <div className="relative  py-4 md:px-2 px-2">
                <img
                    src={`http://localhost:5000${coverImageUrl}`}
                    alt="Episode 47"
                    className="w-full h-56 object-cover rounded"
                />
            </div>

            <div className="mt-4">
                <div className="md:flex-row flex-col items-center text-lg mb-2">
                    <span className="mr-2">📚 47</span>
                    <span className="mr-2">📅 {date}</span>
                    <span>⏱️{totalDuration}</span>
                </div>
                <h3 className="text-2xl font-bold">
                    <Link to={`/podcast/${_id}`}>{title}</Link>
                </h3>
            </div>
            <div className="mt-6 flex items-center lg:gap-6 gap-4 text-red-800">
                <audio ref={audioRef} src={`http://localhost:5000${audioFileUrl}`} />

                <div className="audio-timing lg:text-lg text-xs">
                    <span id="current-time">{currentTime}</span> /
                    <span id="total-duration"> {totalDuration}</span>
                </div>

                {/* Audio Controls */}
                <div className="flex lg:gap-2 gap-1">
                    <button onClick={onPlayPrevious} className="lg:text-2xl text-xl">
                        <IoPlaySkipBackSharp />
                    </button>

                    <button onClick={skipBackward} className="lg:text-2xl text-xl">
                        <MdReplay10 />
                    </button>

                    <button onClick={onPlay} className="lg:text-3xl text-2xl">
                        {isPlay ? <FaCirclePause /> : <FaCirclePlay />}
                    </button>

                    <button onClick={skipForward} className="lg:text-2xl text-xl">
                        <MdForward10 />
                    </button>

                    <button onClick={onPlayNext} className="lg:text-2xl text-xl">
                        <IoPlaySkipForward />
                    </button>
                </div>

                <button onClick={toggleMute} className="lg:text-2xl text-xl">
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
            </div>

        </div>
    );
};

export default Podcast;