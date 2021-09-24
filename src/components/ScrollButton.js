import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import { Button } from './Styles';
  
const ScrollButton = () =>{
  // The button is hidden at the start
  const [visible, setVisible] = useState(false)
  
  // Function to change visibility
  const toggleVisible = () => {
    // To check how much has been scrolled and change visibility accordingly
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };

  // Function to jump to the top
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, //Scroll to top
      behavior: 'smooth' //Change to Auto for sudden jump
    });
  };

  // Check this all the time
  window.addEventListener('scroll', toggleVisible);
  
  // Display button and when click carry out scrollToTop
  return (
    <Button>
     <FaArrowCircleUp onClick={scrollToTop} 
     style={{display: visible ? 'inline' : 'none'}} />
    </Button>
  );
}
  
export default ScrollButton;