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
  const [tasks, setTasks] = useState<Task[]>([]);

  // Initialize tasks on mount
  useState(() => {
    const initialTasks: Task[] = [
    // Clinical tasks
    {
      id: '1',
      title: 'Cardiology follow-up coordination',
      completed: false,
      priority: 'high',
      projectId: 'clinical',
      dueDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: ['follow-up'],
      createdAt: new Date().toISOString(),
      notes: 'Confirm appointment with cardiologist in 4 weeks. Review any planned revascularization procedure notes or test results.',
      subtasks: [
        { id: 's1', title: 'Confirm appointment with cardiologist', completed: false },
        { id: 's2', title: 'Review revascularization procedure notes', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Routine labs',
      completed: false,
      priority: 'high',
      projectId: 'clinical',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: ['urgent'],
      createdAt: new Date().toISOString(),
      notes: 'Repeat HbA1c, lipid panel, and CMP (last checked > 1 year ago). Check urine microalbumin for diabetic nephropathy screening.',
      subtasks: [
        { id: 's3', title: 'Order HbA1c, lipid panel, CMP', completed: false },
        { id: 's4', title: 'Order urine microalbumin', completed: false }
      ]
    },
    {
      id: '3',
      title: 'Medication review',
      completed: false,
      priority: 'normal',
      projectId: 'clinical',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      labels: ['review'],
      createdAt: new Date().toISOString(),
      notes: 'Confirm adherence to diabetic, antihypertensive, and statin therapy. Consider dose adjustment if LDL or BP remains above goal.',
      subtasks: [
        { id: 's5', title: 'Review medication adherence', completed: false },
        { id: 's6', title: 'Assess LDL and BP targets', completed: false }
      ]
    },

    // Administrative tasks
    { id: '4', title: 'Update patient records and sign charts', completed: false, priority: 'high', projectId: 'admin', dueDate: new Date().toISOString().split('T')[0], labels: ['urgent'], createdAt: new Date().toISOString(), notes: '', subtasks: [] },
    { id: '5', title: 'Complete medical forms or insurance paperwork', completed: false, priority: 'normal', projectId: 'admin', labels: [], createdAt: new Date().toISOString(), notes: '', subtasks: [] },
    ];
    setTasks(initialTasks);
  });

  const projects: Project[] = [
    { id: 'admin', name: '🧾 Administrative', color: '#3B82F6', taskCount: 2, createdAt: new Date().toISOString() },
    { id: 'clinical', name: '🔬 Clinical', color: '#10B981', taskCount: 3, createdAt: new Date().toISOString() },
  ];

  const labels: Label[] = [
    { id: 'urgent', name: 'Urgent', color: '#EF4444', taskCount: 2 },
    { id: 'review', name: 'Review', color: '#3B82F6', taskCount: 1 },
    { id: 'follow-up', name: 'Follow-up', color: '#10B981', taskCount: 1 },
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
    switch (selectedSection) {
      case 'inbox':
        return tasks.filter(t => !t.projectId && !t.completed);
      case 'today':
        return tasks.filter(t => t.dueDate && isToday(t.dueDate) && !t.completed);
      case 'upcoming':
        return tasks.filter(t => t.dueDate && isUpcoming(t.dueDate) && !t.completed);
      case 'projects':
        return tasks.filter(t => t.projectId && !t.completed);
      case 'project-admin':
        return tasks.filter(t => t.projectId === 'admin' && !t.completed);
      case 'project-clinical':
        return tasks.filter(t => t.projectId === 'clinical' && !t.completed);
      default:
        return tasks;
    }
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
      case 'inbox':
        return 'Inbox';
      case 'today':
        return 'Today';
      case 'upcoming':
        return 'Upcoming';
      case 'projects':
        return 'All Projects';
      case 'project-admin':
        return '🧾 Administrative';
      case 'project-clinical':
        return '🔬 Clinical';
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
