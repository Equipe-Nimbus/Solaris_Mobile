import { cnMerge } from "@/src/utils/cnMerge";
import React from "react";
import { Text, TextProps } from "react-native";

const Label = React.forwardRef<Text, TextProps>(
    ({ className, ...props }, ref) => (
      <Text
        ref={ref}
        className={cnMerge(className, 'text-neutral-300 font-medium')}
        {...props}
      />
    )
  );
  
  export { Label };
