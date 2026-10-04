import React, { useState, useEffect } from 'react';
import type { ApplicationFormData, ValidationErrors } from '../types';
import {
  INITIAL_FORM_DATA,
  generateApplicationReference,
  saveApplicationToLocalStorage,
  loadApplicationFromLocalStorage,
  clearApplicationLocalStorage,
} from '../utils/reference';
import { PersonalStep } from './steps/PersonalStep';
import { BackgroundStep } from './steps/BackgroundStep';
import { InterestsStep } from './steps/InterestsStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { DeclarationStep } from './steps/DeclarationStep';
import { ReviewStep } from './steps/ReviewStep';
import { SuccessScreen } from './SuccessScreen';
import { Check, ArrowRight, ArrowLeft, Save, Trash2, AlertCircle } from 'lucide-react';

const STEPS = [
  { id: 1, title: '01 Personal', shortTitle: 'Personal' },
  { id: 2, title: '02 Background', shortTitle: 'Background' },
  { id: 3, title: '03 Interests', shortTitle: 'Interests' },
  { id: 4, title: '04 Experience', shortTitle: 'Experience' },
  { id: 5, title: '05 Declaration', shortTitle: 'Declaration' },
  { id: 6, title: '06 Generate', shortTitle: 'Generate' },
];

