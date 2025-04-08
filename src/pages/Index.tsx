
import React, { useState } from 'react';
import { Upload, Trash2, Play, MoreHorizontal, Download, ArrowUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DocumentUploader from '@/components/DocumentUploader';
import DocumentRow from '@/components/DocumentRow';
import Logo from '@/components/Logo';
import BulkUploadModal from '@/components/BulkUploadModal';

// Mock data to represent uploaded documents and their processed information
const initialDocuments = [
  {
    id: 1,
    filename: 'Expanding_Finance.pdf',
    businessOverview: {
      summary: 'As we approach 2024, the economic landscape is characterized by a shift in market sentiment towards a potential soft landing, driven by solid economic activity and declining inflation. However, the authors express skepticism about the sustainability of this optimism, citing macroeconomic trends characterized by heightened macroeconomic volatility and uncertainty.',
      keyThemes: [
        {
          title: 'Managing Macro Risk',
          description: 'The current economic environment is characterized by contrasting opinions from market strategists.'
        }
      ],
      authors: [
        'Hugh Gimber, Global Market Strategist',
        'Max McKechnie, Global Market Strategist',
        'Natasha May, Global Market Analyst'
      ],
      regions: ['North America', 'Europe', 'Southeast Asia', 'EMEA']
    },
    financials: {
      summary: 'Despite the prevailing optimism, it is evident that there is a clear narrative of declining inflation, leading to a market narrative that increasingly favors the possibility of a soft landing. However, there remains skepticism regarding this outlook, as the long and variable lags of monetary policy may still impact economic resilience.',
      keyInsights: [
        {
          title: 'Higher Interest Rates and Inflation',
          description: 'The report indicates that central banks are likely to maintain higher policy rates to combat inflation, which is expected to remain above prevailing sentiment has shifted from concerns of stagflation to a more optimistic view of a potential soft landing, driven by solid economic activity and easing inflation. However, caution is warranted as central banks may not be ready to declare victory over inflation, and interest rates could remain elevated.'
        }
      ],
      markets: 'Markets section content here...'
    },
    competitiveLandscape: {
      summary: 'As we move into 2023, the financial services industry is undergoing significant transformation due to technological advancements, changing customer expectations, and evolving regulatory changes. Here are the key trends shaping the competitive landscape:',
      points: [
        {
          title: 'Macroeconomic Environment',
          description: 'Inflation and Interest Rates: Many analysts expect inflation to remain above central bank targets, leading to a prolonged period of higher interest rates. The report emphasizes uncertainty.'
        },
        {
          title: 'Rates',
          description: 'Many analysts, including those from J.P. Morgan, express skepticism about the prevailing narrative of a soft landing for Western economies. They caution that central banks may struggle to bring inflation down effectively, particularly in the context of rising global tensions.'
        }
      ]
    },
    feedback: {
      issueType: null,
      suggestion: null
    }
  },
  {
    id: 2,
    filename: 'Global_Outlook_2024.pdf',
    businessOverview: {
      summary: 'Global economic outlook for 2024 indicates cautious optimism amid persistent inflationary pressures and geopolitical tensions.',
      keyThemes: [
        {
          title: 'Global Trade Realignment',
          description: 'Major shifts in supply chains due to geopolitical tensions.'
        }
      ],
      authors: [
        'Sarah Johnson, Chief Economist',
        'Mark Anderson, Global Research Lead'
      ],
      regions: ['Global Markets', 'Emerging Economies']
    },
    financials: {
      summary: 'Financial markets appear to be pricing in at least three interest rate cuts in 2024, which may be overly optimistic given the persistent inflation data.',
      keyInsights: [
        {
          title: 'Equity Market Valuations',
          description: 'Current equity valuations in developed markets may be stretched relative to historical averages.'
        }
      ],
      markets: 'Detailed market analysis showing sector-by-sector breakdowns...'
    },
    competitiveLandscape: {
      summary: 'The global competitive landscape is increasingly defined by technological innovation and digital transformation.',
      points: [
        {
          title: 'Digital Disruption',
          description: 'Traditional financial institutions face increasing competition from fintech startups and big tech companies entering the financial services space.'
        }
      ]
    },
    feedback: {
      issueType: null,
      suggestion: null
    }
  },
  {
    id: 3,
    filename: 'Investment_Outlook_2024.pdf',
    businessOverview: {
      summary: 'Investment themes for 2024 center around technological innovation, sustainability, and adaptation to a higher interest rate environment.',
      keyThemes: [
        {
          title: 'AI Integration',
          description: 'Artificial intelligence integration across various sectors is creating new investment opportunities.'
        }
      ],
      authors: [
        'David Chen, Investment Strategist',
        'Elena Rodriguez, ESG Analyst'
      ],
      regions: ['Global', 'Sector-Specific']
    },
    financials: {
      summary: 'Asset allocation recommendations for 2024 suggest an overweight position in quality equities and selective opportunities in fixed income as rates stabilize.',
      keyInsights: [
        {
          title: 'Fixed Income Recovery',
          description: 'Bond markets may offer more attractive returns as interest rates potentially peak in early 2024.'
        }
      ],
      markets: 'Sector rotation strategies and market timing considerations...'
    },
    competitiveLandscape: {
      summary: 'Competition for alpha is intensifying as markets become more efficient and information advantages diminish.',
      points: [
        {
          title: 'Private Markets',
          description: 'Growing interest in private equity and venture capital as investors seek uncorrelated returns.'
        }
      ]
    },
    feedback: {
      issueType: null,
      suggestion: null
    }
  }
];

// Predefined suggestions based on issue types
const feedbackSuggestions = {
  'Incorrect extraction': 'Try modifying your extraction prompt to include specific data points needed from the document.',
  'Missing key data': 'Add additional parsing steps focused on financial data tables and numerical information.',
  'Hallucinated output': 'Add a fact-checking node to verify outputs against source documents.',
  'Needs better formatting': 'Implement a post-processing step to structure output in your preferred format.'
};

const Index = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleUploadMore = (documentId: number) => {
    console.log('Upload more for document ID:', documentId);
    // Implementation for uploading more files would go here
  };
  
  const handleDelete = (documentId: number) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
  };
  
  const handlePlay = (documentId: number) => {
    console.log('Play document ID:', documentId);
    // Implementation for playing/processing a document would go here
  };

  const handleFeedbackChange = (documentId: number, issueType: string | null) => {
    setDocuments(documents.map(doc => {
      if (doc.id === documentId) {
        return {
          ...doc,
          feedback: {
            issueType,
            suggestion: issueType ? feedbackSuggestions[issueType as keyof typeof feedbackSuggestions] : null
          }
        };
      }
      return doc;
    }));
  };

  return (
    <div className="min-h-screen bg-stack-bg">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo />
          <div>
            <h1 className="text-2xl font-bold">DD Assistant</h1>
            <p className="text-stack-muted">Upload documents!</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <span className="mr-1">+</span> Add Run
          </Button>
          <Button className="bg-stack-highlight text-white hover:bg-blue-600">
            <Play className="w-4 h-4 mr-2" /> Run Batch
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <MessageCircle className="w-4 h-4 mr-2" /> Chat with Table
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" /> Download CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowUp className="w-4 h-4 mr-2" /> Import CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsModalOpen(true)} className="text-stack-highlight font-medium">
                <Upload className="w-4 h-4 mr-2" /> Bulk Upload ✅
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="w-4 h-4 mr-2" /> Delete all runs
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Play className="w-4 h-4 mr-2" /> Resume runs
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      {/* Controls */}
      <div className="border-b border-stack-border px-6 py-3 flex">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Resizable</Button>
          <Button variant="outline" size="sm">Auto</Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-4">
        <div className="grid grid-cols-6 font-medium text-stack-text text-sm py-2 border-b border-stack-border">
          <div className="col-span-1 px-4">Actions</div>
          <div className="col-span-1 px-4 flex items-center">
            <div className="h-4 w-4 mr-2"></div> Report
          </div>
          <div className="col-span-1 px-4 flex items-center">
            <div className="h-4 w-4 mr-2 rounded-full border"></div> Business Overview
          </div>
          <div className="col-span-1 px-4 flex items-center">
            <div className="h-4 w-4 mr-2 rounded-full border"></div> Financials
          </div>
          <div className="col-span-1 px-4 flex items-center">
            <div className="h-4 w-4 mr-2 rounded-full border"></div> Competitive Landscape
          </div>
          <div className="col-span-1 px-4 flex items-center">
            <div className="h-4 w-4 mr-2 rounded-full border"></div> User Feedback
          </div>
        </div>
        
        {/* Document list */}
        <div>
          {documents.map((doc) => (
            <DocumentRow 
              key={doc.id} 
              document={doc} 
              onUploadMore={() => handleUploadMore(doc.id)}
              onDelete={() => handleDelete(doc.id)}
              onPlay={() => handlePlay(doc.id)}
              onFeedbackChange={(issueType) => handleFeedbackChange(doc.id, issueType)}
            />
          ))}
        </div>
      </div>
      
      {/* Bulk Upload Modal */}
      <BulkUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
