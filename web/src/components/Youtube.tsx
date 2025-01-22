import styled from 'styled-components'

const Youtube = () => {
   return (
      <>
   <Video>
   <iframe
      src="https://www.youtube.com/embed/8cFNCYoUsuk?si=BRVYnTucQNXI21HP"
      title="Youtube1"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
   ></iframe>
   </Video>

      </>
   )
}

export default Youtube

const Video = styled.div`
   position: relative;
   width: 100%;
   padding-bottom: 56.25%; /* 16:9 비율 */
   height: 0;
   margin-bottom: 60px;

   iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
   }
`;