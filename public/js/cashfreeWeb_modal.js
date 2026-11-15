
const cashfree = Cashfree({
    mode: "sandbox",
});

document.getElementById('renderBtn').addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:5000/payroute/pay", {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to create payment order");
        }

        const data = await response.json();

        const paymentSessionId = data.paymentSessionId;
        const orderId = data.orderId;

        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_modal",
        };

        const result = await cashfree.checkout(checkoutOptions);

        if(result.error) {
            console.log('User has closed popup');
            return ;
        }

        if(result.redirect) {
            console.log('Payment will be redirected');
        }

        if(result.paymentDetails) {
            console.log('Payment has been completed');

            const response = await fetch(`http://localhost:5000/payroute/payment-status/${orderId}`);

            const data = await response.json();
            alert('Your payment is ' + data.orderStatus)
        }
        
    } catch(error) {
        console.log("Error: ", error);
    }
});