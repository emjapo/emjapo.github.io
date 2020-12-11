var tl = gsap.timeline();
tl.to("#smile", { scale: 10, rotation:30, duration: .7, ease: 'elastic' });
tl.to("#smile", { scale: 7, rotation:-30, duration: .6, ease: 'elastic'});
tl.to("#portCity", { scale:-1/3, duration: .2 });
tl.to("#smile", { scale: 1, rotation:0, duration: 1, ease: 'bounce' });
tl.to("#portCity", { opacity: 1, scale:1, duration: 1 });
tl.to("#studios", { y:30, opacity: 1, duration: 1.5, ease: 'sine' });

