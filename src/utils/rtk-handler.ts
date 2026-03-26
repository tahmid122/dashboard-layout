import { RtkErrorWrapper, T_ApiResponse } from "@/types";
import { toast } from "sonner";

interface MutationOptions<T> {
  onSuccess?: (response: T_ApiResponse<T>) => void; // Now receives full response
  onError?: (error: RtkErrorWrapper | unknown) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
  showToast?: boolean;
}

/**
 * A type-safe handler for RTK Query Mutations that returns the full response
 */
export const handleMutation = async <T>(
  mutationPromise: Promise<T_ApiResponse<T>>,
  options: MutationOptions<T> = {},
) => {
  const {
    onSuccess,
    onError,
    successMessage, // If undefined, we'll use result.message
    errorMessage = null,
    showToast = true,
  } = options;

  try {
    const result = await mutationPromise;

    if (showToast) {
      // Priority: Custom Message > Backend Message > Default
      toast.success(successMessage || result.message || "Success!");
    }

    if (onSuccess) onSuccess(result);

    return {
      data: result, // Full ApiResponse
      error: null,
    };
  } catch (error: unknown) {
    let finalMessage = "An unexpected error occurred.";

    if (isApiError(error)) {
      finalMessage = errorMessage || error.data.message;
    }

    if (showToast) {
      toast.error(finalMessage);
    }

    if (onError) onError(error);

    return {
      data: null,
      error: error,
      message: finalMessage,
    };
  }
};

export function isApiError(error: unknown): error is RtkErrorWrapper {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).data?.message === "string"
  );
}
