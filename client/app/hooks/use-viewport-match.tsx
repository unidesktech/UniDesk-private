import React, { useEffect, useState } from "react";

const useViewportMatch= (breakpoint : number =768):boolean => {
  const [matches, setMatches] = useState<boolean>(false);
  useEffect(() => {
    const checkSize = () => {
      setMatches(window.innerWidth >= breakpoint);
    };
    checkSize();
    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, [breakpoint]);

  return matches;
};

export default useViewportMatch;
