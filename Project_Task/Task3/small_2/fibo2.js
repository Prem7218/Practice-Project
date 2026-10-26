
// IPC: Interprocess communication

process.on("message", (data) => {
    const fibo = (n) => (n < 2 ? n : fibo(n - 1) + fibo(n - 2));
    const result = fibo(data.number);
    process.send(result);
});