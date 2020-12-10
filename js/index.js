var tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });
tl.to("#id", { x: 100, duration: 1 });
tl.to("#id", { y: 50, duration: 1 });
tl.to("#id", { opacity: 0, duration: 1 });