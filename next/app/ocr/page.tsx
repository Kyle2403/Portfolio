"use client";
import { useState,useRef  } from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import BreadCrumbs from "../components/BreadCrumbs";
function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    for (let j = 0; j < chunk.length; j++) {
      binary += String.fromCharCode(chunk[j]);
    }
  }
  return btoa(binary);
}

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false); // ✅ new state
  const iframeRef = useRef<HTMLIFrameElement | null>(null);


  const handleClick = async () => {
    if (!file) return alert("Please select a PDF first");
    setDownloadUrl("");
    if (file.type !== "application/pdf") {
        setFile(null);
        return alert("Please select a valid PDF file.");
    }
    if (loading) return; 

    setLoading(true); // disable button

    const arrayBuffer = await file.arrayBuffer();
    const base64File = arrayBufferToBase64(arrayBuffer);

    try {
      const res = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdf_base64: base64File }),
      });

      if (!res.ok) return alert("Error processing PDF");

      const pdfArrayBuffer = await res.arrayBuffer();
      const blob = new Blob([pdfArrayBuffer], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
      setTimeout(() => {
        iframeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error(err);
      alert("An error occurred while processing the PDF");
    } finally {
      setFile(null);
      setLoading(false); // re-enable button
    }
  };

  return (

    <div className="flex flex-col min-h-screen">
        <NavigationBar/>
        <div className="pt-32 flex flex-grow items-center justify-center bg-black/40 p-6">
        {/* Card container */}
        
        <div className="bg-slate-900/90 p-8 pt-4 mb-32 rounded-xl shadow-lg w-full max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-2 text-white">OCR PDF</h1>
            <p className="text-gray-300 text-lg mb-4">
            Select a PDF file to run OCR and download a searchable PDF.
            </p>

            <div className="mb-4">
                <div className="flex justify-center mb-4">
                    <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-block">
                    Choose a File
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        disabled={loading}
                        className="hidden"
                    />
                    </label>
                </div>
                
                {file && (
                  
                    <p className="text-sm text-gray-400 text-center">
                    Selected: {file.name}
                    </p>
                    
                )}
            </div>

            <button
            onClick={handleClick}
            disabled={loading || !file}
            className={`mb-2 px-6 py-3 rounded-md font-semibold text-white transition-colors ${
                loading || !file
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            >
            {loading ? "Processing..." : "Upload & OCR"}
            </button>

            {downloadUrl  && !loading  && (
            <div className="mt-2 ">
              <iframe
                ref={iframeRef}
                src={downloadUrl}
                className="hidden 2xl:block w-full h-[80vh] border rounded-md"
                title="OCR PDF Preview"
              ></iframe>

              <a
                href={downloadUrl}
                download="ocr_output.pdf"
                className="mt-2 inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
              >
                Download OCR PDF
              </a>
            </div>
            )}
        </div>
        </div>
        <Footer></Footer>
    </div>
    
  );
}