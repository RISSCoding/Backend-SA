import faceapi from 'face-api.js';
import canvas from 'canvas';
import path from 'path';
import { Canvas, Image, ImageData } from 'canvas';

// Inisialisasi environment canvas untuk face-api.js
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

export const detectFace = async (imagePath) => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, '/models'));
  await faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, '/models'));
  await faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, '/models'));

  const image = await canvas.loadImage(imagePath);
  const detections = await faceapi.detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceDescriptors();

  if (detections.length > 0) {
    return detections[0];
  }

  return null;
};

export const compareFaces = (storedDescriptor, currentDescriptor) => {
  const distance = faceapi.euclideanDistance(storedDescriptor, currentDescriptor);
  return distance < 0.6; // Nilai threshold untuk matching
};
