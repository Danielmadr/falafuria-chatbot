import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, X } from "lucide-react";

interface ErrorAlertProps {
  error: string;
  onClose: () => void;
}

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