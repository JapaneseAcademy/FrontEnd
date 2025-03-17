import styled from "styled-components";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;


}

const AddTimeTableModal = ({ isOpen, onClose}: ModalProps) => {


   if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링 안 함

   return (
      <Overlay onClick={onClose}>
         <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={onClose}>&times;</CloseButton>

            {/* 모달 내용 */}

         </ModalContainer>
      </Overlay>
   );
};

export default AddTimeTableModal;

const Overlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ModalContainer = styled.div`
   background: white;
   padding: 20px;
   border-radius: 10px;
   min-width: 300px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
   position: relative;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   gap: 20px;

   /* max-height: 80vh; */
   width: 80%;
   height: 80%;
`;

const CloseButton = styled.button`
   position: absolute;
   top: 10px;
   right: 15px;
   font-size: 1.5rem;
   border: none;
   background: none;
   cursor: pointer;
`;
