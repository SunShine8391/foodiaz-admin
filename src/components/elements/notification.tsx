import {
  BellIcon,
  CheckCircledIcon,
  InfoCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { toast } from "sonner";

interface NotificationProps {
  message: string;
  description?: string | null | React.ReactNode;
  className?: string;
  duration?: number;
  icon?: React.ReactNode;
}

export const error = ({
  message,
  description,
  className,
  duration,
  icon,
}: NotificationProps) =>
  toast.error(message, {
    description,
    className,
    duration,
    icon: icon ?? <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />,
  });
export const success = ({
  message,
  description,
  className,
  duration,
  icon,
}: NotificationProps) =>
  toast.success(message, {
    description,
    className,
    duration,
    icon: icon ?? <CheckCircledIcon className="h-5 w-5 text-green-500" />,
  });
export const warn = ({
  message,
  description,
  className,
  duration,
  icon,
}: NotificationProps) =>
  toast.warning(message, {
    description,
    className,
    duration,
    icon: icon ?? <InfoCircledIcon className="h-5 w-5 text-amber-500" />,
  });
export const notify = ({
  message,
  description,
  className,
  duration,
  icon,
}: NotificationProps) =>
  toast.info(message, {
    description,
    className,
    duration,
    icon: icon ?? <BellIcon className="h-5 w-5 text-teal-500" />,
  });

export const notification = { success, warn, notify, error };

// export const error = ({ message, description }: NotificationProps) =>
//   toast.custom(
//     (t) => (
//       <div
//         className={cn([
//           "relative flex w-93.75 items-start gap-2 rounded-2xs bg-red-50 px-5 py-3 transition-all ease-in-out hover:translate-y-0.5 hover:shadow-none",
//           t.visible ? "animate-toast-enter" : "animate-toast-leave",
//         ])}
//       >
//         <HiMiniExclamationTriangle className="h-5 w-5 text-red-500" />
//         <div className="flex flex-1 flex-col gap-2">
//           <p className="text-md font-medium leading-6 tracking-base text-red-800">
//             {message}
//           </p>
//           {description && (
//             <p className="text-md font-normal leading-6 tracking-base text-red-700">
//               {description}
//             </p>
//           )}
//         </div>
//         <HiX
//           className="h-5 w-5 cursor-pointer text-red-500"
//           onClick={() => toast.dismiss(t.id)}
//         />
//       </div>
//     ),
//     { id: uuid(), position: "top-right" },
//   );

// export const success = ({ message, description }: NotificationProps) =>
//   toast.custom(
//     (t) => (
//       <div
//         className={cn([
//           "relative flex w-93.75 items-start gap-2 rounded-2xs bg-green-50 px-5 py-3 transition-all ease-in-out hover:translate-y-0.5 hover:shadow-none",
//           t.visible ? "animate-toast-enter" : "animate-toast-leave",
//         ])}
//       >
//         <HiMiniCheckCircle className="h-5 w-5 text-green-500" />
//         <div className="flex flex-1 flex-col gap-2">
//           <p className="text-md font-medium leading-6 tracking-base text-green-800">
//             {message}
//           </p>
//           {description && (
//             <p className="text-md font-normal leading-6 tracking-base text-green-700">
//               {description}
//             </p>
//           )}
//         </div>
//         <HiX
//           className="h-5 w-5 cursor-pointer text-green-500"
//           onClick={() => toast.dismiss(t.id)}
//         />
//       </div>
//     ),
//     { id: uuid(), position: "top-right" },
//   );

// export const warn = ({ message, description }: NotificationProps) =>
//   toast.custom(
//     (t) => (
//       <div
//         className={cn([
//           "relative flex w-93.75 items-start gap-2 rounded-2xs bg-amber-50 px-5 py-3 transition-all ease-in-out hover:translate-y-0.5 hover:shadow-none",
//           t.visible ? "animate-toast-enter" : "animate-toast-leave",
//         ])}
//       >
//         <HiMiniExclamationCircle className="h-5 w-5 text-amber-500" />
//         <div className="flex flex-1 flex-col gap-2">
//           <p className="text-md font-medium leading-6 tracking-base text-amber-800">
//             {message}
//           </p>
//           {description && (
//             <p className="text-md font-normal leading-6 tracking-base text-amber-700">
//               {description}
//             </p>
//           )}
//         </div>
//         <HiX
//           className="h-5 w-5 cursor-pointer text-amber-500"
//           onClick={() => toast.dismiss(t.id)}
//         />
//       </div>
//     ),
//     { id: uuid(), position: "top-right" },
//   );

// export const notify = ({ message, description }: NotificationProps) =>
//   toast.custom(
//     (t) => (
//       <div
//         className={cn([
//           "relative flex w-93.75 items-start gap-2 rounded-2xs bg-teal-50 px-5 py-3 transition-all ease-in-out hover:translate-y-0.5 hover:shadow-none",
//           t.visible ? "animate-toast-enter" : "animate-toast-leave",
//         ])}
//       >
//         <HiBell className="h-5 w-5 text-teal-500" />
//         <div className="flex flex-1 flex-col gap-2">
//           <p className="text-md font-medium leading-6 tracking-base text-teal-800">
//             {message}
//           </p>
//           {description && (
//             <p className="text-md font-normal leading-6 tracking-base text-teal-700">
//               {description}
//             </p>
//           )}
//         </div>
//         <HiX
//           className="h-5 w-5 cursor-pointer text-teal-500"
//           onClick={() => toast.dismiss(t.id)}
//         />
//       </div>
//     ),
//     { id: uuid(), position: "top-right" },
//   );
