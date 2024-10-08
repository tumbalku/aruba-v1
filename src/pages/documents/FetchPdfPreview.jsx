import { useEffect, useState } from "react";
import { customFetch } from "../../utils";
import { fileTypeIcons } from "../../data";

const FetchPdfPreview = ({ fileId }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await customFetch.get(`file/view/pdf/${fileId}`, {
          responseType: "blob",
        });

        setType(response.data.type);
        const url = URL.createObjectURL(response.data);
        setPdfUrl(url);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPDF();
  }, [fileId]);

  const handleDownloadPdf = async (id, name) => {
    try {
      const response = await customFetch.get(`file/download/${id}`, {
        responseType: "blob",
      });
      console.log(response);
      console.log(response.headers);
      const contentType = response.headers["content-type"];
      const fileExtension = fileTypeIcons[contentType].ext;

      const filename = name ? name + fileExtension : `blanko${fileExtension}`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (type !== "application/pdf") {
    return (
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => handleDownloadPdf(fileId)}
          className="btn btn-sm btn-info"
        >
          Download file blanko
        </button>
      </div>
    );
  }
  return (
    <div>
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

export default FetchPdfPreview;
