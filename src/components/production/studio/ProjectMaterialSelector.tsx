import React, { useState, useEffect } from 'react';
import { getProjectMaterials, getProjectDataOutputs } from '../../../utils/projectRoomStorage';
import type { ProjectMaterialItem, ProjectDataOutput } from '../../../utils/projectRoomStorage';
import { Database, FileText, Check, Plus } from 'lucide-react';

interface ProjectMaterialSelectorProps {
  cycleId?: string;
  projectId?: string;
  onInsertMaterial: (title: string, content: string) => void;
}

export const ProjectMaterialSelector: React.FC<ProjectMaterialSelectorProps> = ({
  cycleId,
  projectId,
  onInsertMaterial,
}) => {
  const [materials, setMaterials] = useState<ProjectMaterialItem[]>([]);
  const [dataOutputs, setDataOutputs] = useState<ProjectDataOutput[]>([]);
  const [insertedIds, setInsertedIds] = useState<string[]>([]);

  useEffect(() => {
    if (cycleId && projectId) {
      setMaterials(getProjectMaterials(cycleId, projectId));
      setDataOutputs(getProjectDataOutputs(cycleId, projectId));
    }
  }, [cycleId, projectId]);

  if (!cycleId || !projectId) {
    return null;
  }

  if (materials.length === 0 && dataOutputs.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-medium">
        No saved Project Room materials or Data Lab outputs found for this project. Save items in Project Room to insert them here.
      </div>
    );
  }

  const handleInsert = (id: string, title: string, content: string) => {
    onInsertMaterial(title, content);
    setInsertedIds((prev) => [...prev, id]);
  };

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900/10 via-slate-50 to-emerald-900/10 border border-emerald-900/20 my-6">
      <div className="flex items-center gap-2 mb-3">
        <Database className="w-5 h-5 text-[#063B2E]" />
        <h4 className="text-xs font-black uppercase tracking-wider text-[#063B2E]">
          Project Room & Data Lab Materials
        </h4>
      </div>
      <p className="text-xs text-slate-600 mb-4 font-medium">
        Select saved research materials, literature matrix notes, or Data Lab charts/tables to insert into your document sections.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {materials.map((item) => {
          const isInserted = insertedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <FileText className="w-4 h-4 text-[#12A875] shrink-0" />
                <div className="truncate">
                  <span className="text-xs font-extrabold text-[#063B2E] block truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {item.category} • {item.source}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleInsert(item.id, item.title, item.content)}
                disabled={isInserted}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition shrink-0 flex items-center gap-1 ${
                  isInserted
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-[#063B2E] text-white hover:bg-[#0B3D2E] cursor-pointer'
                }`}
              >
                {isInserted ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#12A875]" />
                    <span>Inserted</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert</span>
                  </>
                )}
              </button>
            </div>
          );
        })}

        {dataOutputs.map((item) => {
          const isInserted = insertedIds.includes(item.id);
          const formattedContent = `${item.title}\n${item.summary}\nData: ${JSON.stringify(item.data)}`;
          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Database className="w-4 h-4 text-[#D6B56D] shrink-0" />
                <div className="truncate">
                  <span className="text-xs font-extrabold text-[#063B2E] block truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Data Lab Output • {item.type}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleInsert(item.id, item.title, formattedContent)}
                disabled={isInserted}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition shrink-0 flex items-center gap-1 ${
                  isInserted
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-[#063B2E] text-white hover:bg-[#0B3D2E] cursor-pointer'
                }`}
              >
                {isInserted ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#12A875]" />
                    <span>Inserted</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
