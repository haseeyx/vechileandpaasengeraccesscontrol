'use client';

import { useState, useEffect, useRef } from "react";
import * as faceapi from 'face-api.js';

export default function Imgy() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [faceData, setFaceData] = useState(null);
  const imageRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      console.log('Loading models...');
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      await faceapi.nets.ageGenderNet.loadFromUri('/models');
      console.log('All models loaded successfully.');
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFaceData(null);
      setIsLoading(true);
    }
  };

  const analyzeFace = async () => {
    if (
      !faceapi.nets.tinyFaceDetector.isLoaded ||
      !faceapi.nets.faceLandmark68Net.isLoaded ||
      !faceapi.nets.faceExpressionNet.isLoaded ||
      !faceapi.nets.ageGenderNet.isLoaded
    ) {
      console.warn('Models are not fully loaded yet.');
      return;
    }

    if (imageRef.current) {
      try {
        const detections = await faceapi
          .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender();

        setFaceData(detections);
        setIsLoading(false);
      } catch (error) {
        console.error('Error analyzing face:', error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (selectedImage) {
      const img = new Image();
      img.src = selectedImage;
      img.onload = analyzeFace;
    }
  }, [selectedImage]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-300 to-indigo-500">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-900 bg-clip-text text-transparent">
            Face Recognition
          </h1>
          <p className="text-gray-300 text-sm">
            Upload an image to analyze faces and detect age, gender, and expressions.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg p-4 mb-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50/50 hover:bg-indigo-50/80 transition-all">
              <div className="text-center">
                <svg className="w-10 h-10 text-indigo-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, or GIF (MAX. 10MB)</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {selectedImage && (
          <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg p-4 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Face Analysis</h2>
            <div className="relative flex justify-center">
              <img
                ref={imageRef}
                src={selectedImage}
                alt="Selected"
                className="max-w-xs rounded-lg"
                crossOrigin="anonymous"
              />
              <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
            </div>
          </div>
        )}

        {isLoading && (
          <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg p-6 text-center">
            <div className="animate-pulse">
              <div className="w-10 h-10 border-4 border-indigo-300 rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-gray-600">Analyzing face...</p>
            </div>
          </div>
        )}

        {faceData && faceData.length > 0 && (
          <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Detection Results</h2>
            <div className="grid grid-cols-1 gap-4">
              {faceData.map((face, index) => (
                <div key={index} className="bg-gray-50/80 rounded-lg p-4">
                  <DataField label="Age" value={`${Math.round(face.age)} years`} icon="👶" />
                  <DataField label="Gender" value={`${face.gender} (${Math.round(face.genderProbability * 100)}%)`} icon="👤" />
                  <DataField
                    label="Expressions"
                    value={Object.entries(face.expressions)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 2)
                      .map(([exp, prob]) => `${exp}: ${Math.round(prob * 100)}%`)
                      .join(', ')}
                    icon="😊"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const DataField = ({ label, value, icon }) => (
  <div className="flex items-center space-x-2 text-sm">
    <span>{icon}</span>
    <p className="text-indigo-600 font-medium">{label}:</p>
    <p className="text-gray-800 font-semibold">{value || 'Not found'}</p>
  </div>
);
