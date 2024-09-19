import { convertDateArrayToString } from "./index";

export const sipMessage = (name, nip, num, expiredAt) => {
  const message = `
*Kepada Yth:*
${name}
${nip ? nip : ""}

Kami ingin mengingatkan bahwa masa berlaku SIP (Surat Izin Praktek) Anda akan segera berakhir pada *${convertDateArrayToString(
    expiredAt
  )}*. Agar Anda dapat menjalankan praktek sesuai ketentuan, mohon segera lakukan perpanjangan sebelum tanggal tersebut. Terima Kasih

*Detail SIP:*
•	Nomor SIP: ${num ? num : "-"}
•	Tanggal Kadaluarsa: *${convertDateArrayToString(expiredAt)}*
`.trim();
  return nip ? message : message.replace(`${name}\n\n`, `${name}\n`);
};
