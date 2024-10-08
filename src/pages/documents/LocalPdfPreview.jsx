import { useEffect, useState } from "react";

const LocalPdfPreview = ({ file }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const read = () => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPdfUrl(reader.result); // Base64 dari file PDF
      };

      if (file) {
        reader.readAsDataURL(file); // Mengubah file menjadi Base64
      }
    };
    read();
  }, [file]);

  return (
    <div>
      <iframe
        src={pdfUrl}
        type="application/pdf"
        width="100%"
        height="600px"
        title="PDF Preview"
      />
    </div>
  );
};

export default LocalPdfPreview;
