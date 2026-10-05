import React, { useState } from 'react';
import type { ProjectToolkitData, ResearchPlannerTask, TaskPriority, TaskStatus } from '../../../../types/toolkit';
import { Plus, Trash2, CheckCircle, Clock, Edit3, Save, X } from 'lucide-react';

interface ResearchPlannerToolProps {
  toolkitData: ProjectToolkitData;
  onUpdateToolkitData: (updated: ProjectToolkitData) => void;
}

type PlanTextKeys = 'projectGoal' | 'researchQuestion' | 'keyObjectives' | 'researchAreas' | 'importantConcepts' | 'expectedEvidence' | 'targetAudience' | 'plannedOutput';

export const ResearchPlannerTool: React.FC<ResearchPlannerToolProps> = ({
  toolkitData,
  onUpdateToolkitData,
}) => {
  const plan = toolkitData.researchPlan;

  const [editingField, setEditingField] = useState<PlanTextKeys | null>(null);
  const [fieldValue, setFieldValue] = useState('');

  // New task form state
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('MEDIUM');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  // Edit task state
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskDesc, setEditTaskDesc] = useState('');
  const [editTaskPriority, setEditTaskPriority] = useState<TaskPriority>('MEDIUM');
  const [editTaskStatus, setEditTaskStatus] = useState<TaskStatus>('NOT STARTED');
  const [editTaskDueDate, setEditTaskDueDate] = useState('');

  const handleSaveField = (fieldName: PlanTextKeys) => {
    const updatedPlan = { ...plan, [fieldName]: fieldValue };
    onUpdateToolkitData({
      ...toolkitData,
      researchPlan: updatedPlan,
    });
    setEditingField(null);
  };

  const startEditField = (fieldName: PlanTextKeys) => {
    setEditingField(fieldName);
    setFieldValue((plan[fieldName] as string) || '');
  };

  const handleAddTask = () => {
    if (!newTaskName.trim()) return;
    const newTask: ResearchPlannerTask = {
      id: `task-${Date.now()}`,
      name: newTaskName.trim(),
      description: newTaskDesc.trim(),
      priority: newTaskPriority,
      status: 'NOT STARTED',
      dueDate: newTaskDueDate || undefined,
    };

    onUpdateToolkitData({
      ...toolkitData,
      researchPlan: {
        ...plan,
        tasks: [...plan.tasks, newTask],
      },
    });

    setNewTaskName('');
    setNewTaskDesc('');
    setNewTaskPriority('MEDIUM');
    setNewTaskDueDate('');
    setIsAddingTask(false);
  };

  const handleToggleTaskComplete = (taskId: string) => {
    const updatedTasks = plan.tasks.map((t: ResearchPlannerTask) => {
      if (t.id === taskId) {
        return {
          ...t,
          status: (t.status === 'COMPLETED' ? 'IN PROGRESS' : 'COMPLETED') as TaskStatus,
        };
      }
      return t;
    });

    onUpdateToolkitData({
      ...toolkitData,
      researchPlan: {
        ...plan,
        tasks: updatedTasks,
      },
    });
  };

  const handleDeleteTask = (taskId: string) => {
    onUpdateToolkitData({
      ...toolkitData,
      researchPlan: {
        ...plan,
        tasks: plan.tasks.filter((t: ResearchPlannerTask) => t.id !== taskId),
      },
    });
  };

  const startEditTask = (t: ResearchPlannerTask) => {
    setEditingTaskId(t.id);
    setEditTaskName(t.name);
    setEditTaskDesc(t.description);
    setEditTaskPriority(t.priority);
    setEditTaskStatus(t.status);
    setEditTaskDueDate(t.dueDate || '');
  };

  const handleSaveTaskEdit = () => {
    if (!editingTaskId || !editTaskName.trim()) return;
    const updatedTasks = plan.tasks.map((t: ResearchPlannerTask) => {
      if (t.id === editingTaskId) {
        return {
          ...t,
          name: editTaskName.trim(),
          description: editTaskDesc.trim(),
          priority: editTaskPriority,
          status: editTaskStatus,
          dueDate: editTaskDueDate || undefined,
        };
      }
      return t;
    });

    onUpdateToolkitData({
      ...toolkitData,
      researchPlan: {
        ...plan,
        tasks: updatedTasks,
      },
    });

    setEditingTaskId(null);
  };

  const PLAN_FIELDS: { key: PlanTextKeys; label: string; placeholder: string }[] = [
    { key: 'projectGoal', label: 'Project Goal', placeholder: 'State the primary overarching ambition of your project...' },
    { key: 'researchQuestion', label: 'Primary Research Question', placeholder: 'Formulate the central question your project answers...' },
    { key: 'keyObjectives', label: 'Key Objectives', placeholder: 'List 3-5 core objectives or research milestones...' },
    { key: 'researchAreas', label: 'Research Areas', placeholder: 'Identify thematic domains (e.g. governance, policy, economic feasibility)...' },
    { key: 'importantConcepts', label: 'Important Concepts & Keywords', placeholder: 'Define core conceptual frameworks and variables...' },
    { key: 'expectedEvidence', label: 'Expected Evidence & Data Needed', placeholder: 'Detail qualitative literature, case studies, empirical metrics...' },
    { key: 'targetAudience', label: 'Target Audience / Stakeholders', placeholder: 'Identify policymakers, institutional leaders, or community partners...' },
    { key: 'plannedOutput', label: 'Planned Output & Deliverables', placeholder: 'Specify final report, executive summary matrix, policy brief...' },
  ];

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Tool Header */}
      <div className="border-b border-[#0b8f6a]/20 pb-4">
        <h2 className="text-xl sm:text-2xl font-serif text-[#f7faf8]">Research Planner</h2>
        <p className="text-xs text-[#64748b] mt-1">
          Convert your assigned project into a structured research plan with objectives, conceptual parameters, and task milestones.
        </p>
      </div>

      {/* Structured Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PLAN_FIELDS.map((f) => {
          const isEditing = editingField === f.key;
          const val = plan[f.key] as string;

          return (
            <div
              key={f.key}
              className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#d6b45a]">
                  {f.label}
                </span>
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => startEditField(f.key)}
                    className="text-[#0b8f6a] hover:text-[#d6b45a] transition-colors p-1"
                    title="Edit Field"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleSaveField(f.key)}
                      className="p-1 text-[#0b8f6a] hover:text-[#d6b45a] transition"
                      title="Save"
                    >
                      <Save className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingField(null)}
                      className="p-1 text-[#64748b] hover:text-white transition"
                      title="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <textarea
                  rows={3}
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/50 rounded-xl p-3 text-xs text-[#f7faf8] focus:outline-none focus:border-[#d6b45a]"
                />
              ) : (
                <p className={`text-xs leading-relaxed ${val ? 'text-[#f7faf8]' : 'text-[#64748b] italic'}`}>
                  {val || f.placeholder}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Research Tasks Section */}
      <div className="space-y-4 pt-4 border-t border-[#0b8f6a]/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#f7faf8]">Research Tasks & Milestones</h3>
            <p className="text-xs text-[#64748b]">Track actionable research tasks, priorities, and deadlines.</p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingTask(true)}
            className="px-3.5 py-2 rounded-xl bg-[#0b8f6a] hover:bg-[#0d9d75] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Add Task Form Modal / Expansion */}
        {isAddingTask && (
          <div className="p-5 rounded-2xl bg-[#04271e] border border-[#0b8f6a]/40 space-y-4 animate-fade-in">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#d6b45a]">New Research Task</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Task Title *"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none focus:border-[#0b8f6a]"
              />
              <div className="flex items-center gap-3">
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
                  className="bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none focus:border-[#0b8f6a] flex-1"
                >
                  <option value="LOW">Priority: LOW</option>
                  <option value="MEDIUM">Priority: MEDIUM</option>
                  <option value="HIGH">Priority: HIGH</option>
                </select>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none focus:border-[#0b8f6a] flex-1"
                />
              </div>
            </div>
            <textarea
              rows={2}
              placeholder="Task Description / Deliverable detail..."
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none focus:border-[#0b8f6a]"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="px-3 py-1.5 text-xs text-[#64748b] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddTask}
                className="px-4 py-1.5 rounded-xl bg-[#0b8f6a] hover:bg-[#0d9d75] text-white text-xs font-bold"
              >
                Save Task
              </button>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {plan.tasks.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#64748b] bg-[#063b2e]/30 border border-[#0b8f6a]/20 rounded-2xl">
              No tasks added yet. Click "Add Task" to create your first research milestone.
            </div>
          ) : (
            plan.tasks.map((task: ResearchPlannerTask) => {
              const isEditingThis = editingTaskId === task.id;

              if (isEditingThis) {
                return (
                  <div key={task.id} className="p-4 rounded-2xl bg-[#04271e] border border-[#d6b45a]/50 space-y-3">
                    <input
                      type="text"
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                      className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <select
                        value={editTaskPriority}
                        onChange={(e) => setEditTaskPriority(e.target.value as TaskPriority)}
                        className="bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                      >
                        <option value="LOW">Priority: LOW</option>
                        <option value="MEDIUM">Priority: MEDIUM</option>
                        <option value="HIGH">Priority: HIGH</option>
                      </select>
                      <select
                        value={editTaskStatus}
                        onChange={(e) => setEditTaskStatus(e.target.value as TaskStatus)}
                        className="bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                      >
                        <option value="NOT STARTED">Status: NOT STARTED</option>
                        <option value="IN PROGRESS">Status: IN PROGRESS</option>
                        <option value="COMPLETED">Status: COMPLETED</option>
                      </select>
                      <input
                        type="date"
                        value={editTaskDueDate}
                        onChange={(e) => setEditTaskDueDate(e.target.value)}
                        className="bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={editTaskDesc}
                      onChange={(e) => setEditTaskDesc(e.target.value)}
                      className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingTaskId(null)}
                        className="px-3 py-1 text-xs text-[#64748b]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveTaskEdit}
                        className="px-3 py-1 bg-[#0b8f6a] text-white text-xs rounded-xl font-bold"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    task.status === 'COMPLETED'
                      ? 'bg-[#063b2e]/30 border-[#0b8f6a]/20 opacity-80'
                      : 'bg-[#063b2e]/70 border-[#0b8f6a]/30 hover:border-[#0b8f6a]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleTaskComplete(task.id)}
                      className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 cursor-pointer transition ${
                        task.status === 'COMPLETED'
                          ? 'bg-[#0b8f6a] border-[#0b8f6a] text-white'
                          : 'border-[#0b8f6a]/40 text-transparent hover:border-[#d6b45a]'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-bold ${
                            task.status === 'COMPLETED' ? 'line-through text-[#64748b]' : 'text-[#f7faf8]'
                          }`}
                        >
                          {task.name}
                        </span>

                        {/* Priority Badge */}
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            task.priority === 'HIGH'
                              ? 'bg-red-950/60 text-red-300 border border-red-500/30'
                              : task.priority === 'MEDIUM'
                              ? 'bg-[#d6b45a]/20 text-[#d6b45a] border border-[#d6b45a]/30'
                              : 'bg-white/5 text-[#64748b] border border-white/10'
                          }`}
                        >
                          {task.priority}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            task.status === 'COMPLETED'
                              ? 'bg-[#0b8f6a]/20 text-[#0b8f6a]'
                              : task.status === 'IN PROGRESS'
                              ? 'bg-blue-950/60 text-blue-300'
                              : 'bg-white/5 text-[#64748b]'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-xs text-[#64748b] leading-relaxed">{task.description}</p>
                      )}

                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-[10px] text-[#64748b] font-mono pt-1">
                          <Clock className="w-3 h-3 text-[#d6b45a]" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => startEditTask(task)}
                      className="p-1.5 text-[#64748b] hover:text-[#d6b45a] transition cursor-pointer"
                      title="Edit Task"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1.5 text-[#64748b] hover:text-red-400 transition cursor-pointer"
                      title="Delete Task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
