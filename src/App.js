import React, { useState,useRef } from "react";
import {QRCodeCanvas} from "qrcode.react";

const Input = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border p-2 rounded w-full"
    />
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  );
};

const VCardGenerator = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [vcard, setVcard] = useState(null);
  const qrRef = useRef(null);

  const generateVCard = () => {
    const vcardData = `BEGIN:VCARD\n
    VERSION:3.0\n
    FN:${name}\n
    ORG:${company}\n
    TITLE:${jobTitle}\n 
    TEL:${phone}\n
    EMAIL:${email}\n
    END:VCARD`;
    setVcard(vcardData);
    console.log("Generated VCard Data:\n", vcardData);
  };

  const downloadQRCode = () => {
    console.log('qrRef??>>',qrRef)
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">VCard 생성기</h2>
      <Input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="회사" value={company} onChange={(e) => setCompany(e.target.value)} />
      <Input placeholder="직책" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
      <Input placeholder="전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={generateVCard}>VCard 생성</Button>
      {vcard && (
        <div className="flex flex-col items-center space-y-4" ref={qrRef}>
          <QRCodeCanvas value={vcard} size={150} 
            in
          />
          {/* <QRCodeCanvas value="www.naver.com" size={150} /> */}
          <Button onClick={downloadQRCode}>QR 코드 다운로드</Button>
        </div>
      )}
    </div>
  );
};

export default VCardGenerator;

