import styled from 'styled-components'
import YouTube from 'react-youtube';

interface AdminYoutubeProps {
   youtubeId: string;
}

const AdminYoutube = ({ youtubeId }: AdminYoutubeProps) => {
   return (
      <Wrapper>
         <YouTube videoId={youtubeId} />
      </Wrapper>
   )
}

export default AdminYoutube

const Wrapper = styled.div`
   width: 70%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   border: 1px solid #dbdbdb;
   padding: 20px;
`
