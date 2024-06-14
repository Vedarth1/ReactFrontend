import { useState } from 'react';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner'

function Home() {
  const navigate=useNavigate();
  const [isUploading,setIsUploading]=useState(false);

  const handleSubmit = async (e) => {
    setIsUploading(true);

    e.preventDefault();
    const fileInput = document.getElementById('file_input');
    const file = fileInput.files[0];
    if (!file) {
      toast.error("Please select a file!", {
        position: "top-right"
      });
      setIsUploading(false);
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (response.ok) {
          navigate('/chat');
      } else {
        toast.error("File upload failed!", {
          position: "top-right"
        });
      }
    } catch (error) {
      toast.error("An error occurred during the file upload!", {
        position: "top-right"
      });
    }
    finally{
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 md:p-8 rounded grow overflow-hidden">
        <div className="flex items-center justify-center w-full mt-3 mb-3">
          <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-w-7xl flex flex-col">
            <h1 className="text-3xl md:text-4xl mb-12 text-center border-spacing-10">
              🦙 Chat With Your Documents 🦙
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-start">
              <ul className="text-white text-left text-pretty flex-1 flex flex-col">
                <li className="text-l flex items-start">
                  <span>🏡</span>
                  <span className="ml-2">
                    Yes, it&apos;s another LLM-powered chat over documents implementation... but this one is entirely "local"!
                  </span>
                </li>
                <li className="text-l flex items-start">
                  <span>🌐</span>
                  <span className="ml-2">
                    The vector store (<a target="_blank" href="https://github.com/tantaraio/voy">Voy</a>) and embeddings (<a target="_blank" href="https://huggingface.co/docs/transformers.js/index">Transformers.js</a>) are served via Vercel Edge function and run fully in the browser with no setup required.
                  </span>
                </li>
                <li className="text-l flex items-start">
                  <span>⚙️</span>
                  <span className="ml-2">
                    The default LLM is Phi-3 run using <a href="https://webllm.mlc.ai/">WebLLM</a>.The first time you start a chat, the app will automatically download the weights and cache them in your browser.
                  </span>
                </li>
                <li className="text-l flex items-start">
                  <span>🗺️</span>
                  <span className="ml-2">
                    The default embeddings are &quot;Xenova/all-MiniLM-L6-v2&quot;.
                  </span>
                </li>
                <li className="text-l flex items-start">
                  <span>🦜</span>
                  <span className="ml-2">
                    <a target="_blank" href="https://js.langchain.com">LangChain.js</a> handles orchestration and ties everything together!
                  </span>
                </li>
                <li className="text-l flex items-start">
                  <span>🐙</span>
                  <span className="ml-2">
                    This template is open source - you can see the source code and deploy your own version <a href="https://github.com/jacoblee93/fully-local-pdf-chatbot" target="_blank">from the GitHub repo</a>!
                  </span>
                </li>
                <li className="text-l flex items-start">
                  <span>👇</span>
                  <span className="ml-2">
                    Try embedding a PDF below, then asking questions! You can even turn off your WiFi after the initial model download.
                  </span>
                </li>
              </ul>
              <img src="src/assets/img.jpg" alt="image" className="my-4 mx-auto md:ml-8 md:mt-9 md:my-0 w-full md:w-auto" />
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex justify-between items-center w-full">
              <input id="file_input" type="file" accept=".txt,.md,.pdf,.docx,.html" className="text-white" onChange=""></input>
              <button
                type="submit"
                className="inline-flex items-center bg-sky-900 px-3 py-3 rounded-md font-semibold text-white hover:bg-black/80"
              >
                {isUploading && (
                <div className="flex items-center justify-center pr-5">
                  <ProgressBar
                    height={50}
                    width={50}
                    ariaLabel="progress-bar-loading"
                    barColor='#bd6c15'
                    borderColor='#fcfeff'
                  />
                </div>
              )}
                <span className="">Embed</span>
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
