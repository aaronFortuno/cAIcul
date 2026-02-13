
import React, { useState, useRef, useEffect } from 'react';

interface CalculatorProps {
  onClose: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);
  
  // Posició inicial (a la part inferior dreta)
  const [position, setPosition] = useState({ 
    x: window.innerWidth - 300, 
    y: window.innerHeight - 550 
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const buttons = [
    '(', ')', 'DEL', 'AC',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  const handleAction = (val: string) => {
    if (val === 'AC') {
      setExpression('');
      setResult(null);
    } else if (val === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const calculated = new Function(`return ${sanitized}`)();
        setResult(calculated.toString());
      } catch {
        setResult('Error');
      }
    } else {
      setExpression(prev => prev + val);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="fixed z-50 w-72 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-indigo-100 dark:border-indigo-900/50 overflow-hidden animate-in zoom-in duration-200 select-none"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div 
        onMouseDown={handleMouseDown}
        className="bg-indigo-600 dark:bg-indigo-800 p-3 flex justify-between items-center text-white cursor-move active:cursor-grabbing"
      >
        <span className="font-bold text-sm flex items-center gap-2 pointer-events-none">
          <span className="text-xl">🖩</span> Calculadora
        </span>
        <button 
          onClick={onClose}
          className="hover:bg-indigo-500 dark:hover:bg-indigo-700 rounded-full p-1 transition-colors pointer-events-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-gray-800/50">
        <div className="bg-white dark:bg-gray-950 p-3 rounded-2xl mb-4 border border-indigo-50 dark:border-indigo-900/30 text-right min-h-[80px] flex flex-col justify-end">
          <div className="text-xs text-gray-400 dark:text-gray-500 font-mono overflow-x-auto whitespace-nowrap mb-1">
            {expression || '0'}
          </div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-mono truncate">
            {result !== null ? result : (expression ? '' : '0')}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {buttons.map(btn => {
            const isSpecial = ['AC', 'DEL', '=', '/', '*', '-', '+', '(', ')'].includes(btn);
            const isAction = ['AC', 'DEL', '='].includes(btn);
            
            return (
              <button
                key={btn}
                onClick={() => handleAction(btn)}
                className={`py-3 rounded-xl font-bold text-sm transition-all active:scale-90 ${
                  btn === '=' 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 col-span-1 shadow-md' 
                    : isAction
                      ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-200'
                      : isSpecial
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                }`}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
