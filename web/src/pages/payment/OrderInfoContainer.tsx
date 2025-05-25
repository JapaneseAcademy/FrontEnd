import styled from "styled-components"
import { numberWithCommas, reverseCourseType } from "../../utils/utils";

interface OrderInfoContainerProps {
   courseTitle: string|null;
   courseDate: string;
   timeTables: string|null;
   courseType: string|null;
   coursePrice: number;
   userInfo: UserInfo|null;
}

type UserInfo = {
   id: number;
   name: string;
   phone: string;
   birth: string;
}

const OrderInfoContainer = ({courseTitle, courseDate, timeTables, courseType, coursePrice, userInfo}: OrderInfoContainerProps) => {

   return (
      <Wrapper>
         <Title>결제 정보</Title>
         <div style={{color:'#999', fontSize:'15px'}}>결제 정보를 꼭 확인한 후 결제해주세요!</div>
         <OrderInfos>
            <InfoRow>
               <InfoTitle>강의명</InfoTitle>
               <InfoContent style={{textDecoration:'underline'}}>{courseTitle}</InfoContent>
            </InfoRow>
            <InfoRow>
               <InfoTitle>강의 일시</InfoTitle>
               <InfoContent>{courseDate}</InfoContent>
            </InfoRow>
            <InfoRow>
               <InfoTitle>분반</InfoTitle>
               <InfoContent>
                  {timeTables}
               </InfoContent>
            </InfoRow>
            <InfoRow>
               <InfoTitle>강의유형</InfoTitle>
               <InfoContent>{reverseCourseType(courseType)}</InfoContent>
            </InfoRow>
            <InfoRow>
               <InfoTitle>주문금액</InfoTitle>
               <InfoContent style={{fontWeight:'bold'}}>{numberWithCommas(coursePrice)} 원</InfoContent>
            </InfoRow>

            {/* 주문자 정보 */}
            <InfoRow style={{borderTop:'1px solid #ddd', paddingTop:'20px'}}>
               <InfoTitle>[ 주문자 정보 ]</InfoTitle>
            </InfoRow>
            <InfoContent style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
                  <div>{userInfo?.name}</div>
                  <div>{userInfo?.phone}</div>
               </InfoContent>
         </OrderInfos>
      </Wrapper>
   )
}

export default OrderInfoContainer

const Wrapper = styled.div`
   width: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding: 30px 0;
   color: #333;

   border-bottom: 1px solid #ddd;
   /* border: 1px solid black; */
`

const Title = styled.div`
   width: 100%;
   text-align: center;
   font-size: 20px;
   font-weight: bold;
   margin-bottom: 5px;
   
`

const OrderInfos = styled.div`
   width: 90%;
   display: flex;
   flex-direction: column;
   gap: 35px;
   margin-top: 40px;
`

const InfoRow = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
`

const InfoTitle = styled.div`
   font-size: 16px;
   font-weight: bold;
`

const InfoContent = styled.div`
   font-size: 16px;
   color: #666;
`