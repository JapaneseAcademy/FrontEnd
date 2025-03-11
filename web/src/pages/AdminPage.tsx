import styled from "styled-components"
import { FaRegUser } from "react-icons/fa";
import { FaRegFileVideo } from "react-icons/fa";
import { MdOutlineDesktopWindows, MdOutlineRateReview } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminLogin } from "../apis/adminAPI/adminLoginAPI";
import { useSetRecoilState } from "recoil";
import { loadingAtom } from "../recoil/loadingAtom";

const AdminPage = () => {
   const location = useLocation();
   const [selectedItem, setSelectedItem] = useState<string>('student');
   const setIsLoading = useSetRecoilState(loadingAtom);

   const navigate = useNavigate();

   const handleItemClick = (path: string) => {
      navigate(path);
      setSelectedItem(path);
   }

   useEffect(() => {
      //url에서 code 따서 백으로 post api
      //code가 없으면 로그인 페이지로 이동
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
         adminLogin(code, navigate, setIsLoading);
      }

      //selectedItem에 따라서 해당 페이지로 이동
      if (location.pathname === '/admin/student') {
         setSelectedItem('student');
      } else if (location.pathname === '/admin/message') {
         setSelectedItem('message');
      } else if (location.pathname === '/admin/courseInfo') {
         setSelectedItem('courseInfo');
      } else if (location.pathname === '/admin/timetables') {
         setSelectedItem('timetables');
      } else if (location.pathname === '/admin/mainReviews') {
         setSelectedItem('mainReviews');
      } else if (location.pathname === '/admin/courseReviews') {
         setSelectedItem('courseReviews');
      } else if (location.pathname === '/admin/youtube') {
         setSelectedItem('youtube');
      }
   }, [location.pathname])
   


   return (
   <Wrapper id='admin-page-wrapper'>
      <AfterLogin>
         <Sidebar id='sidebar'>
            <Company onClick={() => navigate('/admin')}>
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
                     <CategoryItem $isselected={selectedItem === 'student'} onClick={() => handleItemClick('student')}>- 학생 목록</CategoryItem>
                     <CategoryItem $isselected={selectedItem === 'message'} onClick={() => handleItemClick('message')}>- 문자 발송</CategoryItem>
                  </Items>
               </Category>
               <Category>
                  <CategoryTitle><FaRegFileVideo/>강의 관리</CategoryTitle>
                  <Items>
                     <CategoryItem $isselected={selectedItem === 'courseInfo'} onClick={() => handleItemClick('courseInfo')}>- 강의 관리</CategoryItem>
                     <CategoryItem $isselected={selectedItem === 'timetables'} onClick={() => handleItemClick('timetables')}>- 분반 목록</CategoryItem>
                  </Items>
               </Category>
               <Category>
                  <CategoryTitle><MdOutlineRateReview/>후기 관리</CategoryTitle>
                  <Items>
                     <CategoryItem $isselected={selectedItem === 'mainReviews'} onClick={() => handleItemClick('mainReviews')}>- 후기 목록</CategoryItem>
                  </Items>
               </Category>
               <Category>
                  <CategoryTitle><MdOutlineDesktopWindows/>홈페이지 관리</CategoryTitle>
                  <Items>
                     <CategoryItem $isselected={selectedItem === 'youtube'} onClick={() => handleItemClick('youtube')}>- 대표 유튜브 영상 변경</CategoryItem>
                  </Items>
               </Category>
               <div style={{fontSize:'10px', color:'#b3b3b3'}}>문의 : burittodance@naver.com</div>

            </CategoryContainer>
         </Sidebar>

         <Content>
            <Outlet/>
         </Content>
      </AfterLogin>
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

   cursor: pointer; //{todo: 삭제}
`

const CategoryContainer = styled.div`
   width: 85%;
   display: flex;
   flex-direction: column;
   gap: 20px;
`

const Category = styled.div`
   width: 100%;
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
const CategoryItem = styled.div<{ $isselected: boolean }>`
   font-size: 0.9rem;
   cursor: pointer;
   color: ${({ $isselected }) => ($isselected ? "#333" : "#676767")};
   font-weight: ${({ $isselected }) => ($isselected ? "500" : "normal")};
   padding: 5px 10px;
   border-radius: 4px;
   background-color: ${({ $isselected }) => ($isselected ? "#eaeaea" : "transparent")};

   &:hover {
      color: #333;
      transform: translateX(2px);
   }
   &:active {
      color: #000;
   }
`;

const Items = styled.div`
   width: 100%;
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

