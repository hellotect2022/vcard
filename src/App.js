import React, { useState,useRef } from "react";
import {QRCodeCanvas} from "qrcode.react";
import styled from "styled-components";

const RootDiv = styled.div`
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd; 
`

const Input = styled.input`
  width: 100%;
  padding: 10px; 
  margin: 5px 0; 
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%; 
  padding: 12px; 
  background-color: #007bff; 
  color: #fff; 
  font-weight: bold; 
  border-radius: 6px; 
  cursor: pointer; 
  border: none;
  margin-top: 10px;
`;

const QRDiv = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  padding: 10px; 
  margin-top: 15px; 
  background-color: #f8f9fa; 
  border-radius: 6px; 
  border: 1px solid #ddd; 
`
const QRDownloadBtn = styled.button`
padding: 10px; 
background-color: #28a745; 
color: #fff; 
font-weight: bold; 
border-radius: 6px; 
cursor: pointer; 
border: none; 
margin-top: 10px; 
`

const VCardGenerator = () => {
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const [phone, setPhone] = useState("");
  const [companyCall, setCompanyCall] = useState("");
  const [companyFax, setCompanyFax] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [companyUrl, setCompanyUrl] = useState("www.empole.co.kr");

  const [vcard, setVcard] = useState(null);
  const qrRef = useRef(null);

  const generateVCard = () => {
    const vcardData = `BEGIN:VCARD\n`.concat(`VERSION:3.0\n`,
      `N:${lastName};${name}\n`,
      `FN:${lastName}${name}\n`,
      `ORG:${company}\n`,
      `TITLE:${jobTitle}\n`,
      `TEL;CELL:${phone}\n`,
      `TEL;WORK;VOICE:${companyCall}\n`,
      `TEL;WORK;FAX:${companyFax}\n`,
      `EMAIL:${email}\n`,
      `URL;TYPE=WORK:${companyUrl}\n`,
      `NOTE:${note}\n`,
      `END:VCARD`);
    setVcard(vcardData);
    //console.log("Generated VCard Data:\n", vcardData);
  };

  const downloadQRCode = () => {
    //console.log('qrRef??>>',qrRef)
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
    <RootDiv>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "#333" }}>VCard 생성기</h2>
      <Input type="text" placeholder="성" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <Input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="text" placeholder="회사" value={company} onChange={(e) => setCompany(e.target.value)}  />
      <Input type="text" placeholder="직책" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}  />
      <Input type="text" placeholder="전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Input type="text" placeholder="회사전화" value={companyCall} onChange={(e) => setCompanyCall(e.target.value)} />
      <Input type="text" placeholder="회사팩스" value={companyFax} onChange={(e) => setCompanyFax(e.target.value)} />
      <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="email" placeholder="회사사이트" value={companyUrl} onChange={(e) => setCompanyUrl(e.target.value)} />
      <Textarea 
        id="note"
        placeholder="메모를 입력하세요..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Button onClick={generateVCard}>VCard 생성</Button>
      {vcard && (
        <QRDiv ref={qrRef}>
          <QRCodeCanvas value={vcard} size={200} />
          <QRDownloadBtn onClick={downloadQRCode}>QR 코드 다운로드</QRDownloadBtn>
        </QRDiv>
      )}
    </RootDiv>
  );
};

export default VCardGenerator;

