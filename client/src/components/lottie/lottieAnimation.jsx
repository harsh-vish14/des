import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function LottieAnimation({ lottieJson, height, width }) {
  const container = useRef();
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,

      autoplay: true,
      animationData: lottieJson,
      //  path: lottie,
    });
    return () => anim.destroy(); // optional clean up for unmounting
  }, [container]);

  return (
    <div style={{ height, width }} className="lottie" ref={container}></div>
  );
}
