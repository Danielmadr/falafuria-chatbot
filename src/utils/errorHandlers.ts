/**
 * Error handler functions for API responses
 */

/**
 * Error handler function for AI stream responses
 * 
 * Processes different error types and formats them into consistent error messages
 * 
 * @param {unknown} error - The error that occurred during processing
 * @returns {string} A formatted error message
 */
export function chatErrorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}