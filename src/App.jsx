import  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [properties, setProperties] = useState({
    title: true,
    author: true,
    date: true,
  });

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePropertyChange = (property) => {
    setProperties({
      ...properties,
      [property]: !properties[property],
    });
  };

  const generateReport = () => {
    const currentDate = new Date().toLocaleString();
    const report = {
      content: [
        { text: 'Title:', style: 'header' },
        { text: properties.title ? title : '', style: 'body' },
        { text: 'Author:', style: 'header' },
        { text: properties.author ? author : '', style: 'body' },
        { text: 'Date:', style: 'header' },
        { text: currentDate, style: 'body' },
        { text: content, style: 'body' },
      ],
      styles: {
        header: {
          bold: true,
        },
        body: {
          margin: [0, 10],
        },
      },
    };
    return pdfMake.createPdf(report);
  };

  const downloadReport = () => {
    const report = generateReport();
    report.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();
    });
  };
  return (
    <div className="container-fluid p-5">
      <header className="text-center mb-5">
        <h1 className="display-4">Document Editor</h1>
      </header>
      <div className="row">
        <div className="col-md-6">
          <h2>Properties</h2>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={properties.title}
              onChange={() => handlePropertyChange('title')}
              id="titleCheck"
            />
            <label className="form-check-label" htmlFor="titleCheck">
              Title
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={properties.author}
              onChange={() => handlePropertyChange('author')}
              id="authorCheck"
            />
            <label className="form-check-label" htmlFor="authorCheck">
              Author
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={properties.date}
              onChange={() => handlePropertyChange('date')}
              disabled
              id="dateCheck"
            />
            <label className="form-check-label" htmlFor="dateCheck">
              Date
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <h2>Document Information</h2>
          <div className="mb-3">
            <label htmlFor="titleInput" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="authorInput" className="form-label">
              Author:
            </label>
            <input
              type="text"
              className="form-control"
              id="authorInput"
              value={author}
              onChange={handleAuthorChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h2>Content</h2>
          <textarea
            value={content}
            onChange={handleContentChange}
            className="form-control"
            placeholder="Type your content here..."
            rows={10}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 text-center">
          <button className="btn btn-primary" onClick={downloadReport}>
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;