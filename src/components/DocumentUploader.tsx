
import React from 'react';
import { Upload } from 'lucide-react';

interface DocumentUploaderProps {
  onUpload: (files: FileList) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  return (
    <div className="border-2 border-dashed border-stack-border rounded-md p-6 text-center hover:border-stack-highlight transition-colors">
      <input 
        type="file" 
        id="file-upload" 
        className="hidden" 
        onChange={handleFileChange} 
        multiple 
        accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
        <Upload className="h-8 w-8 text-stack-muted mb-2" />
        <p className="text-stack-text font-medium">Drop files here or click to upload</p>
        <p className="text-xs text-stack-muted mt-1">PDF, DOC, DOCX, TXT, CSV, XLSX</p>
      </label>
    </div>
  );
};

export default DocumentUploader;
