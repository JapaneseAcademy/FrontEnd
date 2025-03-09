import { useEffect } from "react"


const PaymentSuccess = () => {
  
    // url에서 paymentKey, orderId, amount 가져오기
    const url = new URL(window.location.href);
    const paymentKey = url.searchParams.get("paymentKey");
    const orderId = url.searchParams.get("orderId");
    const amount = url.searchParams.get("amount");

    useEffect(() => {
        console.log("paymentKey : ", paymentKey, "orderId : ", orderId, "amount : ", amount);
    }, [paymentKey, orderId, amount]);

  return (
    <div>paymentSuccess</div>
  )
}

export default PaymentSuccess