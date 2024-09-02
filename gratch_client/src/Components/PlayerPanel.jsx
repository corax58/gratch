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
    <div className="w-full   h-screen bg-slate-800">
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
      <div className="p-4   h-3/4">
        <div className=" shadow-2xl border-4 bg-black border-black w-full h-full ">
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
      </div>{" "}
      <div className=" ">
        <div className=" w-max h-max  ml-10">
          <div className="flex items-center">
            <p className=" text-white font-extrabold m-1">Seek safe </p>
            <div className="relative group z-0">
              <div className="p-px bg-primary size-4 text-slate-100 border-slate-100 border rounded-full flex items-center justify-center text-xs font-bold">
                i
              </div>
              <div
                className="absolute w-96 py-1 h-max flex scale-0 group-hover:scale-100 transition-all ease-in-out duration-300 origin-top-left
       bg-slate-900   flex-col p-2 text-white font-thin rounded-xl border-slate-600 border "
              >
                <span className=" ml-auto mr-auto underline font-semibold">
                  Notice
                </span>
                <p className=" text-wrap text-justify font-light">
                  Before skipping to a particular moment make sure the Seek Safe
                  is off to sync the changes to other users
                </p>
              </div>
            </div>
          </div>
          <button
            className={
              "w-14 h-10 " +
              (seekSafe
                ? "bg-slate-500 hover:bg-slate-600"
                : "bg-red-500 hover:bg-red-600") +
              " text-white font-bold  rounded  shadow-xl"
            }
            onClick={() => setSeekSafe(!seekSafe)}
          >
            {seekSafe ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
