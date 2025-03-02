import styled from "styled-components"
import StudentsTable from "./StudentsTable"

const CourseMembers = () => {
   return (
      <Wrapper id='course-members-wrapper'>
         <Title>수강생 목록</Title>
         <StudentsTable />
      </Wrapper>
   )
}

export default CourseMembers

const Wrapper = styled.div`
   width: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border-top: 1px solid #e0e0e0;
`

const Title = styled.div`
   font-size: 1rem;
   font-weight: 600;
   margin-top: 20px;
   margin-bottom: 10px;
   color: #333;
`