"use client";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthContext } from "@/context/AuthContext";
import Header from "../../components/Header";

export default function ImageUpload() {
  const { user, loading } = useAuthContext();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchExistingImage = async () => {
      if (user) {
        const q = query(
          collection(db, "userImages"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setImageUrl(userData.imageUrl || "");
        }
      }
    };
    fetchExistingImage();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-500">
          You must be logged in to upload images.
        </p>
      </div>
    );
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const userImageRef = doc(db, "userImages", user.uid);
      await setDoc(
        userImageRef,
        {
          userId: user.uid,
          imageUrl: downloadURL,
          timestamp: new Date(),
        },
        { merge: true }
      );

      setImageUrl(downloadURL);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("An error occurred. Please try again.");
    }
    setUploading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-200 p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-lg w-full text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Upload Your Image
          </h1>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full mb-4"
          />
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all ${
              (!file || uploading) && "opacity-50 cursor-not-allowed"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          {imageUrl && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                Your Uploaded Image:
              </h2>
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-full rounded-lg"
              />
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
