
// IPC : Inter Process Comunication...

process.on("message", (data) => {
    const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));
    const result = fib(data.number);
    process.send(result);
});