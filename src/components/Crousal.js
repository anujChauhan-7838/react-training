import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
export default function Crousal(){
    return (
        <Carousel 
        autoPlay={true}
        showIndicators = {false}
        showThumbs = {false}
        infiniteLoop = {true}
        >
            <div>
                <img src={window.location.origin+"/assests/images/slider1.jpg"} style={{height:"400px"}} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
            <img src={window.location.origin+"/assests/images/slider2.jpg"} style={{height:"400px"}} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
            <img src={window.location.origin+"/assests/images/slider3.jpg"} style={{height:"400px"}} />
                <p className="legend">Legend 3</p>
            </div>
            <div>
            <img src={window.location.origin+"/assests/images/slider4.jpg"} style={{height:"400px"}}/>
                <p className="legend">Legend 3</p>
            </div>
            <div>
            <img src={window.location.origin+"/assests/images/slider5.jpg"} style={{height:"400px"}}/>
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );
}