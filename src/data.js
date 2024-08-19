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

export const pangkat = [
  { name: "JURU MUDA" },
  { name: "JURU MUDA TK I" },
  { name: "JURU" },
  { name: "JURU TK I" },
  { name: "PENGATUR MUDA" },
  { name: "PENGATUR MUDA TK I" },
  { name: "PENGATUR" },
  { name: "PENGATUR TK I" },
  { name: "PENATA MUDA" },
  { name: "PENATA MUDA TK I" },
  { name: "PENATA" },
  { name: "PENATA TK I" },
  { name: "PEMBINA MUDA UTAMA" },
  { name: "PEMBINA MUDA MADYA" },
  { name: "PEMBINA UTAMA" },
  { name: "PEMBINA" },
  { name: "PEMBINA TK I" },
];

export const gologanPNS = [
  { name: "I/a" },
  { name: "I/b" },
  { name: "I/c" },
  { name: "I/d" },
  { name: "II/a" },
  { name: "II/b" },
  { name: "II/c" },
  { name: "II/d" },
  { name: "III/a" },
  { name: "III/b" },
  { name: "III/c" },
  { name: "III/d" },
  { name: "IV/a" },
  { name: "IV/b" },
  { name: "IV/c" },
  { name: "IV/d" },
  { name: "IV/e" },
];
