export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }], // Ukuran teks
    ["bold", "italic", "underline", "strike"], // Format teks
    [{ color: [] }, { background: [] }], // Warna teks dan background
    [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
    [{ list: "ordered" }, { list: "bullet" }], // List
    [{ indent: "-1" }, { indent: "+1" }], // Indentasi
    [{ direction: "rtl" }], // Teks Right-to-Left
    [{ align: [] }], // Align teks
    ["blockquote", "code-block"], // Blockquote dan kode
    ["link", "image", "video", "formula"], // Link, gambar, video, dan formula
    ["clean"], // Menghapus format
  ],
};

// Format yang didukung editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "sub",
  "super",
  "list",
  "bullet",
  "indent",
  "direction",
  "align",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
  "formula",
];
