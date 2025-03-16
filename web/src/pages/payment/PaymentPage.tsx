import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getOrderId } from "../../apis/paymentAPI";


const customerKey = "user_1234";

type Amount = {
   currency: string;
   value: number;
};

const PaymentPage = () => {
   const [ready, setReady] = useState<boolean>(false);
   const [widgets, setWidgets] = useState<any>(null);
   const [amount, setAmount] = useState<Amount>({
      currency: "KRW",
      value: 0, //TODO: 바꾸기 (결제 금액)
   });
   const [orderId, setOrderId] = useState<string | null>(null);

   //url에서 결제정보 받아오기
   const url = new URL(window.location.href);
   const timeTableId = url.searchParams.get("timeTableId");
   const courseType = url.searchParams.get("courseType");
   const courseTitle = url.searchParams.get("courseTitle");
   const coursePrice = parseInt(String(url.searchParams.get("coursePrice")));

   useEffect(() => {
      // 백엔드에서 orderId를 받아오기
      getOrderId(parseInt(String(timeTableId))).then((orderId) => {
         setOrderId(orderId);
      });
   }
   , [timeTableId, courseType, courseTitle, coursePrice]);
   //orderId 확인 
   useEffect(() => {
      console.log("orderId : ", orderId);
   }
   , [orderId]);

   useEffect(() => {
      setAmount({
         currency: "KRW",
         value: coursePrice,
      });
      async function fetchPaymentWidgets() {
         const tossPayments = await loadTossPayments(import.meta.env.VITE_TOSSPAYMENTS_CLIENT_KEY_TEST);
         const widgets = tossPayments.widgets({ customerKey });
         setWidgets(widgets);
      }
      fetchPaymentWidgets();
   }, [coursePrice]);

   useEffect(() => {

      async function renderPaymentWidgets() {
         if (widgets == null) {
         return;
         }

         await widgets.setAmount(amount);

         await Promise.all([
         widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
         }),
         widgets.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
         }),
         ]);

         setReady(true);
         console.log(ready); //TODO: 이거 어디에 쓰이는ㅣㅣㅈ..?
      }

      renderPaymentWidgets();
   }, [widgets, amount]);

   return (
         <Wrapper>
         <Container>
         <PaymentMethod id="payment-method" />
         <Agreement id="agreement" />
         <ButtonWrapper>
               <Button
               onClick={async () => {
               try {
                     await widgets?.requestPayment({
                     orderId: orderId, //TODO: 바꾸기 (주문번호)
                     orderName: courseTitle, //TODO: 바꾸기 (상품명)
                     // customerName: "김토스", //TODO: 바꾸기 (구매자 이름)

                     successUrl: window.location.origin + "/payment/loading" + window.location.search, //TODO: 바꾸기 (성공 URL)
                     failUrl: window.location.origin + "/payment/failure" + window.location.search, //TODO: 바꾸기 (실패 URL)
                     // cancelUrl: window.location.origin + "/sandbox/cancel" + window.location.search, //TODO: 바꾸기 (취소 URL)
                     });
               } catch (error) {
                     // TODO: 에러 처리
                     console.error(error);
               }
               }}
               >
               결제하기
               </Button>
         </ButtonWrapper>
         </Container>
         </Wrapper>
   );
};

export default PaymentPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 6rem;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentMethod = styled.div`
  width: 100%;
`;

const Agreement = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 90%;
  padding: 1rem;
  background-color: #0074e4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #005bb5;
  }
`;