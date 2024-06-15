import React, { useEffect, useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';

export default function QrDashboard() {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();

        if (!file) {
            toast.error("No file selected",{
                position: "top-right"
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        toast.info("Uploading file...",{
            position: "top-right"
        });

        try {
            console.log(formData)
            console.log(token);
            const response=await fetch('http://localhost:8080/api/qr/upload',{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: formData
            })

            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setImage(imageUrl);
                toast.success("File uploaded successfully!",{
                    position: "top-right"
                });
            }
            else if(response.status==401)
            {
                toast.error("Session Expired!", {
                position: "top-right"
                });
        
                setTimeout(() => {
                navigate('/');
                }, 5000);
            }
            else {
                toast.error("Invalid response from server",{
                    position: "top-right"
                });
            }
        } catch (err) {
            console.log(err);
            toast.error("Error uploading file",{
                position: "top-right"
            });
        }
    };

    const handleDownload = async() => {
        if (!image) {
            toast.error("Error downloading QR", {
                position: "top-right"
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/qr/downloadQR', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
            });

            if (response.ok) {
                const clonedResponse = response.clone();
                const blob = await clonedResponse.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'QRCode.png';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                toast.success("QR downloaded successfully!", {
                    position: "top-right"
                });
            }
            else if(response.status==401)
            {
                toast.error("Session Expired!", {
                position: "top-right"
                });
        
                setTimeout(() => {
                navigate('/');
                }, 5000);
            }
            else 
            {
                toast.error("Error downloading QR!", {
                    position: "top-right"
                });
            }
        } catch (err) {
            console.log(err)
            toast.error("Error downloading QR", {
                position: "top-right"
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-96 bg-white mt-24 mr-16 ml-16">
            <ToastContainer />
            <div className="mt-8 grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-2">
                <div className="flex flex-col items-start">
                    <h2 className="text-lg font-semibold text-black mb-5">Welcome to QR Dashboard</h2>
                    <input type="file" onChange={handleFileChange} />
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleFileUpload}
                    >
                        Upload File
                    </button>
                </div>
                <div className="flex flex-col items-start">
                    {image ? (
                        <>
                            <img src={image} alt="QR Code" className="mb-4" />
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                onClick={handleDownload}
                            >
                                Download QR Code
                            </button>
                        </>
                    ) : (
                        <p className="text-black">No image uploaded yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}
