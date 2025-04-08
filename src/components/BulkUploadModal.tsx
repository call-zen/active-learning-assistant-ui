
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import DocumentUploader from './DocumentUploader';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose }) => {
  const [fileInputNode, setFileInputNode] = useState('default');
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleSubmit = () => {
    console.log('Uploading files:', files);
    console.log('Selected file input node:', fileInputNode);
    onClose();
    setFiles([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bulk Upload</DialogTitle>
          <DialogDescription>
            Upload multiple files at once to process in batch.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="file-input-node" className="text-sm font-medium">
              File Input Node
            </label>
            <Select value={fileInputNode} onValueChange={setFileInputNode}>
              <SelectTrigger id="file-input-node">
                <SelectValue placeholder="Select a file input node" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default File Input</SelectItem>
                <SelectItem value="custom">Custom File Input</SelectItem>
                <SelectItem value="advanced">Advanced File Input</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DocumentUploader onUpload={handleUpload} />
          
          {files.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">{files.length} file(s) selected:</p>
              <ul className="text-xs space-y-1 max-h-[100px] overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUploadModal;
