import React, { useEffect, useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';

export default function QrDashboard() {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading,setIsLoading]=useState(false);

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
        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            
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
        finally
        {
            setIsLoading(false);
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
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        onClick={handleFileUpload}
                        >
                        {isLoading ? (
                            <div role="status" className="flex justify-center">
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6 text-white animate-spin fill-white"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                                />
                                <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                                />
                            </svg>
                            </div>
                        ) : (
                            <span className="flex items-center">
                            Upload File
                            </span>
                        )}
                    </button>
                </div>
                <div className="flex flex-col items-start justify-center">
                    {image ? (
                        <>
                            <img src={image} alt="QR Code" className="my-4 mx-auto md:ml-8 md:mt-9 md:my-0 w-full md:w-auto" />
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
