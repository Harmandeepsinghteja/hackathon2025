"use client";
import Header from "../../components/Header";
import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";

export default function Memories() {
    const [images, setImages] = useState([]);
    const [user, setUser] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchImages(user.uid);
            } else {
                setUser(null);
                setImages([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchImages = (uid) => {
        console.log('fetching images');
        const storage = getStorage();
        const storageRef = ref(storage, `images/${uid}`);
        listAll(storageRef).then((res) => {
            const promises = res.items.map((itemRef) => getDownloadURL(itemRef));
            Promise.all(promises).then((urls) => {
                setImages(urls);
                console.log('images fetched');
                console.log(urls);
            });
        });
    };

    const handleAddImage = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        const storage = getStorage();
        const uploadPromises = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
            const uploadTask = uploadBytes(storageRef, file).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            });
            uploadPromises.push(uploadTask);
        }

        Promise.all(uploadPromises).then((urls) => {
            setImages((prevImages) => [...prevImages, ...urls]);
            console.log('Uploaded files:', urls);
        }).catch((error) => {
            console.error('Error uploading files:', error);
        });
    };

    return (
        <>
            <Header />
            <h1 className="text-2xl font-semibold text-gray-800 my-4 text-center">Memories</h1>
            {images.length === 0 ? 
                <p className="text-center">No images</p> :
                <div className="grid-container">
                {images.map((src, index) => (
                    <img key={index} src={src} alt={`Memory ${index + 1}`} className="grid-item" />
                ))}
            </div>
            }

            {/* Add image button */}
            <button className="floating-button" onClick={handleAddImage}>+</button>

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                multiple
                accept="image/*"
            />
            
            <style jsx>{`
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 16px;
                    padding: 16px;
                }
                .grid-item {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                }
                .floating-button {
                    position: fixed;
                    bottom: 16px;
                    right: 16px;
                    width: 56px;
                    height: 56px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                }
                .floating-button:hover {
                    background-color: #0056b3;
                }
            `}</style>
        </>
    )
}