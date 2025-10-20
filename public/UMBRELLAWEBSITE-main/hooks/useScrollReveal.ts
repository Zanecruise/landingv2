
import { useEffect } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useScrollReveal = (selector: string = '.scroll-reveal', options: ScrollRevealOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else {
            if (!triggerOnce) {
              entry.target.classList.remove('visible');
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => {
      elements.forEach((elem) => {
        observer.unobserve(elem);
      });
    };
  }, [selector, threshold, rootMargin, triggerOnce]);
};

export default useScrollReveal;