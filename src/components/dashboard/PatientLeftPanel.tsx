import { useState } from 'react';
import { Search, Calendar, FileText, User } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  mrn: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  primaryConditions: string[];
}

const PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'Robert Johnson',
    age: 58,
    gender: 'Male',
    dateOfBirth: '1966-03-15',
    mrn: 'MRN-001458',
    insuranceProvider: 'Blue Cross Blue Shield',
    insurancePolicyNumber: 'BCBS-9876543210',
    primaryConditions: ['Type 2 Diabetes', 'Hypertension'],
  },
  {
    id: 'p3',
    name: 'John Michael Doe',
    age: 56,
    gender: 'Male',
    dateOfBirth: '1968-03-15',
    mrn: 'MRN-2024-789456',
    insuranceProvider: 'Blue Cross Blue Shield',
    insurancePolicyNumber: 'BCBS-789456-2024',
    primaryConditions: ['Coronary Artery Disease', 'Hyperlipidemia'],
  },
  {
    id: 'p2',
    name: 'Emily Chen',
    age: 42,
    gender: 'Female',
    dateOfBirth: '1982-07-22',
    mrn: 'MRN-002341',
    insuranceProvider: 'Aetna',
    insurancePolicyNumber: 'AET-5432109876',
    primaryConditions: ['Asthma', 'Seasonal Allergies'],
  },
  {
    id: 'p4',
    name: 'Sarah Williams',
    age: 35,
    gender: 'Female',
    dateOfBirth: '1989-05-12',
    mrn: 'MRN-004521',
    insuranceProvider: 'UnitedHealthcare',
    insurancePolicyNumber: 'UHC-8765432109',
    primaryConditions: ['Hypothyroidism'],
  },
];

export function PatientLeftPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const filteredPatients = PATIENTS.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPatient = PATIENTS.find(p => p.id === selectedPatientId);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Patients</h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-healthcare-500 dark:focus:ring-healthcare-400"
          />
        </div>

        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
          {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {selectedPatient ? (
          <div className="p-4">
            <button
              onClick={() => setSelectedPatientId(null)}
              className="text-sm text-healthcare-600 dark:text-healthcare-400 hover:underline mb-4"
            >
              ← Back to all patients
            </button>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-healthcare-400 to-healthcare-600 flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
                  {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedPatient.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span>{selectedPatient.age} years</span>
                    <span>•</span>
                    <span>{selectedPatient.gender}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Patient Summary
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">MRN</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedPatient.mrn}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Date of Birth</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedPatient.dateOfBirth}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Insurance Provider</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedPatient.insuranceProvider}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Policy Number</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-gray-900 dark:text-white break-all">
                      {selectedPatient.insurancePolicyNumber}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-healthcare-50 dark:bg-healthcare-900/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Primary Conditions
                </h4>
                <div className="space-y-1">
                  {selectedPatient.primaryConditions.map((condition, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-healthcare-500 flex-shrink-0" />
                      <span>{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2">
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatientId(patient.id)}
                className="w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-healthcare-400 to-healthcare-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-healthcare-600 dark:group-hover:text-healthcare-400 transition-colors">
                      {patient.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      <span>{patient.age} years</span>
                      <span>•</span>
                      <span>{patient.gender}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {patient.mrn}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
