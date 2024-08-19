import React, { ReactNode } from 'react';
export default function createNumericValueMarkerComponents(): {
    NumericMarker: {
        ({ children }: {
            children?: ReactNode;
        }): React.ReactNode;
        gtTransformation: string;
    };
    ValueMarker: {
        ({ children }: {
            children?: ReactNode;
        }): React.ReactNode;
        gtTransformation: string;
    };
};
//# sourceMappingURL=createNumericValueMarkerComponents.d.ts.map