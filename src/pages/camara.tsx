import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import "../styles/questionRecording.css";

function QuestionRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const streamRef = useRef<null | MediaStream>(null);
  const [DownloadLInk, setDownloadLInk] = useState("");
  const streamRecoderRef = useRef<null | MediaRecorder>(null);
  const [audioSource] = useState<string>("");
  const [videoSource] = useState<string>("");
  const [audioSourceOptions, setAudioSourceOptions] = useState<
    Record<string, string>[]
  >([]);
  const [videoSourceOptions, setVideoSourceOptions] = useState<
    Record<string, string>[]
  >([]);
  const [error, setError] = useState<null | Error>(null);
  const chunks = useRef<any[]>([]);

  useEffect(() => {
    if (isRecording && !isTimerFinished) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRecording, isTimerFinished]);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
      setTimer(0);
      setIsTimerFinished(false);
    }
    setIsRecording(!isRecording);
  };

  function startRecording() {
    if (isRecording) {
      return;
    }
    if (!streamRef.current) {
      return;
    }
    streamRecoderRef.current = new MediaRecorder(streamRef.current);
    streamRecoderRef.current.start();
    streamRecoderRef.current.ondataavailable = function (event: BlobEvent) {
      if (chunks.current) {
        chunks.current.push(event.data);
      }
    };
    setIsRecording(true);
  }

  useEffect(() => {
    if (isRecording) {
      return;
    }
    if (chunks.current.length === 0) {
      return;
    }
    const blob = new Blob(chunks.current, {
      type: "video/x-matroska;codecs=avc1,opus",
    });
    setDownloadLInk(URL.createObjectURL(blob));
    chunks.current = [];
  }, [isRecording]);

  function stopRecording() {
    if (!streamRecoderRef.current) {
      return;
    }
    streamRecoderRef.current.stop();
    setIsRecording(false);
    setIsTimerFinished(true);
  }

  useEffect(() => {
    async function prepareStream() {
      function gotStream(stream: MediaStream) {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
      async function getStream() {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
          });
        }
        const constraints = {
          audio: {
            deviceId: audioSource !== "" ? { exact: audioSource } : undefined,
          },
          video: {
            deviceId: videoSource !== "" ? { exact: videoSource } : undefined,
          },
        };
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          gotStream(stream);
        } catch (error) {
          setError(error);
          console.log(
            "🚀 ~ file: Webcam.tsx ~ line 24 ~ getStream ~ error",
            error
          );
        }
      }
      function getDevices() {
        return navigator.mediaDevices.enumerateDevices();
      }

      function gotDevices(devicesInfos: MediaDeviceInfo[]) {
        const audioSourceOptions: Record<string, string>[] = [];
        const videoSourceOptions: Record<string, string>[] = [];

        for (const deviceInfo of devicesInfos) {
          if (deviceInfo.kind === "audioinput") {
            audioSourceOptions.push({
              value: deviceInfo.deviceId,
              label: deviceInfo.label || `Microphone ${deviceInfo}`,
            });
          } else if (deviceInfo.kind === "videoinput") {
            videoSourceOptions.push({
              value: deviceInfo.deviceId,
              label: deviceInfo.label || `Camera ${deviceInfo.deviceId}`,
            });
          }
        }

        setAudioSourceOptions(audioSourceOptions);
        setVideoSourceOptions(videoSourceOptions);
      }

      await getStream();
      const mediaDevices = await getDevices();
      gotDevices(mediaDevices);
    }
    prepareStream();
  }, []);

  const { id } = useParams();

  return (
    <div className="container">

      <h1>{id}</h1>
      <a href="/questions">Volver</a>
      <br />
      <div className="video-question-container">
        <div className="video-container">
          <video ref={videoRef} autoPlay muted playsInline></video>
          {isRecording && !isTimerFinished && (
            <div className="timer-overlay">{timer}s</div>
          )}
          <div className="circle-container">
            {!isRecording && (
              <div className="circle red" onClick={toggleRecording}></div>
            )}
            {isRecording && (
              <div className="square gray" onClick={toggleRecording}></div>
            )}
          </div>
        </div>

        <div className="question-container">
          <p className="question">{id}</p>
        </div>
      </div>
      <div className="download-container">
        {DownloadLInk && <video src={DownloadLInk} controls></video>}
        {DownloadLInk && (
          <a href={DownloadLInk} download="file.mp4">
            descargar
          </a>
        )}
      </div>
      <div className="navigation-container">{/* ... Navegación ... */}</div>
    </div>
  );
}

export default QuestionRecording;
