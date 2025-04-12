import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fonts.css';

import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter } from 'react-router-dom';
import Tailwind from 'primereact/passthrough/tailwind';
import { usePassThrough } from 'primereact/passthrough';
import { twMerge } from 'tailwind-merge';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import { ToastMessageServiceProvider } from './features/messages/index.ts';
        

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;


const CustomTailwind = usePassThrough(
  Tailwind,
  {
      panel: {
          title: {
              className: 'leading-none font-light text-2xl'
          }
      },
      overlaypanel: {
        content: 'p-2 items-center flex',
      },
      button: {
        root: (_ref24:any) => {
          var props = _ref24.props,
          context = _ref24.context;

          return {
            className: classNames( 
              {
                'bg-primary hover:bg-secondary text-secondary hover:text-primary border border-primary hover:border-secondary':  props.severity === null,
                'bg-secondary hover:hover:bg-yellow-100 text-primary hover:text-primary border border-secondary hover:border-secondary': props.severity === 'secondary'
              },
            )
          }
        },
      },
  },
  {
      mergeSections: true,
      mergeProps: true,
      classNameMergeFunction: twMerge
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
    <PrimeReactProvider value={{ unstyled: true, pt: CustomTailwind  }}>
    <ToastMessageServiceProvider>
      <App />
      </ToastMessageServiceProvider>
    </PrimeReactProvider>
     </BrowserRouter>
  </StrictMode>,
)
