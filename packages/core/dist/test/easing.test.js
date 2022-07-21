"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const easing_1 = require("../easing");
const numbersToTest = [-0.5, 0, 0.4, 0.5, 0.7, 1, 1.5];
(0, vitest_1.describe)('Easing step0', () => {
    const step0 = (n) => {
        return n > 0 ? 1 : 0;
    };
    const out = (n) => 1 - step0(1 - n);
    const inOut = (n) => {
        if (n >= 0.5) {
            return 1 - step0((1 - n) * 2) / 2;
        }
        return step0(n * 2) / 2;
    };
    (0, vitest_1.test)('Easing In', () => {
        const easingIn = easing_1.Easing.in(easing_1.Easing.step0);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingIn(n)).toBe(step0(n)));
    });
    (0, vitest_1.test)('Easing Out', () => {
        const easingOut = easing_1.Easing.out(easing_1.Easing.step0);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingOut(n)).toBe(out(n)));
    });
    (0, vitest_1.test)('Easing In Out', () => {
        const easingInOut = easing_1.Easing.inOut(easing_1.Easing.step0);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingInOut(n)).toBe(inOut(n)));
    });
});
(0, vitest_1.describe)('Easing step1', () => {
    const step1 = (n) => {
        return n >= 1 ? 1 : 0;
    };
    const out = (n) => 1 - step1(1 - n);
    const inOut = (n) => {
        if (n >= 0.5) {
            return 1 - step1((1 - n) * 2) / 2;
        }
        return step1(n * 2) / 2;
    };
    (0, vitest_1.test)('Easing In', () => {
        const easingIn = easing_1.Easing.in(easing_1.Easing.step1);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingIn(n)).toBe(step1(n)));
    });
    (0, vitest_1.test)('Easing Out', () => {
        const easingOut = easing_1.Easing.out(easing_1.Easing.step1);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingOut(n)).toBe(out(n)));
    });
    (0, vitest_1.test)('Easing In Out', () => {
        const easingInOut = easing_1.Easing.inOut(easing_1.Easing.step1);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingInOut(n)).toBe(inOut(n)));
    });
});
(0, vitest_1.describe)('Easing linear', () => {
    (0, vitest_1.test)('Easing In', () => {
        const easingIn = easing_1.Easing.in(easing_1.Easing.linear);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingIn(n)).toBe(n));
    });
    (0, vitest_1.test)('Easing In Out', () => {
        const easingOut = easing_1.Easing.out(easing_1.Easing.linear);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingOut(n)).toBe(n));
    });
    (0, vitest_1.test)('Easing Out', () => {
        const easingInOut = easing_1.Easing.inOut(easing_1.Easing.linear);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingInOut(n)).toBe(n));
    });
});
(0, vitest_1.describe)('Easing Quadratic', () => {
    const quad = (n) => n * n;
    const out = (n) => 1 - quad(1 - n);
    const inOut = (n) => {
        if (n >= 0.5) {
            return 1 - quad((1 - n) * 2) / 2;
        }
        return quad(n * 2) / 2;
    };
    (0, vitest_1.test)('Easing In', () => {
        const easingIn = easing_1.Easing.in(easing_1.Easing.quad);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingIn(n)).toBe(quad(n)));
    });
    (0, vitest_1.test)('Easing In Out', () => {
        const easingOut = easing_1.Easing.out(easing_1.Easing.quad);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingOut(n)).toBe(out(n)));
    });
    (0, vitest_1.test)('Easing Out', () => {
        const easingInOut = easing_1.Easing.inOut(easing_1.Easing.quad);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingInOut(n)).toBe(inOut(n)));
    });
});
(0, vitest_1.describe)('Easing Cubic', () => {
    const cubic = (n) => n * n * n;
    const out = (n) => 1 - cubic(1 - n);
    const inOut = (n) => {
        if (n >= 0.5) {
            return 1 - cubic((1 - n) * 2) / 2;
        }
        return cubic(n * 2) / 2;
    };
    (0, vitest_1.test)('Easing In', () => {
        const easingIn = easing_1.Easing.in(easing_1.Easing.cubic);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingIn(n)).toBe(cubic(n)));
    });
    (0, vitest_1.test)('Easing In Out', () => {
        const easingOut = easing_1.Easing.out(easing_1.Easing.cubic);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingOut(n)).toBe(out(n)));
    });
    (0, vitest_1.test)('Easing Out', () => {
        const easingInOut = easing_1.Easing.inOut(easing_1.Easing.cubic);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingInOut(n)).toBe(inOut(n)));
    });
});
(0, vitest_1.describe)('Easing Circle', () => {
    const circle = (n) => 1 - Math.sqrt(1 - n * n);
    const out = (n) => 1 - circle(1 - n);
    const inOut = (n) => {
        if (n >= 0.5) {
            return 1 - circle((1 - n) * 2) / 2;
        }
        return circle(n * 2) / 2;
    };
    (0, vitest_1.test)('Easing In', () => {
        const easingIn = easing_1.Easing.in(easing_1.Easing.circle);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingIn(n)).toBe(circle(n)));
    });
    (0, vitest_1.test)('Easing In Out', () => {
        const easingOut = easing_1.Easing.out(easing_1.Easing.circle);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingOut(n)).toBe(out(n)));
    });
    (0, vitest_1.test)('Easing Out', () => {
        const easingInOut = easing_1.Easing.inOut(easing_1.Easing.circle);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingInOut(n)).toBe(inOut(n)));
    });
});
(0, vitest_1.describe)('Easing Exp', () => {
    const exp = (n) => 2 ** (10 * (n - 1));
    const out = (n) => 1 - exp(1 - n);
    const inOut = (n) => {
        if (n >= 0.5) {
            return 1 - exp((1 - n) * 2) / 2;
        }
        return exp(n * 2) / 2;
    };
    (0, vitest_1.test)('Easing In', () => {
        const easingIn = easing_1.Easing.in(easing_1.Easing.exp);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingIn(n)).toBe(exp(n)));
    });
    (0, vitest_1.test)('Easing In Out', () => {
        const easingOut = easing_1.Easing.out(easing_1.Easing.exp);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingOut(n)).toBe(out(n)));
    });
    (0, vitest_1.test)('Easing Out', () => {
        const easingInOut = easing_1.Easing.inOut(easing_1.Easing.exp);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingInOut(n)).toBe(inOut(n)));
    });
});
(0, vitest_1.describe)('Easing Bounce', () => {
    const bounce = (n) => {
        if (n < 1 / 2.75) {
            return 7.5625 * n * n;
        }
        if (n < 2 / 2.75) {
            const t2_ = n - 1.5 / 2.75;
            return 7.5625 * t2_ * t2_ + 0.75;
        }
        if (n < 2.5 / 2.75) {
            const t2_ = n - 2.25 / 2.75;
            return 7.5625 * t2_ * t2_ + 0.9375;
        }
        const t2 = n - 2.625 / 2.75;
        return 7.5625 * t2 * t2 + 0.984375;
    };
    const out = (n) => 1 - bounce(1 - n);
    const inOut = (n) => {
        if (n >= 0.5) {
            return 1 - bounce((1 - n) * 2) / 2;
        }
        return bounce(n * 2) / 2;
    };
    (0, vitest_1.test)('Easing In', () => {
        const easingIn = easing_1.Easing.in(easing_1.Easing.bounce);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingIn(n)).toBe(bounce(n)));
    });
    (0, vitest_1.test)('Easing In Out', () => {
        const easingOut = easing_1.Easing.out(easing_1.Easing.bounce);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingOut(n)).toBe(out(n)));
    });
    (0, vitest_1.test)('Easing Out', () => {
        const easingInOut = easing_1.Easing.inOut(easing_1.Easing.bounce);
        numbersToTest.forEach((n) => (0, vitest_1.expect)(easingInOut(n)).toBe(inOut(n)));
    });
});
