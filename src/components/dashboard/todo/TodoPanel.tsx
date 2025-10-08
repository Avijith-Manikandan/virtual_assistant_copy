import { useState } from 'react';
import { TaskItem } from './TaskItem';
import { TaskDetails } from './TaskDetails';
import type { Task, Project, Label } from './types';

interface TodoPanelProps {
  selectedSection: string;
  isOpen: boolean;
  onToggle: () => void;
  width: number;
  onWidthChange: (width: number) => void;
}

export function TodoPanel({ selectedSection, isOpen, onToggle, width, onWidthChange }: TodoPanelProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => [
    // John Michael Doe tasks
    {
      id: '1',
      title: 'Review renal function and repeat labs',
      completed: false,
      priority: 'high',
      projectId: 'john-doe',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: ['labs', 'monitoring'],
      createdAt: new Date().toISOString(),
      notes: 'Review John Michael Doe\'s latest renal function (eGFR 68) and repeat labs in 2 weeks to monitor for medication-related kidney impact after starting Metoprolol and Clopidogrel.',
      subtasks: [
        { id: 's1', title: 'Review current eGFR 68', completed: false },
        { id: 's2', title: 'Order repeat BMP and renal function', completed: false },
        { id: 's3', title: 'Assess medication dosing', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Confirm cardiology follow-up appointment',
      completed: false,
      priority: 'high',
      projectId: 'john-doe',
      dueDate: '2025-10-25',
      labels: ['follow-up', 'cardiology'],
      createdAt: new Date().toISOString(),
      notes: 'Confirm John Michael Doe\'s cardiology follow-up appointment scheduled for 2025-11-01 and ensure cardiac rehab referral is active.',
      subtasks: [
        { id: 's4', title: 'Verify appointment on 2025-11-01', completed: false },
        { id: 's5', title: 'Check cardiac rehab referral status', completed: false }
      ]
    },
    {
      id: '3',
      title: 'Review BP and symptom diary',
      completed: false,
      priority: 'normal',
      projectId: 'john-doe',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: ['monitoring', 'cardiology'],
      createdAt: new Date().toISOString(),
      notes: 'Review John Michael Doe\'s blood pressure and symptom diary for any new chest discomfort, fatigue, or weight gain suggestive of heart-failure progression.',
      subtasks: [
        { id: 's6', title: 'Review home BP readings', completed: false },
        { id: 's7', title: 'Assess for chest discomfort or fatigue', completed: false },
        { id: 's8', title: 'Check for weight gain trends', completed: false }
      ]
    },

    // Robert Johnson tasks
    {
      id: '4',
      title: 'Order annual diabetes monitoring labs',
      completed: false,
      priority: 'high',
      projectId: 'robert-johnson',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: ['labs', 'diabetes'],
      createdAt: new Date().toISOString(),
      notes: 'Order updated HbA1c, lipid panel, and urine microalbumin for Robert Johnson as part of annual diabetes monitoring (last labs >1 year ago).',
      subtasks: [
        { id: 's9', title: 'Order HbA1c', completed: false },
        { id: 's10', title: 'Order lipid panel', completed: false },
        { id: 's11', title: 'Order urine microalbumin', completed: false }
      ]
    },
    {
      id: '5',
      title: 'Schedule diabetic retinal and foot exams',
      completed: false,
      priority: 'normal',
      projectId: 'robert-johnson',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: ['screening', 'diabetes'],
      createdAt: new Date().toISOString(),
      notes: 'Verify Robert Johnson has completed annual diabetic retinal and foot exams or schedule them within the next month.',
      subtasks: [
        { id: 's12', title: 'Check retinal exam completion', completed: false },
        { id: 's13', title: 'Check foot exam completion', completed: false },
        { id: 's14', title: 'Schedule any missing exams', completed: false }
      ]
    },
    {
      id: '6',
      title: 'Review home BP readings and adjust meds',
      completed: false,
      priority: 'normal',
      projectId: 'robert-johnson',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: ['monitoring', 'hypertension'],
      createdAt: new Date().toISOString(),
      notes: 'Review Robert Johnson\'s home blood pressure readings and adjust antihypertensive regimen if average >130/80 mmHg.',
      subtasks: [
        { id: 's15', title: 'Review BP log', completed: false },
        { id: 's16', title: 'Calculate average BP', completed: false },
        { id: 's17', title: 'Adjust medications if needed', completed: false }
      ]
    },

    // Emily Chen tasks
    {
      id: '7',
      title: 'Reassess peak flow after steroid taper',
      completed: false,
      priority: 'high',
      projectId: 'emily-chen',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: ['monitoring', 'asthma'],
      createdAt: new Date().toISOString(),
      notes: 'Reassess Emily Chen\'s peak flow measurement after steroid taper (previous 380 L/min, goal ≥450) to evaluate asthma control.',
      subtasks: [
        { id: 's18', title: 'Measure peak flow', completed: false },
        { id: 's19', title: 'Compare to goal of ≥450 L/min', completed: false },
        { id: 's20', title: 'Adjust treatment if suboptimal', completed: false }
      ]
    },
    {
      id: '8',
      title: 'Evaluate allergy management plan',
      completed: false,
      priority: 'normal',
      projectId: 'emily-chen',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: ['review', 'allergy'],
      createdAt: new Date().toISOString(),
      notes: 'Evaluate Emily Chen\'s allergy management plan — consider adding montelukast or antihistamine for elevated IgE (250 IU/mL) and seasonal triggers.',
      subtasks: [
        { id: 's21', title: 'Review IgE levels (250 IU/mL)', completed: false },
        { id: 's22', title: 'Assess seasonal trigger patterns', completed: false },
        { id: 's23', title: 'Consider montelukast or antihistamine', completed: false }
      ]
    },
  ]);

  const projects: Project[] = [
    { id: 'john-doe', name: '👤 John Michael Doe', color: '#EF4444', taskCount: 3, createdAt: new Date().toISOString() },
    { id: 'robert-johnson', name: '👤 Robert Johnson', color: '#F59E0B', taskCount: 3, createdAt: new Date().toISOString() },
    { id: 'emily-chen', name: '👤 Emily Chen', color: '#8B5CF6', taskCount: 2, createdAt: new Date().toISOString() },
  ];

  const labels: Label[] = [
    { id: 'labs', name: 'Labs', color: '#06B6D4', taskCount: 2 },
    { id: 'monitoring', name: 'Monitoring', color: '#3B82F6', taskCount: 4 },
    { id: 'follow-up', name: 'Follow-up', color: '#10B981', taskCount: 1 },
    { id: 'cardiology', name: 'Cardiology', color: '#EF4444', taskCount: 2 },
    { id: 'diabetes', name: 'Diabetes', color: '#F59E0B', taskCount: 2 },
    { id: 'screening', name: 'Screening', color: '#8B5CF6', taskCount: 1 },
    { id: 'hypertension', name: 'Hypertension', color: '#EC4899', taskCount: 1 },
    { id: 'asthma', name: 'Asthma', color: '#14B8A6', taskCount: 1 },
    { id: 'allergy', name: 'Allergy', color: '#A855F7', taskCount: 1 },
    { id: 'review', name: 'Review', color: '#6366F1', taskCount: 1 },
  ];

  const handleTaskClick = (task: Task) => {
    setExpandedTaskId(expandedTaskId === task.id ? null : task.id);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null);
    }
  };

  const getFilteredTasks = (): Task[] => {
    let filtered: Task[] = [];
    switch (selectedSection) {
      case 'today':
        filtered = tasks.filter(t => t.dueDate && isToday(t.dueDate));
        break;
      case 'upcoming':
        filtered = tasks.filter(t => t.dueDate && isUpcoming(t.dueDate));
        break;
      case 'projects':
        filtered = tasks.filter(t => t.projectId);
        break;
      case 'project-john-doe':
        filtered = tasks.filter(t => t.projectId === 'john-doe');
        break;
      case 'project-robert-johnson':
        filtered = tasks.filter(t => t.projectId === 'robert-johnson');
        break;
      case 'project-emily-chen':
        filtered = tasks.filter(t => t.projectId === 'emily-chen');
        break;
      default:
        filtered = tasks;
    }

    // Sort: incomplete first, then completed
    return filtered.sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  };

  function isToday(date: string): boolean {
    const today = new Date().toDateString();
    return new Date(date).toDateString() === today;
  }

  function isUpcoming(date: string): boolean {
    const today = new Date();
    const taskDate = new Date(date);
    return taskDate > today && taskDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  const getSectionTitle = () => {
    switch (selectedSection) {
      case 'today':
        return 'Due Today';
      case 'upcoming':
        return 'Due This Week';
      case 'projects':
        return 'All Patients';
      case 'project-john-doe':
        return '👤 John Michael Doe';
      case 'project-robert-johnson':
        return '👤 Robert Johnson';
      case 'project-emily-chen':
        return '👤 Emily Chen';
      default:
        return 'Tasks';
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <>
      <div className="bg-white dark:bg-gray-900 flex flex-col h-full w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {getSectionTitle()}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedSection === 'inbox' 
                  ? 'All caught up! Your inbox is empty.'
                  : `No tasks in ${getSectionTitle().toLowerCase()}.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onClick={() => handleTaskClick(task)}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                  labels={labels}
                  isExpanded={expandedTaskId === task.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
