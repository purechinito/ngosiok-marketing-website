import { Toaster as Sonner } from 'sonner';

/**
 * Toast host. Mounted once in App.jsx; call `toast.success(...)` /
 * `toast.error(...)` from anywhere.
 */
export const Toaster = (props) => (
  <Sonner
    position="top-center"
    closeButton
    richColors
    toastOptions={{
      classNames: {
        toast: 'font-sans rounded-xl border shadow-lg',
        title: 'font-semibold',
        description: 'text-sm',
      },
    }}
    {...props}
  />
);
