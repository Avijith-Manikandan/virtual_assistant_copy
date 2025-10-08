import { Plus, Filter, ArrowUpDown, FolderPlus } from 'lucide-react';
import { QuickAdd } from './QuickAdd';
import { SectionHeader } from './SectionHeader';
import type { Project, Label } from './types';

interface TodoLeftSidebarProps {
  selectedSection: string;
  onSectionSelect: (sectionId: string) => void;
  onAddTask: (title: string, projectId?: string, dueDate?: string, labels?: string[]) => void;
}

export function TodoLeftSidebar({ selectedSection, onSectionSelect, onAddTask }: TodoLeftSidebarProps) {
  // Sample data - in a real app this would come from props or context
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
  ];

  const sections = [
    { id: 'today', title: 'Due Today', icon: 'calendar', count: 0 },
    { id: 'upcoming', title: 'Due This Week', icon: 'clock', count: 8 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">To-Do</h2>
        
        <QuickAdd onAddTask={onAddTask} projects={projects} labels={labels} />
        
        <div className="flex items-center space-x-1 mt-3">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Filter tasks"
          >
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Sort tasks"
          >
            <ArrowUpDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Create project"
          >
            <FolderPlus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Sections */}
        {sections.map(section => (
          <div key={section.id} className="border-b border-gray-100 dark:border-gray-800">
            <button
              onClick={() => onSectionSelect(section.id)}
              className={`w-full px-3 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group ${
                selectedSection === section.id ? 'bg-healthcare-50 dark:bg-healthcare-900/20 border-r-2 border-healthcare-500' : ''
              }`}
            >
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="text-sm">{getIcon(section.icon)}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {section.title}
                </span>
                {section.count > 0 && (
                  <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full min-w-0">
                    {section.count}
                  </span>
                )}
              </div>
            </button>
          </div>
        ))}

        {/* Projects */}
        <div className="border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={() => onSectionSelect('projects')}
            className={`w-full px-3 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group ${
              selectedSection === 'projects' ? 'bg-healthcare-50 dark:bg-healthcare-900/20 border-r-2 border-healthcare-500' : ''
            }`}
          >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <span className="text-sm">👥</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Patients
              </span>
              <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                {projects.length}
              </span>
            </div>
          </button>
        </div>

        {/* Project List */}
        {selectedSection === 'projects' && (
          <div className="px-2 pb-2">
            <div className="space-y-1">
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => onSectionSelect(`project-${project.id}`)}
                  className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg group"
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-sm text-gray-900 dark:text-white truncate flex-1 text-left">
                    {project.name}
                  </span>
                  {project.taskCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                      {project.taskCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Labels */}
        <div>
          <button
            onClick={() => onSectionSelect('labels')}
            className={`w-full px-3 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group ${
              selectedSection === 'labels' ? 'bg-healthcare-50 dark:bg-healthcare-900/20 border-r-2 border-healthcare-500' : ''
            }`}
          >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <span className="text-sm">🏷️</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Labels
              </span>
              <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                {labels.length}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function getIcon(iconName: string) {
  switch (iconName) {
    case 'inbox':
      return '📥';
    case 'calendar':
      return '📅';
    case 'clock':
      return '⏰';
    case 'folder':
      return '📁';
    case 'tag':
      return '🏷️';
    default:
      return '📋';
  }
}
