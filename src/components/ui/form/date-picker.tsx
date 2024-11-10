import React from 'react';
import { TextInput, TouchableOpacity, Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FieldWrapper } from './field-wrapper';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { cnMerge } from '@/src/utils/cnMerge';

type DateInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    className?: string;
    editable?: boolean;
};

const DateInput = <T extends FieldValues>({ control, name, label, className, editable }: DateInputProps<T>) => {
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FieldWrapper label={label} error={error}>
                    <>
                        <TouchableOpacity onPress={() => setShow(true)}>
                            <TextInput
                                className={cnMerge(className, 'w-full bg-neutral-600/30 text-neutral-100 px-4 py-2 rounded-lg focus:border focus:border-primary-500 focus:outline-none focus:ring-0', !editable ? 'bg-neutral-600' : '')}
                                value={value ? value.toLocaleDateString() : ''}
                                editable={false}
                                placeholder="dd/mm/aaaa"
                            />
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                value={value || date}
                                mode="date"
                                display="calendar"
                                onChange={(event, selectedDate) => {
                                    let currentDate = selectedDate || date;
                                    setShow(Platform.OS === 'ios');
                                    setDate(currentDate);
                                    onChange(currentDate);
                                }}
                            />
                        )}
                    </>
                </FieldWrapper>
            )}
        />
    );
};

export { DateInput };