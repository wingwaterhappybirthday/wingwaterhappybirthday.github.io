import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import $ from 'jquery';
import './Font.css'
import BirthdayCard2023 from './BirthdayCard2023';
import ProgressLine from './ProgressLine';

function Login() {
    const cursorElement = React.useRef(null);

    const handleMouseMove = (e) => {
        const cursor = cursorElement.current;
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    };

    useEffect(() => {
        document.body.style.cursor = 'none';
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.style.cursor = 'auto';
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

  

  $(function() {
    // Vars
    var pointsA = [];
    var pointsB = [];
    var $canvas = null;
    var canvas = null;
    var context = null;
    var points = 8;
    var viscosity = 20;
    var mouseDist = 70;
    var damping = 0.05;
    var showIndicators = false;
    var mouseX = 0;
    var mouseY = 0;
    var relMouseX = 0;
    var relMouseY = 0;
    var mouseLastX = 0;
    var mouseLastY = 0;
    var mouseDirectionX = 0;
    var mouseDirectionY = 0;
    var mouseSpeedX = 0;
    var mouseSpeedY = 0;
  
    /**
     * Get mouse direction
     */
    function mouseDirection(e) {
      if (mouseX < e.pageX)
        mouseDirectionX = 1;
      else if (mouseX > e.pageX)
        mouseDirectionX = -1;
      else
        mouseDirectionX = 0;
  
      if (mouseY < e.pageY)
        mouseDirectionY = 1;
      else if (mouseY > e.pageY)
        mouseDirectionY = -1;
      else
        mouseDirectionY = 0;
  
      mouseX = e.pageX;
      mouseY = e.pageY;
  
      relMouseX = (mouseX - $canvas.offset().left);
      relMouseY = (mouseY - $canvas.offset().top);
    }
    $(document).on('mousemove', mouseDirection);
  
    /**
     * Get mouse speed
     */
    function mouseSpeed() {
      mouseSpeedX = mouseX - mouseLastX;
      mouseSpeedY = mouseY - mouseLastY;
  
      mouseLastX = mouseX;
      mouseLastY = mouseY;
  
      setTimeout(mouseSpeed, 50);
    }
    mouseSpeed();
  
    /**
     * Init button
     */
    function initButton() {
      // Get button
      var button = $('.btn-liquid');
      var buttonWidth = button.width();
      var buttonHeight = button.height();
  
      // Create canvas
      $canvas = $('<canvas></canvas>');
      button.append($canvas);
  
      canvas = $canvas.get(0);
      canvas.width = buttonWidth+100;
      canvas.height = buttonHeight+100;
      context = canvas.getContext('2d');
  
      // Add points
  
      var x = buttonHeight/2;
      for(var j = 1; j < points; j++) {
        addPoints((x+((buttonWidth-buttonHeight)/points)*j), 0);
      }
      addPoints(buttonWidth-buttonHeight/5, 0);
      addPoints(buttonWidth+buttonHeight/10, buttonHeight/2);
      addPoints(buttonWidth-buttonHeight/5, buttonHeight);
      for(var j = points-1; j > 0; j--) {
        addPoints((x+((buttonWidth-buttonHeight)/points)*j), buttonHeight);
      }
      addPoints(buttonHeight/5, buttonHeight);
  
      addPoints(-buttonHeight/10, buttonHeight/2);
      addPoints(buttonHeight/5, 0);
      // addPoints(x, 0);
      // addPoints(0, buttonHeight/2);
  
      // addPoints(0, buttonHeight/2);
      // addPoints(buttonHeight/4, 0);
  
      // Start render
      renderCanvas();
    }
  
    /**
     * Add points
     */
    function addPoints(x, y) {
      pointsA.push(new Point(x, y, 1));
      pointsB.push(new Point(x, y, 2));
    }
  
    /**
     * Point
     */
    function Point(x, y, level) {
      this.x = this.ix = 50+x;
      this.y = this.iy = 50+y;
      this.vx = 0;
      this.vy = 0;
      this.cx1 = 0;
      this.cy1 = 0;
      this.cx2 = 0;
      this.cy2 = 0;
      this.level = level;
    }
  
    Point.prototype.move = function() {
      this.vx += (this.ix - this.x) / (viscosity*this.level);
      this.vy += (this.iy - this.y) / (viscosity*this.level);
  
      var dx = this.ix - relMouseX,
        dy = this.iy - relMouseY;
      var relDist = (1-Math.sqrt((dx * dx) + (dy * dy))/mouseDist);
  
      // Move x
      if ((mouseDirectionX > 0 && relMouseX > this.x) || (mouseDirectionX < 0 && relMouseX < this.x)) {
        if (relDist > 0 && relDist < 1) {
          this.vx = (mouseSpeedX / 4) * relDist;
        }
      }
      this.vx *= (1 - damping);
      this.x += this.vx;
  
      // Move y
      if ((mouseDirectionY > 0 && relMouseY > this.y) || (mouseDirectionY < 0 && relMouseY < this.y)) {
        if (relDist > 0 && relDist < 1) {
          this.vy = (mouseSpeedY / 4) * relDist;
        }
      }
      this.vy *= (1 - damping);
      this.y += this.vy;
    };
  
  
    /**
     * Render canvas
     */
    function renderCanvas() {
      // rAF
      var rafID = requestAnimationFrame(renderCanvas);
  
      // Clear scene
      context.clearRect(0, 0, $canvas.width(), $canvas.height());
      context.fillStyle = '#FFF7FD';
      context.fillRect(0, 0, $canvas.width(), $canvas.height());
  
      // Move points
      for (var i = 0; i <= pointsA.length - 1; i++) {
        pointsA[i].move();
        pointsB[i].move();
      }
  
      // Create dynamic gradient
      var gradientX = Math.min(Math.max(mouseX - $canvas.offset().left, 0), $canvas.width());
      var gradientY = Math.min(Math.max(mouseY - $canvas.offset().top, 0), $canvas.height());
      var distance = Math.sqrt(Math.pow(gradientX - $canvas.width()/2, 2) + Math.pow(gradientY - $canvas.height()/2, 2)) / Math.sqrt(Math.pow($canvas.width()/2, 2) + Math.pow($canvas.height()/2, 2));
  
      var gradient = context.createRadialGradient(gradientX, gradientY, 300+(300*distance), gradientX, gradientY, 0);
      gradient.addColorStop(0, '#fad2ff');
      gradient.addColorStop(1, '#ffe7fa');
  
      // Draw shapes
      var groups = [pointsA, pointsB]
  
      for (var j = 0; j <= 1; j++) {
        var points = groups[j];
  
        if (j == 0) {
          // Background style
          context.fillStyle = '#ffd2d2';
        } else {
          // Foreground style
          context.fillStyle = gradient;
        }
  
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
  
        for (var i = 0; i < points.length; i++) {
          var p = points[i];
          var nextP = points[i + 1];
          var val = 30*0.552284749831;
  
          if (nextP != undefined) {
            // if (nextP.ix > p.ix && nextP.iy < p.iy) {
            //  p.cx1 = p.x;
            //  p.cy1 = p.y-val;
            //  p.cx2 = nextP.x-val;
            //  p.cy2 = nextP.y;
            // } else if (nextP.ix > p.ix && nextP.iy > p.iy) {
            //  p.cx1 = p.x+val;
            //  p.cy1 = p.y;
            //  p.cx2 = nextP.x;
            //  p.cy2 = nextP.y-val;
            // }  else if (nextP.ix < p.ix && nextP.iy > p.iy) {
            //  p.cx1 = p.x;
            //  p.cy1 = p.y+val;
            //  p.cx2 = nextP.x+val;
            //  p.cy2 = nextP.y;
            // } else if (nextP.ix < p.ix && nextP.iy < p.iy) {
            //  p.cx1 = p.x-val;
            //  p.cy1 = p.y;
            //  p.cx2 = nextP.x;
            //  p.cy2 = nextP.y+val;
            // } else {
  
              p.cx1 = (p.x+nextP.x)/2;
              p.cy1 = (p.y+nextP.y)/2;
              p.cx2 = (p.x+nextP.x)/2;
              p.cy2 = (p.y+nextP.y)/2;
  
              context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
            //  continue;
            // }
  
            // context.bezierCurveTo(p.cx1, p.cy1, p.cx2, p.cy2, nextP.x, nextP.y);
          } else {
  nextP = points[0];
              p.cx1 = (p.x+nextP.x)/2;
              p.cy1 = (p.y+nextP.y)/2;
  
              context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
          }
        }
  
        // context.closePath();
        context.fill();
      }
  
      if (showIndicators) {
        // Draw points
        context.fillStyle = '#000';
        context.beginPath();
        for (var i = 0; i < pointsA.length; i++) {
          var p = pointsA[i];
  
          context.rect(p.x - 1, p.y - 1, 2, 2);
        }
        context.fill();
  
        // Draw controls
        context.fillStyle = '#f00';
        context.beginPath();
        for (var i = 0; i < pointsA.length; i++) {
          var p = pointsA[i];
  
          context.rect(p.cx1 - 1, p.cy1 - 1, 2, 2);
          context.rect(p.cx2 - 1, p.cy2 - 1, 2, 2);
        }
        context.fill();
      }
    }
  
    // Init
    initButton();
  });



const [password, setPassword] = useState('');
const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
const [showBirthdayCard2023, setshowBirthdayCard2023] = useState(false);
const [showProgressBar, setShowProgressBar] = useState(false);
const [startTimer, setStartTimer] = useState(false);

useEffect(() => {
  if (startTimer) {
    const timer = setTimeout(() => {
      setshowBirthdayCard2023(true);
      setShowProgressBar(false);
    }, 2000); // Set the time delay in milliseconds (2000ms = 2 seconds)

    return () => {
      clearTimeout(timer); // Clean up the timer if the component unmounts before the delay finishes
    };
  }
}, [startTimer]);

const handlePasswordCheck = (event) => {
  // Replace this with your actual password verification logic
  const correctPassword = 'qqwing0909';
  setPassword(event.target.value)

  if (password === correctPassword) {
    setIsPasswordCorrect(true);
    setShowProgressBar(true);
    setStartTimer(true);
    playLogin();
    playBgm();
  } else {
    setIsPasswordCorrect(false);
  }
};


  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const playBgm = () => {
    const bgm = new Audio('/login_bgm.mp3');
    bgm.loop = true;
    bgm.volume = 0.1;
    bgm.play();
  }

  const playLogin = () => {
    const loginSuccess = new Audio('/login_success.mp3');
    loginSuccess.volume = 0.1;
    loginSuccess.play();
  }

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (isMobile) {
    return (
      <div className="login-container background-image">
      {ReactDOM.createPortal(
            <div className="custom-cursor" ref={cursorElement} />,
            document.body
            )}
        <div className="form-font" style={{textAlign: 'center'}}>
          <h1>Mobile Access Blocked</h1>
          <p>Please access this page from a non-mobile device.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container background-image">
      {ReactDOM.createPortal(
            <div className="custom-cursor" ref={cursorElement} />,
            document.body
            )}
    
  
    {!isPasswordCorrect && (
      <div className='box'>
        <div className='box-inner'>
          <form onSubmit={handleSubmit}>
            <label className='form-font'>
            Your Secret Password: 
            <input type="password" value={password} onChange={handlePasswordCheck} />
            </label>
            <button type="submit" className='btn-liquid' onClick={handlePasswordCheck}> 
              <span className='inner'>
                        Login
              </span>
            </button>
          </form>
        </div>
      </div>
    )}
    {isPasswordCorrect &&
      <div>
        {showProgressBar &&
          <ProgressLine //label={"HI"} 
          visualParts={[
            {
              percentage: "100%",
              color: "#FFEFEF"
            }
          ]}
          style={{zIndex:999, }}
          className="progressbar-container"
          /> }
        {!showProgressBar &&
          <div>
            <div className="info-font">Tap the card to flip.</div>
            <BirthdayCard2023 /> 
          </div>
        } 
      </div>
    }
    </div>
  );
}

export default Login;