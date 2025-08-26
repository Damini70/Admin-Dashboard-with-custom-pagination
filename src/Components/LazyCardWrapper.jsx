import { useState, useRef, useEffect } from "react";

const LazyWrapper = ({ children, as = "div", isSmallScreen = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Decide the actual element type based on screen size
  const elementType = isSmallScreen ? "div" : as;

  if (!isVisible) {
    if (elementType === "tr") {
      // Render an empty row as placeholder
      return (
        <tr ref={ref}>
          <td colSpan="100%"></td>
        </tr>
      );
    }
    return <div ref={ref} />;
  }

  // Render actual content when visible
  if (elementType === "tr") return <>{children}</>; // table row
  return <div ref={ref}>{children}</div>; // div/card
};

export default LazyWrapper;
