import confetti from "canvas-confetti";

interface ConfettiOptions extends confetti.Options {
  particleCount?: number;
}

const confettiService = {
  small: (options: ConfettiOptions = {}) => {
    confetti(
      Object.assign(
        {
          particleCount: 100,
          spread: 70,
          origin: { y: 0.75 },
        },
        options
      )
    );
  },
  medium: (options: ConfettiOptions = {}) => {
    const fire = (particleRatio: number, opts: ConfettiOptions) => {
      confetti(
        Object.assign(
          {
            origin: { y: 0.7 },
            particleCount: Math.floor(200 * particleRatio),
          },
          opts,
          options
        )
      );
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  },
  snow: (options: ConfettiOptions = {}) => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    let skew = 1;
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    (function frame() {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti(
        Object.assign(
          {
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
              x: Math.random(),
              y: Math.random() * skew - 0.2,
            },
            colors: ["#ffffff"],
            shapes: ["circle"],
            gravity: randomInRange(0.4, 0.6),
            scalar: randomInRange(0.4, 1),
            drift: randomInRange(-0.4, 0.4),
          },
          options
        )
      );

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  },
  stars: (options: ConfettiOptions = {}) => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["star"],
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    const shoot = () => {
      confetti(
        Object.assign(
          {
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ["star"],
          },
          options
        )
      );

      confetti(
        Object.assign(
          {
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ["circle"],
          },
          options
        )
      );
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  },
  fireworks: (options: ConfettiOptions = {}) => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign(
          {},
          defaults,
          {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          },
          options
        )
      );
      confetti(
        Object.assign(
          {},
          defaults,
          {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          },
          options
        )
      );
    }, 250);
  },
};

export default confettiService;
