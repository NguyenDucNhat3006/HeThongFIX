import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [reportText, setReportText] = useState('');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('message', reportText);
    if (file) formData.append('file', file);

    try {
      const res = await axios.post('https://backen-7.onrender.com/api/report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponse(res.data.message);
      setReportText('');
      setFile(null);
    } catch (err) {
      console.error(err);
      setResponse('❌ Gửi tố cáo thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="app-container">
      <div className="report-box">
        <h1>📢 Hệ thống tố cáo tham nhũng</h1>
        <p className="subtitle">Bạn có thể gửi nội dung tố cáo ẩn danh kèm minh chứng.</p>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Nhập nội dung tố cáo tại đây..."
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*,.pdf,.doc,.docx,.zip"
          />
          <button type="submit">Gửi tố cáo</button>
        </form>

        {response && <div className="response">{response}</div>}
      </div>
    </div>
  );
}

export default App;
