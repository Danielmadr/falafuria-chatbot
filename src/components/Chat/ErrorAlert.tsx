/**
 * ErrorAlert Component
 *
 * Displays error messages to the user with a dismiss button.
 */
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, X } from "lucide-react";

/**
 * Props for the ErrorAlert component
 */
interface ErrorAlertProps {
  /** Error message to display */
  error: string;
  /** Callback function for when the alert is closed */
  onClose: () => void;
}

/**
 * ErrorAlert Component
 *
 * Shows an error notification with the error message and a close button.
 * Uses a destructive alert style to highlight the error condition.
 *
 * @param {ErrorAlertProps} props - Component properties
 * @returns {JSX.Element} The rendered error alert
 */
const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => {
  return (
    <Alert variant="destructive" className="mx-4 mt-2 mb-0">
      <AlertCircle className="h-4 w-4" />
      <div className="flex-1">
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </div>
      <button
        onClick={onClose}
        className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-destructive/10"
        aria-label="Fechar alerta de erro"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
};

export default React.memo(ErrorAlert);