export const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_FORM_DATA);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    const saved = loadApplicationFromLocalStorage();
    if (saved) {
      setFormData(saved.formData);
      if (saved.formData.appReference) {
        setIsGenerated(true);
      } else {
        setCurrentStep(saved.currentStep || 1);
      }
    }
  }, []);

  useEffect(() => {
    if (!isGenerated) {
      saveApplicationToLocalStorage(formData, currentStep);
    }
  }, [formData, currentStep, isGenerated]);

  const validateStep = (stepNumber: number): boolean => {
    const errs: ValidationErrors = {};

    if (stepNumber === 1) {
      if (!formData.firstName.trim()) errs.firstName = 'First name is required.';
      if (!formData.lastName.trim()) errs.lastName = 'Last name is required.';
      if (!formData.email.trim()) {
        errs.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
      if (!formData.whatsapp.trim()) errs.whatsapp = 'WhatsApp number is required.';
      if (!formData.country.trim()) errs.country = 'Country is required.';
      if (!formData.state.trim()) errs.state = 'State / Region is required.';
      if (!formData.city.trim()) errs.city = 'City / Locality is required.';
    } else if (stepNumber === 2) {
      if (!formData.currentStatus) errs.currentStatus = 'Please select your current status.';
      if (!formData.highestEducation) errs.highestEducation = 'Please select your highest level of education.';
      if (!formData.institution.trim()) errs.institution = 'Institution or organisation name is required.';
      if (!formData.fieldOfStudy.trim()) errs.fieldOfStudy = 'Field of study or profession is required.';
      if (formData.skills.length === 0) errs.skills = 'Please enter or select at least one relevant skill.';
    } else if (stepNumber === 3) {
      if (!formData.primaryTeam) errs.primaryTeam = 'Please select a primary NationsWorld team or institute.';
    } else if (stepNumber === 4) {
      if (!formData.whyMember.trim()) errs.whyMember = 'This field is required.';
      if (!formData.areaOfInterest.trim()) errs.areaOfInterest = 'This field is required.';
      if (!formData.skillsContribution.trim()) errs.skillsContribution = 'This field is required.';
      if (!formData.gainOrDevelop.trim()) errs.gainOrDevelop = 'This field is required.';
      if (!formData.communityProblem.trim()) errs.communityProblem = 'This field is required.';
    } else if (stepNumber === 5) {
      if (!formData.howHeard) errs.howHeard = 'Please select how you heard about NationsWorld.';
      if (!formData.declarationAccurate) {
        errs.declarationAccurate = 'Please accept the declaration to proceed.';
      }
      if (!formData.declarationReview) {
        errs.declarationReview = 'Please confirm understanding of the review process.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 200, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else {
      let allValid = true;
      for (let s = currentStep; s < targetStep; s++) {
        if (!validateStep(s)) {
          allValid = false;
          setCurrentStep(s);
          break;
        }
      }
      if (allValid) {
        setCurrentStep(targetStep);
        window.scrollTo({ top: 200, behavior: 'smooth' });
      }
    }
  };

  const handleSaveProgressLocally = () => {
    saveApplicationToLocalStorage(formData, currentStep);
    setSaveNotification('Application draft saved locally on this browser.');
    setTimeout(() => setSaveNotification(null), 3000);
  };

  const handleClearApplication = () => {
    clearApplicationLocalStorage();
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setIsGenerated(false);
    setIsClearModalOpen(false);
    setErrors({});
  };

  const handleGenerateApplication = () => {
    for (let s = 1; s <= 5; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        return;
      }
    }

    let ref = formData.appReference;
    if (!ref) {
      ref = generateApplicationReference();
    }

    const updated: ApplicationFormData = {
      ...formData,
      appReference: ref,
      generatedAt: new Date().toISOString(),
    };

    setFormData(updated);
    saveApplicationToLocalStorage(updated, 6);
    setIsGenerated(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  if (isGenerated) {
    return (
      <SuccessScreen
        formData={formData}
        onStartOver={() => setIsClearModalOpen(true)}
      />
    );
  }

  return (
    <div id="application-section" className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#12A875]">
              STAGE 1 MEMBERSHIP
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#063B2E] mt-1">
              NationsWorld Membership Application
            </h1>
            <p className="text-xs sm:text-sm text-[#374151] font-medium mt-1">
              Fill out all sections below to generate your official PDF membership application.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handleSaveProgressLocally}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-[#063B2E] hover:bg-emerald-50 hover:border-emerald-500 transition shadow-xs"
              title="Save draft in current browser"
            >
              <Save className="w-3.5 h-3.5 text-[#12A875]" />
              Save Progress
            </button>
            <button
              type="button"
              onClick={() => setIsClearModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-white text-xs font-bold text-red-700 hover:bg-red-50 transition"
              title="Clear form and start over"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Application
            </button>
          </div>
        </div>

        {saveNotification && (
          <div className="mt-3 p-2.5 bg-emerald-100 text-[#063B2E] text-xs font-bold rounded-lg flex items-center justify-between animate-fadeIn border border-emerald-300">
            <span>{saveNotification}</span>
            <button onClick={() => setSaveNotification(null)} className="text-[#063B2E] font-bold text-xs hover:text-black">✕</button>
          </div>
        )}

        {/* PROGRESS INDICATOR */}
        <div className="mt-6">
          <div className="hidden sm:grid grid-cols-6 gap-2">
            {STEPS.map((step) => {
              const isCurrent = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                    isCurrent
                      ? 'bg-[#063B2E] text-white border-[#063B2E] shadow-sm ring-2 ring-[#12A875]/30 font-extrabold'
                      : isCompleted
                      ? 'bg-[#8DE0BE]/30 text-[#063B2E] border-[#12A875]/40 hover:bg-[#8DE0BE]/50 font-bold'
                      : 'bg-slate-50 text-[#64748B] border-slate-200 hover:bg-slate-100 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-1 text-xs">
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 text-[#063B2E] font-black" />
                    ) : (
                      <span className="font-mono text-[11px] font-bold">0{step.id}</span>
                    )}
                  </div>
                  <span className="text-xs truncate w-full">{step.shortTitle}</span>
                </button>
              );
            })}
          </div>

          <div className="sm:hidden space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#063B2E] font-extrabold">
                Step 0{currentStep} of 06: {STEPS[currentStep - 1].shortTitle}
              </span>
              <span className="text-[#063B2E] font-black">{Math.round((currentStep / 6) * 100)}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div
                className="h-full bg-[#12A875] transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md relative">
        {currentStep === 1 && (
          <PersonalStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}

        {currentStep === 2 && (
          <BackgroundStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}

        {currentStep === 3 && (
          <InterestsStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}

        {currentStep === 4 && (
          <ExperienceStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}

        {currentStep === 5 && (
          <DeclarationStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}

        {currentStep === 6 && (
          <ReviewStep
            formData={formData}
            onGoToStep={(step) => setCurrentStep(step)}
            onGenerate={handleGenerateApplication}
          />
        )}

        {currentStep < 6 && (
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl border text-sm font-bold transition flex items-center justify-center gap-2 ${
                currentStep === 1
                  ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'border-slate-300 bg-white text-[#374151] hover:bg-slate-100 hover:text-[#063B2E]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#063B2E] text-white font-bold text-sm sm:text-base hover:bg-[#0B3D2E] transition shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {isClearModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-[#063B2E]">Clear Application?</h3>
            </div>
            <p className="text-sm text-[#374151] leading-relaxed font-medium">
              Are you sure you want to clear all entered data and reset your application progress? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsClearModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-[#374151] font-semibold text-xs hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearApplication}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition shadow-xs"
              >
                Yes, Clear Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
