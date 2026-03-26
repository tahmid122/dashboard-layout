import { AlertTriangle, RefreshCcw } from "lucide-react";

const SomethingWentWrong = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mb-6 text-sm text-gray-600">
          An unexpected error occurred. Please try refreshing the page or come
          back later.
        </p>

        {/* Action */}
        <button
          onClick={() => window.location.reload()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default SomethingWentWrong;
