'use client';

import { useState, useEffect } from 'react';
import { Check, X, AlertTriangle, Info } from 'lucide-react';

export default function PasswordStrengthMeter({ strength, feedback }) {
  const [animateStrength, setAnimateStrength] = useState(0);
  
  // Animated strength meter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateStrength(strength);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [strength]);

  const getStrengthColor = () => {
    switch(strength) {
      case 0: return 'bg-destructive/70';
      case 1: return 'bg-destructive';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      default: return 'bg-muted';
    }
  };

  const getStrengthLabel = () => {
    switch(strength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Moderate';
      case 3: return 'Strong';
      case 4: return 'Very Strong';
      default: return '';
    }
  };

  const getStrengthIcon = () => {
    switch(strength) {
      case 0:
      case 1:
        return <X className="h-4 w-4 text-destructive" />;
      case 2:
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 3:
      case 4:
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Password Strength</span>
          <div className="flex items-center gap-1.5">
            {getStrengthIcon()}
            <span className={`text-xs font-medium ${
              strength <= 1 ? 'text-destructive' : 
              strength === 2 ? 'text-orange-500' : 
              strength >= 3 ? 'text-green-500' : 'text-muted-foreground'
            }`}>
              {getStrengthLabel()}
            </span>
          </div>
        </div>
        
        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getStrengthColor()} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${(animateStrength / 4) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {feedback.length > 0 && (
        <div className="bg-card/50 border border-border rounded-md p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-medium">Security recommendations</h4>
          </div>
          <ul className="space-y-1.5 pl-6 text-xs list-disc marker:text-primary">
            {feedback.map((item, index) => (
              <li key={index} className="text-muted-foreground">{item}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="flex items-center gap-2 text-xs">
          <div className={`w-3 h-3 rounded-full ${strength >= 1 ? 'bg-green-500' : 'bg-muted'}`}></div>
          <span className="text-muted-foreground">8+ characters</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className={`w-3 h-3 rounded-full ${strength >= 2 ? 'bg-green-500' : 'bg-muted'}`}></div>
          <span className="text-muted-foreground">Uppercase & lowercase</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className={`w-3 h-3 rounded-full ${strength >= 2 ? 'bg-green-500' : 'bg-muted'}`}></div>
          <span className="text-muted-foreground">Numbers</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className={`w-3 h-3 rounded-full ${strength >= 3 ? 'bg-green-500' : 'bg-muted'}`}></div>
          <span className="text-muted-foreground">Special characters</span>
        </div>
      </div>
    </div>
  );
}