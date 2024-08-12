import pdf from "/icons/pdf.svg";
import excel from "/icons/excel.svg";
import word from "/icons/word.svg";
import ppt from "/icons/ppt.svg";

export const fileTypeIcons = {
  "application/pdf": {
    url: pdf,
    type: "PDF",
    ext: ".pdf",
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    url: excel,
    type: "XLS",
    ext: ".xlsx",
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    url: word,
    type: "DOC",
    ext: ".docx",
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    url: ppt,
    type: "PPT",
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
