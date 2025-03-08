import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import styled from "styled-components";

//랜덤 주문번호 생성
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
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
    value: 50_000, //TODO: 바꾸기 (결제 금액)
  });

  useEffect(() => {
    setAmount({
      currency: "KRW",
      value: 50_000, //TODO: 바꾸기 (결제 금액)
    });
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm");
      const widgets = tossPayments.widgets({ customerKey });
      setWidgets(widgets);
    }
    fetchPaymentWidgets();
  }, []);

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
                    orderId: generateRandomString(),
                    orderName: "토스 티셔츠 외 2건", //TODO: 바꾸기 (상품명)
                    customerName: "김토스", //TODO: 바꾸기 (구매자 이름)

                    successUrl: window.location.origin + "/sandbox/success" + window.location.search, //TODO: 바꾸기 (성공 URL)
                    failUrl: window.location.origin + "/sandbox/fail" + window.location.search, //TODO: 바꾸기 (실패 URL)
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