import { describe, test, expect } from 'vitest';

const validatePasswordRegexOnly = (password: string) => {
  return /^[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/.test(password);
};

const validatePasswordWithLengthCheck = (password: string) => {
  if (password.length < 8) return false;
  return /^[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/.test(password);
};

describe('비밀번호 검증 성능테스트', () => {
  const passwordSamples = ['123', 'abcdefgh', 'password123!', 'A!2boidscds@3dcs!@5dfw$^(kd)B'];

  const measureExecutionTime = (fn: (pw: string) => boolean, repetitions: number) => {
    const start = performance.now();
    for (let i = 0; i < repetitions; i++) {
      passwordSamples.forEach((pw) => fn(pw));
    }

    const end = performance.now();
    return end - start;
  };

  const averageExecutionTime = (
    fn: (pw: string) => boolean,
    repetitions: number,
    iterations: number,
  ) => {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
      totalTime += measureExecutionTime(fn, repetitions);
    }
    return totalTime / iterations;
  };

  test('정규표현식만 사용', () => {
    const averageTime = averageExecutionTime(validatePasswordRegexOnly, 1000, 10);
    console.log(`정규표현식만 사용 : ${averageTime.toFixed(2)}ms`);
    expect(averageTime).toBeLessThan(150);
  });

  test('길이 검증 먼저 수행', () => {
    const averageTime = averageExecutionTime(validatePasswordWithLengthCheck, 1000, 10);
    console.log(`길이 검증 후 정규표현식 사용 : ${averageTime.toFixed(2)}ms`);
    expect(averageTime).toBeLessThan(100);
  });
});
