import styled from "styled-components"
import { FaRegUser } from "react-icons/fa";
import { FaRegFileVideo } from "react-icons/fa";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginWrapper from "../components/adminComponents/etc/LoginWrapper";

const AdminPage = () => {
   const [isAdminLogin, setIsAdminLogin] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {

   })

   return (
   <Wrapper id='admin-page-wrapper'>
      {/* <AfterLogin>
         <Sidebar id='sidebar'>
            <Company>
               <CompanyLogo/>
               <CompanyTitle>
                  <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>예리한 일본어</span>
                  <span style={{fontSize:'0.8rem', color:'#5d5d5d'}}>관리자용</span>
               </CompanyTitle>
            </Company>

            <CategoryContainer>
               <Category>
                  <CategoryTitle><FaRegUser/>학생 관리</CategoryTitle>
                  <Items>
                     <CategoryItem onClick={()=>navigate('student')}>- 학생 목록</CategoryItem>
                     <CategoryItem onClick={()=>navigate('message')}>- 문자 발송</CategoryItem>
                  </Items>
               </Category>
               <Category>
                  <CategoryTitle><FaRegFileVideo/>수업 관리</CategoryTitle>
                  <Items>
                     <CategoryItem onClick={()=>navigate('course')}>- 수업 목록</CategoryItem>
                  </Items>
               </Category>
               <Category>
                  <CategoryTitle><MdOutlineDesktopWindows/>홈페이지 관리</CategoryTitle>
                  <Items>
                     <CategoryItem onClick={()=>navigate('banner')}>- 홈 배너 변경</CategoryItem>
                     <CategoryItem onClick={()=>navigate('youtube')}>- 대표 유튜브 영상 변경</CategoryItem>
                  </Items>
               </Category>
               <div style={{fontSize:'10px', color:'#b3b3b3'}}>문의 : burittodance@naver.com</div>

            </CategoryContainer>
         </Sidebar>

         <Content>
            <Outlet/>
         </Content>
      </AfterLogin> */}

         <LoginWrapper/>
   </Wrapper>
   )
}

export default AdminPage

const Wrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: row;
   background-color: #f7f7f7;
   width: 100%;
   height: 100%;
`

const Sidebar = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   background-color: #ffffff;
   width: 250px;
   height: 100%;
   border-right: 1px solid #e1e1e1;
   flex-shrink: 0; /* 사이드바 크기가 줄어들지 않도록 설정 */
`


const Company = styled.div`
   width: 85%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
   padding-top: 20px;
   gap: 10px;
   margin-bottom: 20px;
   padding-bottom: 15px;
   border-bottom: 1px solid #e1e1e1;
`

const CompanyLogo = styled.div`
   width: 20px;
   height: 20px;
   background-image: url('/images/hiragana.png');
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;

`

const CompanyTitle = styled.div`
   display: flex;
   flex-direction: column;
`

const CategoryContainer = styled.div`
   width: 85%;
   display: flex;
   flex-direction: column;
   gap: 20px;
`

const Category = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   gap: 8px;

   padding-bottom: 20px;
   border-bottom: 1px solid #e1e1e1;
`

const CategoryTitle = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   gap: 5px;
   font-size: 1rem;
   font-weight: 500;
   margin-bottom: 10px;
`

const CategoryItem = styled.div`

   font-size: 0.9rem;
   cursor: pointer;
   color: #676767;

   &:hover {
      color: #333;
      /* 위로 조금 올라가는 효과 */
      transform: translateX(2px);
   }
   &:active {
      color: #000;
   }
`

const Items = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
`


const Content = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100%;
   padding: 20px;
`

////
const AfterLogin = styled.div`
   display: flex;
   flex-direction: row;
   width: 100%;
   height: 100%;
`

