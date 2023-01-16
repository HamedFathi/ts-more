export function isPrime(num: number): boolean {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}
export function isEven(num: number): boolean {
    return num % 2 === 0;
}
export function isOdd(num: number): boolean {
    return !isEven(num);
}
export function getRandomNumber(): number {
    return Math.floor(Date.now() * Math.random());
}
