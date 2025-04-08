
import React from 'react';
import { Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocumentRowProps {
  document: {
    id: number;
    filename: string;
    businessOverview: {
      summary: string;
      keyThemes: { title: string; description: string }[];
      authors: string[];
      regions: string[];
    };
    financials: {
      summary: string;
      keyInsights: { title: string; description: string }[];
      markets: string;
    };
    competitiveLandscape: {
      summary: string;
      points: { title: string; description: string }[];
    };
    feedback: {
      issueType: string | null;
      suggestion: string | null;
    };
  };
  onUploadMore: () => void;
  onDelete: () => void;
  onPlay: () => void;
  onFeedbackChange: (issueType: string | null) => void;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ 
  document, 
  onUploadMore, 
  onDelete, 
  onPlay,
  onFeedbackChange
}) => {
  return (
    <div className="grid grid-cols-6 border-b border-stack-border">
      {/* Actions column */}
      <div className="col-span-1 p-4 flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onPlay}>
          <Play className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Report column */}
      <div className="col-span-1 p-4">
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex-shrink-0 bg-red-500 text-white rounded p-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm truncate max-w-[150px]">{document.filename}</span>
            <Button variant="ghost" size="icon" onClick={onDelete} className="h-6 w-6">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="w-full text-sm" onClick={onUploadMore}>
            Upload more files
          </Button>
        </div>
      </div>
      
      {/* Business Overview column */}
      <div className="col-span-1 p-4">
        <div className="text-xs text-stack-text">
          <p className="font-medium mb-2">Summary:</p>
          <p className="text-xs mb-3 text-stack-text">{document.businessOverview.summary}</p>
          
          <p className="font-medium mb-1">Key Themes</p>
          <ol className="list-decimal ml-4 mb-3">
            {document.businessOverview.keyThemes.map((theme, index) => (
              <li key={index} className="mb-2">
                <span className="font-medium">{theme.title}:</span> {theme.description}
              </li>
            ))}
          </ol>

          {document.businessOverview.authors.map((author, index) => (
            <div key={index} className="flex items-center text-xs mb-1">
              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
              {author}
            </div>
          ))}
        </div>
      </div>
      
      {/* Financials column */}
      <div className="col-span-1 p-4">
        <div className="text-xs text-stack-text">
          <p className="mb-3">{document.financials.summary}</p>
          
          <p className="font-medium mb-1">Key Financial Insights:</p>
          <ol className="list-decimal ml-4 mb-3">
            {document.financials.keyInsights.map((insight, index) => (
              <li key={index} className="mb-2">
                <span className="font-medium">{insight.title}:</span> {insight.description}
              </li>
            ))}
          </ol>
        </div>
      </div>
      
      {/* Competitive Landscape column */}
      <div className="col-span-1 p-4">
        <div className="text-xs text-stack-text">
          <p className="mb-3">{document.competitiveLandscape.summary}</p>
          
          <ol className="list-decimal ml-4 mb-3">
            {document.competitiveLandscape.points.map((point, index) => (
              <li key={index} className="mb-2">
                <span className="font-medium">{point.title}:</span> {point.description}
              </li>
            ))}
          </ol>
        </div>
      </div>
      
      {/* User Feedback column */}
      <div className="col-span-1 p-4">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium block mb-1">Issue Type:</label>
            <Select 
              value={document.feedback.issueType || ""} 
              onValueChange={(value) => onFeedbackChange(value || null)}
            >
              <SelectTrigger className="w-full text-xs h-8">
                <SelectValue placeholder="Select an issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Incorrect extraction">Incorrect extraction</SelectItem>
                <SelectItem value="Missing key data">Missing key data</SelectItem>
                <SelectItem value="Hallucinated output">Hallucinated output</SelectItem>
                <SelectItem value="Needs better formatting">Needs better formatting</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {document.feedback.suggestion && (
            <div className="bg-blue-50 border border-blue-100 p-2 rounded">
              <label className="text-xs font-medium block mb-1 text-blue-700">Suggested Fix:</label>
              <p className="text-xs text-blue-800">{document.feedback.suggestion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentRow;
