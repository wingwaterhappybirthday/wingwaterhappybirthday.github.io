// import React from 'react';
// import Sound from 'react-sound';
// import backgroundMusic from './audio/login_bgm.mp3';


// const Loginbgm = () => {
//     return (
//         <Sound 
//         url={backgroundMusic} 
//         playStatus={Sound.status.PLAYING} 
//         playFromPosition={200} 
//         loop={true}
//         />
//     );
// };



// ... or using import:
import React from 'react';
import Sound from 'react-sound';
import bgm from './audio/login_bgm.mp3';

class MyComponentWithSound extends React.Component {
  render() {
    return (
    <Sound 
    url={bgm} 
    playStatus={Sound.status.PLAYING} 
    playFromPosition={200} 
    loop={true}
    /> );
  }
}

export default MyComponentWithSound;



