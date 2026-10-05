import React, { useState, useRef } from 'react';
import type { UploadedFileInfo } from '../../../types/documentStudio';
import { processUploadedFile } from '../../../services/studioFileProcessor';
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  Trash2,
  RefreshCw,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

interface DocumentUploadProps {
  uploadedFile: UploadedFileInfo | null;
  onFileProcessed: (fileInfo: UploadedFileInfo) => void;
  onRemoveFile: () => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  uploadedFile,
  onFileProcessed,
  onRemoveFile,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    setIsProcessing(true);
    const result = await processUploadedFile(file);
    setIsProcessing(false);
    onFileProcessed(result);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#12A875] block mb-1">
            01 UPLOAD SOURCE DOCUMENT
          </span>
          <h2 className="text-2xl font-black text-[#063B2E] tracking-tight">
            Upload Your Document
          </h2>
          <p className="text-xs sm:text-sm text-[#374151] mt-1 font-medium">
            Upload an existing document and transform it into a properly structured NationsWorld document.
          </p>
        </div>

        {!uploadedFile || uploadedFile.status === 'error' || uploadedFile.status === 'unsupported' ? (
          <div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#12A875] bg-emerald-50/60 scale-[0.99]'
                  : 'border-slate-300 bg-slate-50/50 hover:bg-slate-100/70 hover:border-[#12A875]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt,.md,.json"
                onChange={onFileInputChange}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#063B2E] mx-auto flex items-center justify-center mb-4 shadow-xs">
                {isProcessing ? (
                  <RefreshCw className="w-8 h-8 animate-spin text-[#12A875]" />
                ) : (
                  <Upload className="w-8 h-8 text-[#063B2E]" />
                )}
              </div>

              <h3 className="text-base font-extrabold text-[#063B2E] mb-1">
                {isProcessing ? 'Reading & Extracting Document...' : 'Drag and drop your document here'}
              </h3>
              <p className="text-xs text-[#64748B] mb-4">
                or click to browse from your device
              </p>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#063B2E] text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:bg-[#0B3D2E] transition">
                <FileText className="w-4 h-4 text-[#8DE0BE]" />
                <span>Select Document File</span>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-200 text-[#374151] text-[10px] font-bold uppercase">
                  PDF (.pdf)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-200 text-[#374151] text-[10px] font-bold uppercase">
                  DOCX (.docx)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-200 text-[#374151] text-[10px] font-bold uppercase">
                  TXT (.txt)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-200 text-[#374151] text-[10px] font-bold uppercase">
                  MARKDOWN (.md)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-200 text-[#374151] text-[10px] font-bold uppercase">
                  JSON (.json)
                </span>
              </div>
            </div>

            {/* Error or unsupported alert */}
            {uploadedFile && (uploadedFile.status === 'error' || uploadedFile.status === 'unsupported') && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold block mb-0.5">Processing Issue</span>
                  <p>{uploadedFile.errorMessage || 'Unable to extract document content. Please try a different file.'}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Processed / Ready File Card */
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#063B2E] text-[#8DE0BE] flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-200 text-[#063B2E] text-[10px] font-extrabold uppercase">
                    {uploadedFile.type.toUpperCase() || 'DOCUMENT'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#12A875]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Extracted & Ready</span>
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[#063B2E]">
                  {uploadedFile.name}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[#64748B] mt-1 font-medium">
                  <span>Size: {formatFileSize(uploadedFile.size)}</span>
                  {uploadedFile.pagesCount && <span>Approx. {uploadedFile.pagesCount} pages</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#063B2E] hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt,.md,.json"
                onChange={onFileInputChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={onRemoveFile}
                className="px-3 py-2 rounded-xl bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        )}

        {/* Local Security & Privacy Guarantee */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2.5 text-xs text-[#64748B]">
          <ShieldCheck className="w-4 h-4 text-[#12A875] shrink-0" />
          <span>
            <strong>Local Processing Privacy Guarantee:</strong> Document content is extracted locally inside your browser. Your files are not uploaded to external AI services or third-party servers.
          </span>
        </div>
      </div>
    </div>
  );
};
