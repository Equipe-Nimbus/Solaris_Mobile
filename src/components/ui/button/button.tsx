import React, { ReactNode } from 'react';

import { cnMerge } from '@/src/utils/cnMerge';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps &
    VariantProps<typeof buttonVariants> & {
        children: ReactNode;
        variant: 'primary' | 'outline' | 'ghost';
    }

const buttonVariants = cva(
    'w-full px-4 py-2 rounded-md duration-300',
    {
        variants: {
            variant: {
                primary: 'bg-primary-500 active:bg-primary-700',
                outline: 'border border-primary-500 active:bg-primary-100/15',
                ghost: 'active:bg-primary-100/5'
            }
        }
    }
)

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
    ({ children, variant, onPress, className, ...props }, ref) => {

        const textStyle = {
            primary: 'text-neutral-800',
            outline: 'text-primary-500',
            ghost: 'text-primary-500'
        }
    
        return (
            <TouchableOpacity
                ref={ref}
                onPress={onPress}
                {...props}
                className={cnMerge(buttonVariants({ variant }), className)}
            >
                <Text
                    className={cnMerge('text-button text-center font-semibold', textStyle[variant])}
                >
                    {children}
                </Text>
            </TouchableOpacity>
        );
    }
);

export { Button };