import { useState } from "react";

const First = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPdfUrl(reader.result); // Base64 dari file PDF
    };

    if (file) {
      reader.readAsDataURL(file); // Mengubah file menjadi Base64
    }
  };

  return (
    <div>
      <div className="lg:tooltip" data-tip="hello">
        <button className="btn">Hover me</button>
      </div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {pdfUrl && (
        <embed
          src={pdfUrl}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      )}
    </div>
  );
};

export default First;
