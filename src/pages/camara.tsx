import { useEffect, useState, useRef } from "react"
import { useParams } from 'react-router-dom'



function QuestionRecording() {
    const [isRecording, setIsRecording] = useState(false);


    const videoRef = useRef<null | HTMLVideoElement>(null);
    const streamRef = useRef<null | MediaStream>(null);
    const [DownloadLInk, setDownloadLInk] = useState("");
    const streamRecoderRef = useRef<null | MediaRecorder>(null);
    const [audioSource] = useState<string>('');
    const [videoSource] = useState<string>('');
    const [audioSourceOptions, setAudioSourceOptions] = useState<Record<string, string>[]>([]);
    const [videoSourceOptions, setVideoSourceOptions] = useState<Record<string, string>[]>([]);
    const [error, setError] = useState<null | Error>(null);
    const chunks = useRef<any[]>([]);

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
        }
        setIsRecording(true);
    }

    useEffect(function () {
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

    }, [isRecording])


    function stopRecording() {
        if (!streamRecoderRef.current) {
            return;
        }
        streamRecoderRef.current.stop();
        setIsRecording(false);
    }
    useEffect(function () {
        async function prepareStream() {
            function gotStream(stream: MediaStream) {
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }
            async function getStream() {
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => {
                        track.stop();
                    });
                }
                const contraints = {
                    audio: { deviceId: audioSource !== '' ? { exact: audioSource } : undefined },
                    video: { deviceId: videoSource !== '' ? { exact: videoSource } : undefined }
                };
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(contraints);
                    gotStream(stream);
                } catch (error) {
                    setError(error);
                    console.log("🚀 ~ file: Webcam.tsx ~ line 24 ~ getStream ~ error", error)

                }
            }
            function getDevices() {
                return navigator.mediaDevices.enumerateDevices();
            }

            function gotDevices(devicesInfos: MediaDeviceInfo[]) {
                const audioSourceOptions = [];
                const videoSourceOptions = [];

                for (const deviceInfo of devicesInfos) {
                    if (deviceInfo.kind === 'audioinput') {
                        audioSourceOptions.push({
                            value: deviceInfo.deviceId,
                            label: deviceInfo.label || `Microphone ${deviceInfo}`
                        });
                    } else if (deviceInfo.kind === 'videoinput') {
                        videoSourceOptions.push({
                            value: deviceInfo.deviceId,
                            label: deviceInfo.label || `Camera ${deviceInfo.deviceId}`
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

    const { id } = useParams()
    return (
        <div>
            <h1>{id}</h1>
            <a href="/questions">Volver</a>
            <br></br>
            <div>
                
                <select id="videoSource" name="videoSource" value={videoSource}>
                    {videoSourceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <select id="audioSource" name="audioSource" value={audioSource}>
                    {audioSourceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={startRecording} disabled={isRecording}>Grabar</button>
                <button onClick={stopRecording} disabled={!isRecording}>Stop</button>
            </div>


            <div>
                <video ref={videoRef} autoPlay muted playsInline></video>
                {error && <p>{error.message}</p>}

            </div>
            <div>
                {DownloadLInk && <video src={DownloadLInk} controls></video>}
                {DownloadLInk && (
                    <a href={DownloadLInk} download="file.mp4">descargar</a>
                )}
            </div>
            <div>
                <button >Atras</button>
                <button >Siguiente</button>
            </div>
        </div >
    );
}
export default QuestionRecording;