import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  label: string;
  id: number;
  placeholder?: string;
  containerClassName?: string;
  description?: string;
  type?: 'BOOLEAN' | 'STRING' | 'INTEGER';
  required?: boolean;
  handleInputChange: (id: string, value: string | boolean) => void;
}

export const QuestionInput: React.FC<Props> = ({
  label,
  placeholder,
  containerClassName,
  id,
  required = false,
  type = 'STRING',
  handleInputChange,
}) => {
  const labelId = `input${id}`;

  const renderInput = () => {
    switch (type) {
      case 'STRING':
        return (
          <Input
            onChange={(event) => handleInputChange(id.toString(), event.target.value)}
            placeholder={placeholder}
            name={id.toString()}
            id={id.toString()}
            required={required}
          />
        );
      case 'BOOLEAN':
        return (
          <Checkbox
            onCheckedChange={(value) => handleInputChange(id.toString(), value)}
            id={id.toString()}
            required={required}
          />
        );
      case 'INTEGER':
        return (
          <RadioGroup
            onValueChange={(value) => handleInputChange(id.toString(), value)}
            required={required}
            defaultValue=''
            className='flex justify-between gap-4 flex-wrap flex-col'
          >
            {[...Array(5)].map((_, index) => {
              const value = (index + 1).toString();
              return (
                <div key={value} className='flex items-center space-x-3'>
                  <RadioGroupItem value={value} id={id.toString()} />
                  <Label htmlFor={`${labelId}-r${value}`} className='block text-sm font-normal'>
                    {['Ужасно', 'Плохо', 'Средне', 'Хорошо', 'Отлично'][index]}{' '}
                    <span className={'text-muted-foreground text-xs'}>({value})</span>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <div className={`${type === 'BOOLEAN' ? 'flex flex-row-reverse items-center gap-2 mr-auto' : ''}`}>
        {type === 'INTEGER' ? (
          <p className='mb-4 leading-4 text-sm font-medium'>{label}</p>
        ) : (
          <Label htmlFor={labelId} className={`${type !== 'BOOLEAN' && 'mb-2'} block`}>
            {label}
          </Label>
        )}
        {renderInput()}
      </div>
      {required && (
        <small className='text-muted-foreground'>Обязательный вопрос, вам придется ответить на этот вопрос.</small>
      )}
    </div>
  );
};
