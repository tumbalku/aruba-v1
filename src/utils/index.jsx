import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

export const convertToValidDate = (createdAtArray) => {
  const [year, month, day, hour, minute, second, millisecond] = createdAtArray;

  return new Date(
    year,
    month - 1, // Bulan dimulai dari 0 (Januari)
    day,
    hour,
    minute,
    second + Math.floor(millisecond / 1000), // Tambahkan detik tambahan dari milidetik
    millisecond % 1000 // Milidetik yang valid (0-999)
  );
};

export const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
};
export const arrayToDate = (date) => {
  if (!date) {
    return null;
  }
  return moment([date[0], date[1] - 1, date[2]]).format("YYYY-MM-DD");
};

export function daysBetween(dateStart, dateEnd) {
  const start = moment(dateStart);
  const end = moment(dateEnd);

  const diffInDays = end.diff(start, "days");

  return diffInDays;
}
export function calculateDaysBetween(startArray, endArray) {
  // Konversi array menjadi objek moment dengan memperbaiki bulan (bulan dimulai dari 0)
  const startDate = moment([startArray[0], startArray[1] - 1, startArray[2]]);
  const endDate = moment([endArray[0], endArray[1] - 1, endArray[2]]);

  // Menghitung selisih hari antara dua tanggal
  return endDate.diff(startDate, "days");
}

// const devURL = "http://localhost:8080/api/v1";

// export const customFetch = axios.create({
//   baseURL: devURL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     // "ngrok-skip-browser-warning": true,
//   },
// });
const prodURL = import.meta.env.VITE_SPRING_API_URL;
const devURL = "http://localhost:8080/api/v1";

export const getImage = async (imageName) => {
  try {
    const apiUrl = prodURL + "/api/v1/file/image/" + imageName;

    const response = await axios.get(apiUrl, {
      responseType: "arraybuffer",
      headers: { "ngrok-skip-browser-warning": true },
    });

    const base64String = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    const imageUrl = `data:${response.headers["content-type"]};base64,${base64String}`;

    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};

export const customFetch = axios.create({
  baseURL: prodURL + "/api/v1",
  // baseURL: devURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

export function dateToFormat(dateArray) {
  if (!dateArray) {
    return null;
  }
  const [year, month, day] = dateArray;
  // Menambahkan padding 0 jika month atau day kurang dari 10
  return `${String(day).padStart(2, "0")}/${String(month).padStart(
    2,
    "0"
  )}/${year}`;
}

export function convertDateArrayToString(dateArray) {
  if (!dateArray) {
    return null;
  }
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
