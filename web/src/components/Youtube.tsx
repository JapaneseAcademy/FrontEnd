import styled from 'styled-components'

const Youtube = () => {
   return (
   <VideoWrapper>
   <iframe
      src="https://www.youtube.com/embed/8cFNCYoUsuk?si=BRVYnTucQNXI21HP"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
   ></iframe>
   </VideoWrapper>
   )
}

export default Youtube

const VideoWrapper = styled.div`
   position: relative;
   width: 100%;
   padding-bottom: 56.25%; /* 16:9 비율 */
   height: 0;
   iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
   }
`;