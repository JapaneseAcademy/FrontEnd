import { useState } from "react";
import styled from "styled-components";

const CourseDetailPage = () => {
  const [selectedOption, setSelectedOption] = useState("detail");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Wrapper>
        <CourseImage src="/images/courseBanner/courseBanner1.png" alt="Course Image" />
        <CourseTitle>[기초문법+회화] 원샷반</CourseTitle>
        <CoursePrice>130,000원</CoursePrice>

        <OptionContainer>
          <Option
            selected={selectedOption === "detail"}
            onClick={() => handleOptionClick("detail")}
          >
            상세정보
          </Option>
          <Option
            selected={selectedOption === "review"}
            onClick={() => handleOptionClick("review")}
          >
            수강후기
          </Option>
        </OptionContainer>
      </Wrapper>

      {/* 하단 고정 버튼 */}
      <FixedButtonContainer>
        <CartButton id="cart_btn">장바구니</CartButton>
        <BuyButton id="buy_btn">구매하기</BuyButton>
      </FixedButtonContainer>
    </>
  );
};

export default CourseDetailPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px; /* 고정 버튼 위로 내용이 가리지 않도록 여백 추가 */
`;

const CourseImage = styled.img`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CourseTitle = styled.div`
  width: 90%;
  font-size: 18px;
`;

const CoursePrice = styled.div`
  width: 90%;
  font-size: 16px;
  font-weight: 300;
  margin-top: 10px;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  background-color: #fff; /* 버튼 배경 */
  padding: 10px 0;
  box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.05);
  z-index: 1000; /* 버튼이 항상 위에 보이도록 설정 */
`;

const CartButton = styled.button`
  width: 45%;
  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const BuyButton = styled.button`
  width: 45%;
  background-color: #402900;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #301d00;
  }
`;

const OptionContainer = styled.div`
  width: 90%;
  display: flex;
  height: 50px;
  margin-top: 60px;
  border: 1px solid #d3d3d3;
`;

const Option = styled.div<{ selected: boolean }>`
  width: 50%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 16px;
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#333" : "#d3d3d3")};
  font-weight: ${({ selected }) => (selected ? "600" : "400")};
  border-bottom: ${({ selected }) => (selected ? "2px solid #333" : "none")};

  &:hover {
    color: #000;
  }

  &:first-child {
    border-right: 1px solid #d3d3d3;
  }
`;
