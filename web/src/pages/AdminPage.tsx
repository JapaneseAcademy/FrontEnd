import styled from "styled-components"

const AdminPage = () => {
  return (
   <Wrapper>
      <Sidebar>
         <Company>
            <CompanyLogo/>
            <CompanyTitle>
               <span style={{fontSize:'1rem', fontWeight:'bold'}}>예리한 일본어</span>
               <span style={{fontSize:'0.8rem', color:'#333'}}>관리자용</span>
            </CompanyTitle>
         </Company>

         <CategoryContainer>
            <CategoryTitle>회원 관리</CategoryTitle>
            <Items>
               <CategoryItem>- 회원 목록</CategoryItem>
               <CategoryItem>- 회원 등록</CategoryItem>
            </Items>
         </CategoryContainer>
      </Sidebar>

      <Main>

      </Main>
   </Wrapper>
  )
}

export default AdminPage

const Wrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: row;

   width: 100%;
`

const Sidebar = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   background-color: #ffffff;
   width: 20%;
   height: 100vh;
   border-right: 1px solid #e1e1e1;
`

const Company = styled.div`
   width: 85%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
   padding-top: 15px;
   gap: 10px;
   margin-bottom: 20px;
   padding-bottom: 10px;
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
   gap: 10px;
`

const CategoryTitle = styled.div`
   font-size: 0.9rem;
   font-weight: 500;
`

const CategoryItem = styled.div`
   font-size: 0.8rem;
   cursor: pointer;
`

const Items = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
`



const Main = styled.div`
   background-color: #fafafa;
   width: 80%;
   height: 100vh;
`