import pdf from "/icons/pdf.svg";
import excel from "/icons/excel.svg";
import word from "/icons/word.svg";
import ppt from "/icons/ppt.svg";

export const genders = [
  { id: 1, name: "Pria", desc: "MALE" },
  { id: 2, name: "Wanita", desc: "FEMALE" },
];

export const fileTypeIcons = {
  "application/pdf": {
    url: pdf,
    docType: "PDF",
    ext: ".pdf",
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    url: excel,
    docType: "XLS",
    ext: ".xlsx",
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    url: word,
    docType: "DOC",
    ext: ".docx",
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    url: ppt,
    docType: "PPT",
    ext: ".pptx",
  },
};

export const cutiStatus = [
  { id: "APPROVE", name: "Disetujui" },
  { id: "PENDING", name: "Menunggu" },
  { id: "REJECT", name: "Dibatalkan" },
];

export const docTypes = [
  { name: "KGB" },
  { name: "SPMT" },
  { name: "SIP" },
  { name: "AKREDITASI" },
];

export const sign = [
  { name: "Direktur" },
  { name: "Plt (Pelaksana Tugas)" },
  { name: "Plh (Pelaksana Harian)" },
  { name: "Pj (Pejabat)" },
  { name: "Pjs (Pejabat Sementara)" },
];

export const gologanPPPK = [
  { name: "Golologan I" },
  { name: "Golologan II" },
  { name: "Golologan III" },
  { name: "Golologan IV" },
  { name: "Golologan V" },
  { name: "Golologan VI" },
  { name: "Golologan VII" },
  { name: "Golologan VIII" },
  { name: "Golologan IX" },
  { name: "Golologan X" },
  { name: "Golologan XI" },
  { name: "Golologan XII" },
  { name: "Golologan XIII" },
  { name: "Golologan XIV" },
  { name: "Golologan XV" },
  { name: "Golologan XVI" },
  { name: "Golologan XVII" },
];

export const ranks = [
  { name: "Juru Muda", golongan: "I/a" },
  { name: "Juru Muda Tk I", golongan: "I/b" },
  { name: "Juru", golongan: "I/c" },
  { name: "Juru Tk I", golongan: "I/d" },
  { name: "Pengatur Muda", golongan: "II/a" },
  { name: "Pengatur Muda Tk I", golongan: "II/b" },
  { name: "Pengatur", golongan: "II/c" },
  { name: "Pengatur Tk I", golongan: "II/d" },
  { name: "Penata Muda", golongan: "III/a" },
  { name: "Penata Muda Tk I", golongan: "III/b" },
  { name: "Penata", golongan: "III/c" },
  { name: "Penata Tk I", golongan: "III/d" },
  { name: "Pembina", golongan: "IV/a" },
  { name: "Pembina Tk I", golongan: "IV/b" },
  { name: "Pembina Utama Muda", golongan: "IV/c" },
  { name: "Pembina Utama Madya", golongan: "IV/d" },
  { name: "Pembina Utama", golongan: "IV/e" },
];

export const gologanPNS = [
  { golongan: "I/a" },
  { golongan: "I/b" },
  { golongan: "I/c" },
  { golongan: "I/d" },
  { golongan: "II/a" },
  { golongan: "II/b" },
  { golongan: "II/c" },
  { golongan: "II/d" },
  { golongan: "III/a" },
  { golongan: "III/b" },
  { golongan: "III/c" },
  { golongan: "III/d" },
  { golongan: "IV/a" },
  { golongan: "IV/b" },
  { golongan: "IV/c" },
  { golongan: "IV/d" },
  { golongan: "IV/e" },
];

export const years = Array.from({ length: 71 }, (_, i) => ({
  name: (2020 + i).toString(),
}));

const toRoman = (num) => {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let result = "";
  for (const [roman, value] of romanNumerals) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
};

export const romawis = Array.from({ length: 300 }, (_, i) => ({
  name: toRoman(i + 1),
}));

export const checkCutiStatus = (dateStart, dateEnd) => {
  const startDate = new Date(dateStart[0], dateStart[1] - 1, dateStart[2]);
  const endDate = new Date(dateEnd[0], dateEnd[1] - 1, dateEnd[2]);
  const today = new Date();

  if (today > endDate) {
    return "Sudah selesai";
  } else if (today >= startDate && today <= endDate) {
    return "Sedang cuti";
  } else {
    return "Belum mulai";
  }
};
