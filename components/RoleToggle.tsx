
import React from 'react';
import { UserRole } from '../App';

interface RoleToggleProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ role, setRole }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 p-1.5 rounded-full flex items-center shadow-inner mb-12">
        <button
          onClick={() => setRole('owner')}
          className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            role === 'owner' 
              ? 'bg-white text-deep-black shadow-md' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Я владелец канала
        </button>
        <button
          onClick={() => setRole('agency')}
          className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            role === 'agency' 
              ? 'bg-white text-deep-black shadow-md' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Я рекламное агентство
        </button>
      </div>

      <div className="text-center max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {role === 'owner' 
            ? 'Масштабируйте влияние без рисков' 
            : 'Превратите охваты в безупречный ROI'}
        </h2>
        <p className="text-gray-500 text-lg">
          {role === 'owner'
            ? 'Фокусируйтесь на контенте и продажах рекламы, пока мы создаем идеальную органическую активность.'
            : 'Оптовые цены, неограниченная масштабируемость и полная конфиденциальность для ваших клиентов.'}
        </p>
      </div>
    </div>
  );
};

export default RoleToggle;
