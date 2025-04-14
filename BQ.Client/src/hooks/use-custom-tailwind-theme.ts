import { usePassThrough } from 'primereact/passthrough';
import Tailwind from 'primereact/passthrough/tailwind';
import { classNames } from 'primereact/utils';
import { twMerge } from 'tailwind-merge';

const tailwindTheme = {
    panel: {
        title: {
            className: 'leading-none font-light text-2xl',
        },
    },
    overlaypanel: {
        content: 'p-2 items-center flex',
    },
    button: {
        root: (_ref24: any) => {
            const props = _ref24.props;

            return {
                className: classNames({
                    'bg-primary hover:bg-secondary text-secondary hover:text-primary border border-primary hover:border-secondary':
                        props.severity === null,
                    'bg-secondary hover:hover:bg-yellow-100 text-primary hover:text-primary border border-secondary hover:border-secondary':
                        props.severity === 'secondary',
                }),
            };
        },
    },
};

export const useCustomTailwindTheme = () => {
    return usePassThrough(Tailwind, tailwindTheme, {
        mergeSections: true,
        mergeProps: true,
        classNameMergeFunction: twMerge,
    });
};
