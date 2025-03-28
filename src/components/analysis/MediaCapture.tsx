import React, { useRef, useState, useEffect } from 'react';
import { Camera, Video, Loader } from 'lucide-react';

interface MediaCaptureProps {
  onMediaCaptured: (mediaUrl: string, type: 'image' | 'video') => void;
  isLoading?: boolean;
}

export const MediaCapture: React.FC<MediaCaptureProps> = ({ 
  onMediaCaptured,
  isLoading = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [mediaMode, setMediaMode] = useState<'image' | 'video'>('image');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start camera stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: mediaMode === 'video'
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setStreamActive(true);
      setError(null);
    } catch (err) {
      setError('Camera access denied. Please allow camera access and try again.');
      console.error('Error accessing camera:', err);
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreamActive(false);
    }
  };

  // Handle component unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Switch between image and video modes
  useEffect(() => {
    if (streamActive) {
      stopCamera();
      setTimeout(() => {
        startCamera();
      }, 300);
    }
  }, [mediaMode]);

  // Take photo
  const captureImage = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      
      onMediaCaptured(dataUrl, 'image');
      stopCamera();
    }
  };

  // Start video recording
  const startRecording = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;
    
    recordedChunksRef.current = [];
    const stream = videoRef.current.srcObject as MediaStream;
    
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm'
    });
    
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };
    
    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, {
        type: 'video/webm'
      });
      const url = URL.createObjectURL(blob);
      onMediaCaptured(url, 'video');
      setIsRecording(false);
      stopCamera();
    };
    
    // Start recording and timer
    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    setRecordingTime(0);
    
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  // Stop video recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Format recording time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col">
      {error ? (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="font-figtree text-red-500 mb-4">{error}</div>
          <button
            onClick={startCamera}
            className="font-figtree px-4 py-2 bg-cherry-red text-white rounded-lg hover:bg-peach transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Video Preview */}
          {streamActive ? (
            <div className="relative flex-grow">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Recording Indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4 bg-cherry-red text-white px-3 py-1 rounded-full flex items-center font-figtree">
                  <div className="w-3 h-3 rounded-full bg-white mr-2 animate-pulse"></div>
                  {formatTime(recordingTime)}
                </div>
              )}
              
              {/* Capture Controls */}
              <div className="absolute bottom-4 left-0 right-0">
                <div className="flex flex-col items-center">
                  {/* Mode Toggle */}
                  <div className="mb-4 bg-black/30 rounded-full p-1">
                    <div className="flex">
                      <button
                        onClick={() => setMediaMode('image')}
                        className={`px-4 py-1 rounded-full ${
                          mediaMode === 'image' 
                            ? 'bg-cherry-red text-white' 
                            : 'text-white'
                        }`}
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setMediaMode('video')}
                        className={`px-4 py-1 rounded-full ${
                          mediaMode === 'video' 
                            ? 'bg-cherry-red text-white' 
                            : 'text-white'
                        }`}
                      >
                        <Video className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Capture Button */}
                  {mediaMode === 'image' ? (
                    <button
                      onClick={captureImage}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-cherry-red"
                    >
                      <div className="w-12 h-12 rounded-full bg-cherry-red"></div>
                    </button>
                  ) : (
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        isRecording 
                          ? 'bg-cherry-red border-4 border-white' 
                          : 'bg-white border-4 border-cherry-red'
                      }`}
                    >
                      {isRecording ? (
                        <div className="w-6 h-6 bg-white rounded"></div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-cherry-red"></div>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6">
              {isLoading ? (
                <div className="text-center">
                  <Loader className="w-10 h-10 text-cherry-red mx-auto mb-4 animate-spin" />
                  <p className="font-figtree text-gray-700">Processing...</p>
                </div>
              ) : (
                <button
                  onClick={startCamera}
                  className="font-figtree px-6 py-3 bg-cherry-red text-white rounded-lg hover:bg-peach transition-colors duration-300 flex items-center"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Take a Food Photo
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};