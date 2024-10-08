import { useEffect, useState } from "react";
import { customFetch } from "../../utils";

const Second = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const fileId = "335231d6-4f5a-45d0-a1cb-20b60f047a24";

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await customFetch.get(`/sip/pdf/${fileId}`, {
          responseType: "blob", // meminta respons dalam bentuk blob
        });

        const url = URL.createObjectURL(response.data); // buat URL dari blob
        setPdfUrl(url); // simpan URL ke state
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPDF();
  }, [fileId]);

  return (
    <div>
      {pdfUrl ? (
        <embed
          src={pdfUrl}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default Second;
