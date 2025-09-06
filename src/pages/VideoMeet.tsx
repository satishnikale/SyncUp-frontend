import { io, Socket } from "socket.io-client";
import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import {
    Video,
    VideoOff,
    Mic,
    MicOff,
    PhoneOff,
    MonitorUp,
    MessageCircle,
    ScreenShare,
} from "lucide-react";

declare global {
    interface Window {
        localStream: MediaStream;
    }
}

const serverUrl = "http://localhost:3000";
const connections: { [key: string]: RTCPeerConnection } = {};

const peerConfigConnections: RTCConfiguration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

type RemoteVideo = {
    socketId: string;
    stream: MediaStream | null;
    autoPlay: boolean;
    playsInline: boolean;
};

export const VideoMeet: React.FC = () => {
    const socketRef = useRef<Socket | null>(null);
    const socketIdRef = useRef<string | null>(null);

    const localVideoRef = useRef<HTMLVideoElement | null>(null);

    const [videoAvailable, setVideoAvailable] = useState(true);
    const [audioAvailable, setAudioAvailable] = useState(true);

    const [video, setVideo] = useState<boolean>(true);
    const [audio, setAudio] = useState<boolean>(false);

    const [videos, setVideos] = useState<RemoteVideo[]>([]);

    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState("");

    const [askForUsername, setAskForUsername] = useState(true);
    const [username, setUsername] = useState("");

    const [screen, setScreen] = useState<boolean>(false);
    const [showModal, setModal] = useState<boolean>(false);
    // const [screenAvailable, setScreenAvailable] = useState<boolean>(false);
    const [newMessages, setNewMessages] = useState<number>(0);

    // local video draggable state
    const [isLocalPinned, setIsLocalPinned] = useState(true); // togglable: pinned/movable
    const [localPos, setLocalPos] = useState({ top: 16, left: 16 }); // px
    const dragState = useRef({
        dragging: false,
        startX: 0,
        startY: 0,
        origLeft: 16,
        origTop: 16,
    });

    // 🔹 Permissions
    useEffect(() => {
        getPermissions();
    }, []);

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            setVideoAvailable(!!videoPermission);

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioAvailable(!!audioPermission);

            if (videoPermission || audioPermission) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({
                    video: videoPermission ? true : false,
                    audio: audioPermission ? true : false,
                });
                window.localStream = userMediaStream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = userMediaStream;
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 Toggle Video/Audio
    useEffect(() => {
        // whenever video/audio toggles, request new tracks or stop them
        getUserMedia();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video, audio]);

    const getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    };

    const getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices
                .getUserMedia({ video, audio })
                .then(getUserMediaSuccess)
                .catch((e) => console.error(e));
        } else {
            try {
                const stream = localVideoRef.current?.srcObject as MediaStream | null;
                stream?.getTracks().forEach((track) => track.stop());
                if (localVideoRef.current) localVideoRef.current.srcObject = null;
            } catch (e) {
                console.error(e);
            }
        }
    };

    const getUserMediaSuccess = (stream: MediaStream) => {
        try {
            window.localStream?.getTracks()?.forEach((track) => track.stop());
        } catch {
            /* empty */
        }

        window.localStream = stream;
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }

        // attach tracks to existing peer connections
        for (let id in connections) {
            if (id === socketIdRef.current) continue;

            stream.getTracks().forEach((track) => connections[id].addTrack(track, stream));

            connections[id]
                .createOffer()
                .then((description) => connections[id].setLocalDescription(description))
                .then(() => {
                    if (connections[id].localDescription) {
                        socketRef.current?.emit("signal", id, JSON.stringify({ sdp: connections[id].localDescription }));
                    }
                })
                .catch((e) => console.error(e));
        }
    };

    // 🔹 Screen share
    useEffect(() => {
        if (screen) {
            getDislayMedia();
        } else {
            // when stopping screen we will re-get camera
            getUserMedia();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screen]);

    const getDislayMedia = () => {
        if (navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices
                .getDisplayMedia({ video: true, audio: true })
                .then(getDislayMediaSuccess)
                .catch((e) => console.error(e));
        }
    };

    const getDislayMediaSuccess = (stream: MediaStream) => {
        try {
            window.localStream?.getTracks()?.forEach((track) => track.stop());
        } catch { }

        window.localStream = stream;
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }

        for (let id in connections) {
            if (id === socketIdRef.current) continue;

            stream.getTracks().forEach((track) => connections[id].addTrack(track, stream));

            connections[id]
                .createOffer()
                .then((description) => connections[id].setLocalDescription(description))
                .then(() => {
                    if (connections[id].localDescription) {
                        socketRef.current?.emit("signal", id, JSON.stringify({ sdp: connections[id].localDescription }));
                    }
                })
                .catch((e) => console.error(e));
        }

        stream.getTracks().forEach((track) => {
            track.onended = () => {
                setScreen(false);
                getUserMedia();
            };
        });
    };

    // 🔹 Handle signals
    const gotMessageFromServer = (fromId: string, message: string) => {
        const signal = JSON.parse(message);

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId]
                    .setRemoteDescription(new RTCSessionDescription(signal.sdp))
                    .then(() => {
                        if (signal.sdp.type === "offer") {
                            connections[fromId]
                                .createAnswer()
                                .then((description) => connections[fromId].setLocalDescription(description))
                                .then(() => {
                                    if (connections[fromId].localDescription) {
                                        socketRef.current?.emit("signal", fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
                                    }
                                })
                                .catch((e) => console.error(e));
                        }
                    })
                    .catch((e) => console.error(e));
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch((e) => console.error(e));
            }
        }
    };

    // 🔹 Socket connection
    const connectToSocketServer = () => {
        socketRef.current = io(serverUrl, { secure: false });

        socketRef.current.on("signal", gotMessageFromServer);

        socketRef.current.on("connect", () => {
            socketRef.current?.emit("join-call", window.location.href);
            socketIdRef.current = socketRef.current?.id ?? null;

            socketRef.current?.on("chat-message", addMessage);

            socketRef.current?.on("user-left", (id: string) => {
                setVideos((prev) => prev.filter((v) => v.socketId !== id));
            });

            socketRef.current?.on("user-joined", (id: string, clients: string[]) => {
                clients.forEach((socketListId) => {
                    const pc = new RTCPeerConnection(peerConfigConnections);
                    connections[socketListId] = pc;

                    pc.onicecandidate = (event) => {
                        if (event.candidate) {
                            socketRef.current?.emit("signal", socketListId, JSON.stringify({ ice: event.candidate }));
                        }
                    };

                    pc.ontrack = (event) => {
                        const [remoteStream] = event.streams;
                        if (!remoteStream) return;

                        setVideos((prev) => {
                            const exists = prev.find((v) => v.socketId === socketListId);
                            if (exists) {
                                return prev.map((v) =>
                                    v.socketId === socketListId ? { ...v, stream: remoteStream } : v
                                );
                            }
                            return [
                                ...prev,
                                {
                                    socketId: socketListId,
                                    stream: remoteStream,
                                    autoPlay: true,
                                    playsInline: true,
                                },
                            ];
                        });
                    };

                    if (window.localStream) {
                        window.localStream.getTracks().forEach((t) => pc.addTrack(t, window.localStream));
                    }
                });
            });
        });

        socketRef.current.on("connect_error", (err) => {
            console.error("Socket connect error:", err);
        });
    };

    // 🔹 Chat
    const addMessage = (data: string, sender: string, socketIdSender: string) => {
        setMessages((prev) => [...prev, { sender, data }]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prev) => prev + 1);
        }
    };

    const sendMessage = () => {
        if (!message.trim()) return;
        socketRef.current?.emit("chat-message", message, username);
        setMessage("");
    };

    // 🔹 Helpers
    const silence = () => {
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const dst = oscillator.connect(ctx.createMediaStreamDestination());
        oscillator.start();
        ctx.resume();
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
    };

    const black = ({ width = 640, height = 480 } = {}) => {
        const canvas = Object.assign(document.createElement("canvas"), { width, height });
        const ctx = canvas.getContext("2d");
        ctx?.fillRect(0, 0, width, height);
        const stream = canvas.captureStream();
        return Object.assign(stream.getVideoTracks()[0], { enabled: false });
    };

    // 🔹 Connect after username entered
    const connect = () => {
        setAskForUsername(false);
        getMedia();
    };

    function handleVideo(): void {
        setVideo(!video);
    }

    function handleEndCall(): void {
        try {
            const stream = localVideoRef.current?.srcObject as MediaStream | null;

            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
            }
        } catch (e) {
            console.error("Error stopping stream:", e);
        }

        window.location.href = "/home";
    }

    function handleAudio(): void {
        setAudio(!audio);
    }

    function handleScreen(): void {
        setScreen(!screen);
    }

    // --------- Local video drag handlers ----------
    const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isLocalPinned) return; // only draggable when pinned (toggle behavior)
        const point = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
        dragState.current.dragging = true;
        dragState.current.startX = point.clientX;
        dragState.current.startY = point.clientY;
        dragState.current.origLeft = localPos.left;
        dragState.current.origTop = localPos.top;
        // prevent default to avoid selection/scroll
        e.preventDefault();
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
        if (!dragState.current.dragging) return;
        const point = "touches" in e ? (e as TouchEvent).touches[0] : (e as MouseEvent);
        const dx = point.clientX - dragState.current.startX;
        const dy = point.clientY - dragState.current.startY;
        setLocalPos({
            left: Math.max(8, dragState.current.origLeft + dx),
            top: Math.max(8, dragState.current.origTop + dy),
        });
    };

    const endDrag = () => {
        dragState.current.dragging = false;
    };

    useEffect(() => {
        window.addEventListener("mousemove", onMove);
        window.addEventListener("touchmove", onMove);
        window.addEventListener("mouseup", endDrag);
        window.addEventListener("touchend", endDrag);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("touchmove", onMove);
            window.removeEventListener("mouseup", endDrag);
            window.removeEventListener("touchend", endDrag);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // utility to detect whether a stream currently has an enabled video track
    const streamHasVideo = (s: MediaStream | null | undefined) => {
        if (!s) return false;
        const vt = s.getVideoTracks();
        if (!vt || vt.length === 0) return false;
        return vt.some((t) => t && t.enabled);
    };

    // -----------------------------------------------------------------------------
    // UI
    // -----------------------------------------------------------------------------
    return (
        <div className="w-full min-h-screen bg-black text-white flex flex-col">
            {askForUsername ? (
                <div className="w-full max-w-7xl mx-auto my-16 lg:my-28 px-4 md:px-8 font-inter flex flex-col lg:flex-row justify-between items-center gap-12">

                    {/* Left Section (Text + Input) */}
                    <div className="flex-1 space-y-6 text-center md:text-left max-w-xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                            Enter into the Lobby
                        </h2>
                        <p className="text-darkGray text-sm sm:text-base md:text-lg leading-relaxed">
                            Join the call instantly with your username.
                            Experience seamless video communication with <span className="text-blue-600 font-medium">SyncUp</span>.
                        </p>

                        {/* Username Input */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <input
                                className="appearance-none border rounded-lg px-4 py-3 w-full sm:w-64 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button
                                onClick={connect}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                            >
                                Connect
                            </button>
                        </div>
                    </div>

                    {/* Right Section (Video Preview) */}
                    <div className="flex-1 flex justify-center items-center">
                        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border rounded-2xl overflow-hidden bg-black">
                            {/* Show black when camera is off */}
                            <video
                                ref={localVideoRef}
                                autoPlay
                                muted
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

            ) : (
                // main call UI
                <div className="relative w-full min-h-screen flex-1">
                    {/* full-screen remote videos grid on black background */}
                    <div
                        className="w-full h-full grid gap-3 p-3"
                        style={{
                            gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
                        }}
                    >
                        {videos.length > 0 ? (
                            videos.map((v) => {
                                const hasVideo = streamHasVideo(v.stream);
                                return (
                                    <div key={v.socketId} className="relative bg-black rounded-lg overflow-hidden shadow">
                                        {hasVideo ? (
                                            <video
                                                className="w-8/12 h-96 md:h-80 object-cover bg-black mx-auto rounded-md"
                                                data-socket={v.socketId}
                                                ref={(ref) => {
                                                    if (ref) {
                                                        if (v.stream) {
                                                            ref.srcObject = v.stream;
                                                        } else {
                                                            ref.srcObject = null;
                                                        }
                                                    }
                                                }}
                                                autoPlay
                                                playsInline
                                            />
                                        ) : (
                                            // black placeholder when remote stops sharing video
                                            <div className="w-full h-64 md:h-80 flex items-center justify-center bg-black">
                                                <div className="text-sm text-gray-400">Video disabled</div>
                                            </div>
                                        )}

                                        <div className="absolute bottom-2 left-2 text-xs text-gray-300 bg-black bg-opacity-30 px-2 py-1 rounded">
                                            {v.socketId}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full flex items-center justify-center text-gray-400">
                                No participants yet
                            </div>
                        )}
                    </div>

                    {/* local video - movable and toggleable */}
                    <div
                        className="absolute z-30 rounded-lg overflow-hidden border-2 border-white/20 bg-black"
                        style={{
                            width: 180,
                            height: 120,
                            top: localPos.top,
                            left: localPos.left,
                            touchAction: "none",
                        }}
                        onMouseDown={(e) => startDrag(e)}
                        onTouchStart={(e) => startDrag(e)}
                        role="button"
                        aria-label="draggable local preview"
                    >
                        <div className="w-full h-full relative">
                            {streamHasVideo(window.localStream) ? (
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover bg-black"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-black">
                                    <div className="text-xs text-gray-400">Camera off</div>
                                </div>
                            )}

                            {/* small top-right controls for toggling pin/movable */}
                            <button
                                onClick={() => setIsLocalPinned((p) => !p)}
                                className="absolute top-1 right-1 bg-white/10 hover:bg-white/20 rounded px-1 py-0.5 text-xs"
                                title={isLocalPinned ? "Drag enabled (tap to disable)" : "Drag disabled (tap to enable)"}
                            >
                                {isLocalPinned ? "Drag" : "Pin"}
                            </button>
                        </div>
                    </div>

                    {/* bottom control bar (responsive) */}
                    <div className="fixed left-0 right-0 bottom-4 z-40 flex items-center justify-center">
                        <div className="w-full max-w-3xl mx-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-3 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleVideo}
                                    className="p-2 rounded-full bg-white/6 hover:bg-white/10"
                                    aria-label="toggle video"
                                >
                                    {video ? <Video size={18} /> : <VideoOff size={18} />}
                                </button>

                                <button
                                    onClick={handleAudio}
                                    className="p-2 rounded-full bg-white/6 hover:bg-white/10"
                                    aria-label="toggle audio"
                                >
                                    {audio ? <Mic size={18} /> : <MicOff size={18} />}
                                </button>

                                <button
                                    onClick={handleScreen}
                                    className="p-2 rounded-full bg-white/6 hover:bg-white/10"
                                    aria-label="toggle screenshare"
                                >
                                    {screen ? <MonitorUp size={18} /> : <ScreenShare size={18} />}
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleEndCall}
                                    className="px-4 py-2 bg-red-600 rounded-full text-white font-medium hover:bg-red-700"
                                >
                                    <PhoneOff size={16} />
                                </button>

                                <button
                                    onClick={() => setModal((s) => !s)}
                                    className="relative p-2 rounded-full bg-white/6 hover:bg-white/10"
                                >
                                    <MessageCircle size={18} />
                                    {newMessages > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-orange-500 text-xs text-white rounded-full px-2 py-0.5">
                                            {newMessages}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Chat modal */}
                    {showModal && (
                        <div className="fixed right-4 top-4 w-80 lg:w-96 max-w-full bg-gray-900 text-white border rounded-lg shadow-lg p-4 flex flex-col h-[70vh] z-50 font-inter">
                            {/* Header */}
                            <h1 className="text-lg font-semibold mb-2">Chat</h1>

                            {/* Messages area */}
                            <div className="flex-1 overflow-y-auto rounded-md p-2 mb-2 [scrollbar-width:thin]">
                                {messages.length !== 0 ? (
                                    messages.map((item, index) => (
                                        <div key={index} className="mb-3">
                                            <p className="font-bold">{item.sender}</p>
                                            <p>{item.data}</p>
                                            <div className="w-full h-[1px] bg-gray-800 mt-2"></div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No Messages Yet</p>
                                )}
                            </div>

                            {/* Input bar */}
                            <div className="flex flex-col md:flex-row gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your chat"
                                    className="flex-1 p-2 rounded-md border border-gray-300 text-black"
                                />
                                <button
                                    onClick={sendMessage}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                                >
                                    Send
                                </button>
                            </div>
                        </div>

                    )}
                </div>
            )}
        </div>
    );
};

export default VideoMeet;
