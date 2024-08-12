import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const devURL = "http://localhost:8080/api/v1";

export const customFetch = axios.create({
  baseURL: devURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "ngrok-skip-browser-warning": true,
  },
});

export function convertDateArrayToString(dateArray) {
  const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

  // Opsi untuk memformat tanggal dengan bahasa Indonesia
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Menggunakan toLocaleDateString dengan opsi dan lokal 'id-ID' untuk bahasa Indonesia
  const dateString = date.toLocaleDateString("id-ID", options);

  return dateString;
}

export const formatFileSize = (sizeInBytes) => {
  if (sizeInBytes >= 1048576) {
    // 1 MB = 1048576 bytes
    const mb = sizeInBytes / 1048576;
    return `${mb.toFixed(2)} MB`;
  } else if (sizeInBytes >= 1024) {
    // 1 KB = 1024 bytes
    const kb = sizeInBytes / 1024;
    return `${kb.toFixed(2)} KB`;
  } else {
    return `${sizeInBytes} bytes`;
  }
};

export function translateGender(gender) {
  switch (gender) {
    case "MALE":
      return "Laki-laki";
    case "FEMALE":
      return "Perempuan";
    default:
      return "Tidak Diketahui";
  }
}

export const isAuthenticate = (user) => {
  if (!user) {
    toast.warn("Silahkan Login terlebih dahulu");
    return redirect("/login"); // Arahkan ke halaman login
  }
  return true;
};
