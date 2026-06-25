import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        if (hash) return;

        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });

        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;