import React from 'react';
import type { ChangeEvent } from 'react';
import type { ApplicationFormData, ValidationErrors } from '../../types';
import { User, Mail, Phone, MapPin, Upload, X, Camera } from 'lucide-react';

interface PersonalStepProps {
  formData: ApplicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
  errors: ValidationErrors;
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

export const PersonalStep: React.FC<PersonalStepProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrors((prev) => ({ ...prev, profilePhoto: 'Please upload a valid image file (JPG, PNG, or WebP).' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, profilePhoto: 'Image size should be less than 5MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profilePhoto: reader.result as string }));
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.profilePhoto;
        return copy;
      });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, profilePhoto: null }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#063B2E] flex items-center gap-2">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#12A875]" />
          Step 01: Personal Information
        </h2>
        <p className="text-sm text-[#374151] font-medium mt-1">
          Please provide your official contact details and location.
        </p>
      </div>

      <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
        <label className="block text-sm font-bold text-[#1E293B] mb-2">
          Profile Photograph <span className="text-[#64748B] font-semibold">(Optional for Stage 1)</span>
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {formData.profilePhoto ? (
            <div className="relative w-28 h-28 rounded-lg overflow-hidden border-2 border-[#12A875] group shadow-sm shrink-0">
              <img
                src={formData.profilePhoto}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removePhoto}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700 transition"
                title="Remove image"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-28 h-28 rounded-lg border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-[#64748B] shrink-0">
              <Camera className="w-8 h-8 mb-1 text-[#12A875]" />
              <span className="text-xs font-semibold text-[#64748B]">No Photo</span>
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#063B2E] text-white hover:bg-[#0B3D2E] font-bold text-sm cursor-pointer transition shadow-xs">
              <Upload className="w-4 h-4 text-[#8DE0BE]" />
              <span>{formData.profilePhoto ? 'Change Photograph' : 'Upload Photograph'}</span>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            <p className="text-xs text-[#64748B] font-medium mt-2">
              JPG, PNG or WebP. Max 5MB. Will be embedded into your application document.
            </p>
            {errors.profilePhoto && (
              <p className="text-xs text-red-600 font-bold mt-1">{errors.profilePhoto}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="e.g. Samuel"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.firstName ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          />
          {errors.firstName && <p className="text-xs text-red-600 font-bold mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1">
            Middle Name <span className="text-[#64748B] font-semibold">(Optional)</span>
          </label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="e.g. Chukwuemeka"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875]"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="e.g. Adebayo"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.lastName ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          />
          {errors.lastName && <p className="text-xs text-red-600 font-bold mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-1">
          Preferred Name / Title <span className="text-[#64748B] font-semibold">(Optional)</span>
        </label>
        <input
          type="text"
          name="preferredName"
          value={formData.preferredName}
          onChange={handleChange}
          placeholder="e.g. Dr. Samuel / Sam"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-[#12A875]" />
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. samuel.adebayo@example.com"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.email ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          />
          {errors.email && <p className="text-xs text-red-600 font-bold mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-[#12A875]" />
            WhatsApp Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="e.g. +234 801 234 5678"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.whatsapp ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          />
          <p className="text-xs text-[#64748B] font-medium mt-1">Include country code (e.g. +234 for Nigeria)</p>
          {errors.whatsapp && <p className="text-xs text-red-600 font-bold mt-1">{errors.whatsapp}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#12A875]" />
            Country <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="e.g. Nigeria"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.country ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          />
          {errors.country && <p className="text-xs text-red-600 font-bold mt-1">{errors.country}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1">
            State / Region <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="e.g. Lagos / FCT Abuja"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.state ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          />
          {errors.state && <p className="text-xs text-red-600 font-bold mt-1">{errors.state}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1">
            City / Locality <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Ikeja"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.city ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          />
          {errors.city && <p className="text-xs text-red-600 font-bold mt-1">{errors.city}</p>}
        </div>
      </div>
    </div>
  );
};
