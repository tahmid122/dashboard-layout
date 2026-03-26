import { Ripples } from "ldrs/react";
import "ldrs/react/Ripples.css";
const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 z-999999 flex h-screen w-full items-center justify-center bg-white">
      <Ripples size="50" speed="2" color="#103b4c" />
    </div>
  );
};

export default LoadingSpinner;
