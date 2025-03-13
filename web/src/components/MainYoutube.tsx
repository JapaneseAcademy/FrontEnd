import YouTube from "react-youtube";
import styled from "styled-components";

interface MainYoutubeProps {
   youtubeId: string;
}

const MainYoutube = ({ youtubeId }: MainYoutubeProps) => {
   return (
      <YoutubeContainer>
         <StyledYouTube 
            videoId={youtubeId}
            opts={{ width: "100%", height: "100%" }} 
         />
      </YoutubeContainer>
   )
}

export default MainYoutube

const YoutubeContainer = styled.div`
   width: 100%;
   position: relative;
   padding-top: 56.25%; /* 16:9 비율 유지 (100 / 16 * 9) */
   margin-bottom: 40px;
`;

const StyledYouTube = styled(YouTube)`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
`;
