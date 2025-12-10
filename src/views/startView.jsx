import Blur from "react-blur";
import { Button } from "/src/components/button.jsx";
import "/src/style/style.css";
import "/src/style/startPage.css";

export function StartView(props) {
  return ( 
    <Blur img="src/style/backgroundStart.jpg" blurRadius={4} enableStyles className="blur-background"> 
      <div className="page-center">     
        <div className="welcome-container">     
          <div className="welcome-icon">🌿</div>
          <h1 className="welcome-title">Welcome to LeafKeeper!</h1>
          <p className="welcome-text">
            Your digital gardening companion. Search for plants, create 
            collections, and keep track of your plant care schedule.
          </p>

          <Button 
            text="Get Started" 
            onClick={props.onStartClick}
            size="large"
          />
        </div>         
      </div>
    </Blur>
  );
}



























































































