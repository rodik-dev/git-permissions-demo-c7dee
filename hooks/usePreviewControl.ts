import * as React from 'react';
import { PreviewControl } from '@stackbit/types';

export const usePreviewControl = <T extends PreviewControl>(controlBase: T): PreviewControl => {
    const [value, setValue] = React.useState<T['value']>(controlBase.value);
    const [control, setControl] = React.useState({ ...controlBase });

    React.useEffect(() => {
        setControl((control) => ({
            ...control,
            value,
            onChange(newValue: T['value']) {
                setValue(newValue);
            }
        }));
    }, [value]);

    return control;
};
