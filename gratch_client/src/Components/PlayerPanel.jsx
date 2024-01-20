import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useState, useRef } from "react";

const PlayerPanel = ({ io, roomId }) => {
  const [src, setSrc] = useState();
  const [videoState, setVideoState] = useState({
    playing: true,
    played: 0,
  });
  const [seekSafe, setSeekSafe] = useState(true);

  const { playing } = videoState;
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    io.on("playPauseResponse", (data) => {
      setVideoState({ ...videoState, playing: data.play });
    });

    io.on("seekResponse", (data) => {
      setSeekSafe(true);

      videoPlayerRef.current.seekTo(data.secs, "seconds", true);
    });
  }, []);

  const handleSeek = (e) => {
    if (!seekSafe) {
      io.emit("seek", { roomId: roomId, secs: e });
      setSeekSafe(true);
    }
  };

  const handlePlayPause = () => {
    io.emit("playPause", {
      roomId: roomId,
      play: videoPlayerRef.current.player.isPlaying,
    });
  };

  const handleChange = (event) => {
    try {
      // Get the uploaded file
      const file = event.target.files[0];

      // Transform file into blob URL
      setSrc(URL.createObjectURL(file));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full   h-svh bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
      <div className=" m-2 mb-0">
        <input
          onChange={handleChange}
          type="file"
          className="text-sm text-stone-500 
   file:mr-5 file:py-1 file:px-3 file:border-[1px]
    file:font-medium
   file:bg-slate-500 file:text-white
   hover:file:cursor-pointer hover:file:bg-slate-600
    file:w-max file:text-lg"
        />
        <span className="font-bold text-white m-5">Room: {roomId}</span>
      </div>

      <div className="p-10 pb-5">
        <div className=" shadow-2xl border-4 border-black ">
          <ReactPlayer
            playing={playing}
            url={src}
            controls={true}
            width="100%"
            height="100%"
            ref={videoPlayerRef}
            onPlay={handlePlayPause}
            onPause={handlePlayPause}
            onSeek={handleSeek}
          />
        </div>
      </div>
      <div className=" w-max h-max  ml-10">
        <p className=" text-white font-extrabold m-1">Seek safe</p>
        <button
          className={
            "w-14 h-10 " +
            (seekSafe ? "bg-green-500" : "bg-red-500") +
            " text-white font-bold  rounded-xl  shadow-xl"
          }
          onClick={() => setSeekSafe(!seekSafe)}
        >
          {seekSafe ? "ON" : "OFF"}
        </button>
      </div>
      <div
        className=" w-52 h-max transition duration-1000 ease-out
       bg-perpeel ml-10 m-2 flex flex-col p-2 text-white rounded-xl border-2 overflow-hidden"
      >
        <span className=" ml-auto mr-auto underline font-extrabold">
          Notice
        </span>
        <p className=" text-wrap text-justify font-semibold">
          Before skipping to a particular moment make sure the Seek Safe is off
          to sync the changes to other users
        </p>
      </div>
    </div>
  );
};

export default PlayerPanel;
