import React, { useState, useEffect } from 'react';
import type {
  StudioStep,
  DocumentTypeId,
  UploadedFileInfo,
  StructuredDocumentData,
  StudioVersionRecord,
  ValidationIssue,
} from '../../../types/documentStudio';
import { ALL_TRANSFORMATION_OPTIONS } from './TransformationSelector';
import { DocumentUpload } from './DocumentUpload';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { TransformationSelector } from './TransformationSelector';
import { DocumentStructureEditor } from './DocumentStructureEditor';
import { DocumentPreview } from './DocumentPreview';
import { DocumentHistory } from './DocumentHistory';
import { buildStructuredDocument } from '../../../services/studioFileProcessor';
import { validateDocumentStudio } from '../../../utils/documentStudioValidator';
import {
  downloadStudioPDF,
  generateStudioFileName,
} from '../../../utils/documentStudioPdfGenerator';
import {
  saveStudioDraft,
  loadStudioDraft,
  getStudioHistory,
  addStudioHistoryRecord,
  clearStudioHistory,
} from '../../../utils/studioStorage';
import {
  ArrowRight,
  ArrowLeft,
  Download,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface DocumentStudioProps {
  onBackToHub?: () => void;
  activeCycleId?: string;
  activeProjectId?: string;
}

export const DocumentStudio: React.FC<DocumentStudioProps> = ({
  onBackToHub,
  activeCycleId,
  activeProjectId,
}) => {
  const [currentStep, setCurrentStep] = useState<StudioStep>('upload');
  const [uploadedFile, setUploadedFile] = useState<UploadedFileInfo | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<DocumentTypeId | null>(null);
  const [selectedTransformationIds, setSelectedTransformationIds] = useState<string[]>(
    ALL_TRANSFORMATION_OPTIONS.filter((o) => o.defaultChecked).map((o) => o.id)
  );
  const [structuredData, setStructuredData] = useState<StructuredDocumentData | null>(null);
  const [historyRecords, setHistoryRecords] = useState<StudioVersionRecord[]>([]);

  // Load history & draft on mount
  useEffect(() => {
    const loadedHistory = getStudioHistory(activeCycleId, activeProjectId);
    setHistoryRecords(loadedHistory);

    const savedDraft = loadStudioDraft(activeCycleId, activeProjectId);
    if (savedDraft) {
      setStructuredData(savedDraft);
      setSelectedTypeId(savedDraft.docTypeId);
    }
  }, [activeCycleId, activeProjectId]);

  // Handle uploaded file
  const handleFileProcessed = (fileInfo: UploadedFileInfo) => {
    setUploadedFile(fileInfo);
    if (fileInfo.status === 'ready') {
      // Default to official-letter or research-report based on content heuristics
      const defaultType: DocumentTypeId = fileInfo.rawContent.toLowerCase().includes('research')
        ? 'research-report'
        : 'official-letter';

      setSelectedTypeId(defaultType);
      const structured = buildStructuredDocument(
        fileInfo.rawContent,
        defaultType,
        activeCycleId,
        activeProjectId
      );
      setStructuredData(structured);
      saveStudioDraft(structured, activeCycleId, activeProjectId);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setStructuredData(null);
    setSelectedTypeId(null);
  };

  // Handle document type selection
  const handleSelectType = (typeId: DocumentTypeId) => {
    setSelectedTypeId(typeId);
    if (uploadedFile && uploadedFile.rawContent) {
      const structured = buildStructuredDocument(
        uploadedFile.rawContent,
        typeId,
        activeCycleId,
        activeProjectId
      );
      setStructuredData(structured);
      saveStudioDraft(structured, activeCycleId, activeProjectId);
    } else if (structuredData) {
      const updated = { ...structuredData, docTypeId: typeId };
      setStructuredData(updated);
      saveStudioDraft(updated, activeCycleId, activeProjectId);
    }
  };

  // Toggle transformation option
  const handleToggleTransformation = (optId: string) => {
    setSelectedTransformationIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const handleSelectAllTransformations = () => {
    setSelectedTransformationIds(ALL_TRANSFORMATION_OPTIONS.map((o) => o.id));
  };

  // Validate document
  const validation = validateDocumentStudio(structuredData, !!uploadedFile && uploadedFile.status === 'ready');

  // Handle PDF generation & download
  const handleGenerateAndDownload = () => {
    if (!structuredData) return;

    downloadStudioPDF(structuredData);

    const newVersionNumber = historyRecords.length + 1;
    const newRecord: StudioVersionRecord = {
      id: 'ver_' + Date.now(),
      version: newVersionNumber,
      generatedAt: new Date().toISOString(),
      documentTitle: structuredData.title,
      docTypeId: structuredData.docTypeId,
      referenceNumber: structuredData.referenceNumber,
      pdfFileName: generateStudioFileName(structuredData),
      documentData: structuredData,
    };

    const updatedHistory = addStudioHistoryRecord(
      newRecord,
      activeCycleId,
      activeProjectId
    );
    setHistoryRecords(updatedHistory);
  };

  const stepsList: { step: StudioStep; label: string; num: string }[] = [
    { step: 'upload', label: 'Upload', num: '01' },
    { step: 'doctype', label: 'Document Type', num: '02' },
    { step: 'configure', label: 'Configure', num: '03' },
    { step: 'review', label: 'Review', num: '04' },
    { step: 'generate', label: 'Generate', num: '05' },
  ];

  const canGoNext = () => {
    if (currentStep === 'upload') return !!uploadedFile && uploadedFile.status === 'ready';
    if (currentStep === 'doctype') return !!selectedTypeId;
    if (currentStep === 'configure') return selectedTransformationIds.length > 0;
    if (currentStep === 'review') return validation.isValid;
    return true;
  };

  const handleNext = () => {
    if (currentStep === 'upload') setCurrentStep('doctype');
    else if (currentStep === 'doctype') setCurrentStep('configure');
    else if (currentStep === 'configure') setCurrentStep('review');
    else if (currentStep === 'review') setCurrentStep('generate');
  };

  const handlePrev = () => {
    if (currentStep === 'doctype') setCurrentStep('upload');
    else if (currentStep === 'configure') setCurrentStep('doctype');
    else if (currentStep === 'review') setCurrentStep('configure');
    else if (currentStep === 'generate') setCurrentStep('review');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Studio Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#063B2E] via-[#0d2a1b] to-[#063B2E] text-white shadow-xl relative overflow-hidden border border-emerald-900/50 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-[#8DE0BE] text-[10px] font-extrabold uppercase tracking-widest border border-emerald-500/30">
                NOVA ENGINE POWERED
              </span>
              <span className="text-xs font-bold text-gray-300">| Digital Secretariat</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
              NOVA DOCUMENT STUDIO
            </h1>
            <p className="text-base sm:text-lg font-bold text-[#D6B56D]">
              “Upload. Structure. Brand. Produce.”
            </p>
          </div>

          {onBackToHub && (
            <button
              type="button"
              onClick={onBackToHub}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition border border-white/20 cursor-pointer"
            >
              ← Back to Hub
            </button>
          )}
        </div>
      </div>

      {/* 5-Step Visual Step Indicator */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-8 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] gap-2">
          {stepsList.map((item, idx) => {
            const isActive = currentStep === item.step;
            const isCompleted =
              (item.step === 'upload' && currentStep !== 'upload') ||
              (item.step === 'doctype' && ['configure', 'review', 'generate'].includes(currentStep)) ||
              (item.step === 'configure' && ['review', 'generate'].includes(currentStep)) ||
              (item.step === 'review' && currentStep === 'generate');

            return (
              <React.Fragment key={item.step}>
                <div
                  onClick={() => {
                    if (isCompleted || isActive) setCurrentStep(item.step);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition ${
                    isActive
                      ? 'bg-[#063B2E] text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50 text-[#063B2E] hover:bg-emerald-100'
                      : 'text-slate-400 opacity-60'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full text-[11px] font-mono font-bold flex items-center justify-center ${
                      isActive
                        ? 'bg-[#D6B56D] text-[#063B2E]'
                        : isCompleted
                        ? 'bg-[#12A875] text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {item.num}
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-wider whitespace-nowrap">
                    {item.label}
                  </span>
                </div>

                {idx < stepsList.length - 1 && (
                  <div className="h-0.5 flex-1 bg-slate-200 mx-1 min-w-[20px]" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* History panel if versions exist */}
      <DocumentHistory
        historyRecords={historyRecords}
        onPreviewVersion={(rec) => {
          setStructuredData(rec.documentData);
          setSelectedTypeId(rec.docTypeId);
          setCurrentStep('review');
        }}
        onDownloadVersionPDF={(rec) => downloadStudioPDF(rec.documentData)}
        onClearHistory={() => {
          clearStudioHistory(activeCycleId, activeProjectId);
          setHistoryRecords([]);
        }}
      />

      {/* STEP 1: UPLOAD */}
      {currentStep === 'upload' && (
        <DocumentUpload
          uploadedFile={uploadedFile}
          onFileProcessed={handleFileProcessed}
          onRemoveFile={handleRemoveFile}
        />
      )}

      {/* STEP 2: DOCUMENT TYPE SELECTION */}
      {currentStep === 'doctype' && (
        <DocumentTypeSelector
          selectedTypeId={selectedTypeId}
          onSelectType={handleSelectType}
        />
      )}

      {/* STEP 3: TRANSFORMATION OPTIONS */}
      {currentStep === 'configure' && (
        <TransformationSelector
          selectedTypeId={selectedTypeId}
          selectedOptionIds={selectedTransformationIds}
          onToggleOption={handleToggleTransformation}
          onSelectAll={handleSelectAllTransformations}
        />
      )}

      {/* STEP 4: REVIEW & STRUCTURE EDITOR */}
      {currentStep === 'review' && structuredData && (
        <div className="space-y-6">
          {/* Validation Status Banner */}
          <div
            className={`p-5 rounded-2xl border flex items-center justify-between flex-wrap gap-4 ${
              validation.isValid
                ? 'bg-emerald-50 border-emerald-300 text-[#063B2E]'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            <div className="flex items-start gap-3">
              {validation.isValid ? (
                <ShieldCheck className="w-6 h-6 text-[#12A875] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}

              <div>
                <span className="text-xs font-black uppercase tracking-widest block mb-0.5">
                  DOCUMENT VALIDATION: {validation.status}
                </span>
                <p className="text-xs font-medium leading-relaxed">
                  {validation.isValid
                    ? 'All required sections and metadata are complete. You may proceed to generate the official NationsWorld PDF.'
                    : 'Actionable review required. Please complete or verify missing fields flagged below before generation.'}
                </p>

                {!validation.isValid && validation.issues.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs">
                    {validation.issues.map((iss: ValidationIssue) => (
                      <li key={iss.id} className="flex items-center gap-1.5 font-bold">
                        <span>•</span>
                        <span>{iss.message}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {validation.isValid && (
              <span className="px-3 py-1 rounded-full bg-[#12A875] text-white text-xs font-extrabold uppercase">
                READY FOR GENERATION
              </span>
            )}
          </div>

          <DocumentStructureEditor
            data={structuredData}
            originalRawContent={uploadedFile?.rawContent || ''}
            onChange={(updated) => {
              setStructuredData(updated);
              saveStudioDraft(updated, activeCycleId, activeProjectId);
            }}
          />
        </div>
      )}

      {/* STEP 5: GENERATE & DOWNLOAD */}
      {currentStep === 'generate' && structuredData && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#12A875] block mb-1">
                05 PRODUCE OFFICIAL NATIONSWORLD DOCUMENT
              </span>
              <h2 className="text-2xl font-black text-[#063B2E]">
                {structuredData.title}
              </h2>
              <p className="text-xs text-[#64748B] mt-1 font-medium">
                Ref: {structuredData.referenceNumber} • Format: {structuredData.docTypeId.toUpperCase()}
              </p>
            </div>

            <button
              type="button"
              onClick={handleGenerateAndDownload}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#063B2E] hover:bg-[#0B3D2E] text-white font-extrabold text-sm uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Download className="w-5 h-5 text-[#8DE0BE] group-hover:scale-110 transition-transform" />
              <span>Download NationsWorld PDF</span>
            </button>
          </div>

          <DocumentPreview data={structuredData} />
        </div>
      )}

      {/* Bottom Step Navigation Bar */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 'upload'}
          className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-[#063B2E] font-bold text-xs uppercase tracking-wider transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        {currentStep !== 'generate' ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext()}
            className="px-6 py-2.5 rounded-xl bg-[#063B2E] hover:bg-[#0B3D2E] text-white font-bold text-xs uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4 text-[#8DE0BE]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleGenerateAndDownload}
            className="px-6 py-2.5 rounded-xl bg-[#12A875] hover:bg-[#0e8a60] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Generate PDF</span>
          </button>
        )}
      </div>
    </div>
  );
};
