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

export const cutiType = [
  { id: 1, name: "BESAR", desc: "cuti besar", unicode: "852" },
  { id: 2, name: "SAKIT", desc: "cuti sakit", unicode: "853" },
  {
    id: 3,
    name: "KARENA_ALASAN_PENTING",
    desc: "cuti karena alasan penting",
    unicode: "857",
  },
  { id: 4, name: "BERSALIN", desc: "cuti bersalin", unicode: "854" },
  { id: 5, name: "TAHUNAN", desc: "cuti tahunan", unicode: "851" },
];

export const cutiStatus = [
  { name: "APPROVED" },
  { name: "PENDING" },
  { name: "REJECTED" },
];

export const docTypes = [
  { name: "KGB" },
  { name: "SPMT" },
  { name: "SIP" },
  { name: "AKREDITASI" },
];

export const forUsers = [
  // { id: 1, name: "Ajib", email: "hamsya836@gmail.com" },
  { id: 1, name: "Ajib", email: "tumbalku00000@gmail.com" },
  { id: 2, name: "Bilal", email: "meaku00000@gmail.com" },
  { id: 3, name: "Apon", email: "muhammadarsilalhabsy@gmail.com" },
  { id: 4, name: "Zait", email: "muhamadarsilalhabsy@gmail.com" },
  { id: 5, name: "Adam", email: "tarxvftargz@gmail.com" },
];

// icons

export const gologanPPPK = [
  { name: "Golologan I" },
  { name: "Golologan II" },
  { name: "Golologan III" },
  { name: "Golologan IV" },
  { name: "Golologan V" },
  { name: "Golologan VI" },
  { name: "Golologan VII" },
  { name: "Golologan VIII" },
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
  { name: "JURU MUDA", golongan: "I/a" },
  { name: "JURU MUDA TK I", golongan: "I/b" },
  { name: "JURU", golongan: "I/c" },
  { name: "JURU TK I", golongan: "I/d" },
  { name: "PENGATUR MUDA", golongan: "II/a" },
  { name: "PENGATUR MUDA TK I", golongan: "II/b" },
  { name: "PENGATUR", golongan: "II/c" },
  { name: "PENGATUR TK I", golongan: "II/d" },
  { name: "PENATA MUDA", golongan: "III/a" },
  { name: "PENATA MUDA TK I", golongan: "III/b" },
  { name: "PENATA", golongan: "III/c" },
  { name: "PENATA TK I", golongan: "III/d" },
  { name: "PEMBINA", golongan: "IV/a" },
  { name: "PEMBINA TK I", golongan: "IV/b" },
  { name: "PEMBINA UTAMA MUDA", golongan: "IV/c" },
  { name: "PEMBINA UTAMA MADYA", golongan: "IV/d" },
  { name: "PEMBINA UTAMA", golongan: "IV/e" },
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
