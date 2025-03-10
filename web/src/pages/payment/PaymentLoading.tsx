
import styled from "styled-components"
import Loading from "../../components/Loading";
import { useEffect } from "react";
import { convertCategoryToEng } from "../../utils/utils";
import { assignCourse } from "../../apis/paymentAPI";

const PaymentLoading = () => {
   const url = new URL(window.location.href);
   const paymentKey = url.searchParams.get("paymentKey");
   const orderId = url.searchParams.get("orderId");
   const timeTableId = parseInt(String(url.searchParams.get("timeTableId")));
   const category = convertCategoryToEng(url.searchParams.get("category"));
   const amount = parseInt(String(url.searchParams.get("amount")));
   const courseInfoId = Number(url.searchParams.get("courseInfoId"));

   //백엔드에 결제 승인 요청
   //결제 승인이 완료되면 PaymentSuccess로 이동
   useEffect(() => {

      assignCourse(timeTableId, category, amount, paymentKey, orderId, courseInfoId).then((status) => {
         if (status === 201) {
            // window.location.href = "/payment/success";
            alert("강의 결제가 완료되었습니다. 마이페이지에서 확인해주세요.");
            window.location.href = "/mypage";
         } 
         //TODO: 실제 배포에서는 한번만 실행되니까, 이거 주석 풀어야함
         // else {
         //    window.location.href = "/payment/failure";
         // } 
      }
      );
   }, [timeTableId, category, amount, paymentKey, orderId]);

   return (
      <Wrapper>
         <Loading />  
         {courseInfoId}
      </Wrapper>

   )
}

export default PaymentLoading

const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding-bottom: 1000px;
`;