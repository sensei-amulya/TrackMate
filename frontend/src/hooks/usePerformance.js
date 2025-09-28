import { useEffect, useRef } from "react";

export const usePerformance = (componentName) => {
  const startTime = useRef(Date.now());
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    const endTime = Date.now();
    const renderTime = endTime - startTime.current;

    if (process.env.NODE_ENV === "development") {
      console.log(`🚀 ${componentName} Performance:`);
      console.log(`   Render #${renderCount.current}`);
      console.log(`   Render time: ${renderTime}ms`);

      if (renderTime > 100) {
        console.warn(
          `⚠️ Slow render detected in ${componentName}: ${renderTime}ms`
        );
      }
    }

    startTime.current = Date.now();
  });

  return {
    renderCount: renderCount.current,
    markRender: (label) => {
      if (process.env.NODE_ENV === "development") {
        console.time(`${componentName} - ${label}`);
      }
    },
    endMark: (label) => {
      if (process.env.NODE_ENV === "development") {
        console.timeEnd(`${componentName} - ${label}`);
      }
    },
  };
};
