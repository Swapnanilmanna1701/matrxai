import React from 'react';
import styled from 'styled-components';

const ButtonBanner = () => {
  return (
    <StyledWrapper>
      <button className="Btn">
        Introducing MatrX AI For Typing
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    width: 450px;
    height: 50px;
    border: none;
    color: white;
    font-weight: 600;
    font-size: 24px;
    position: relative;
    overflow: hidden;
    border-radius: 40px;
    cursor: pointer;
    background: linear-gradient(-45deg, #6bc5f8, #cf59e6, #6bc5f8, #cf59e6,#66e3ff);
    background-size: 1000% 1000%;
    animation: gradient 5s ease infinite;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.247);
    transition-duration: .1s;
  }
  /* Button's gradient animation */
  @keyframes gradient {
    0% {
      background-position: 0 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }
  /* Effect on Hover*/
  .Btn::before {
    content: "";
    position: absolute;
    width: 200px;
    height: 100%;
    left: -70px;
    top: 0;
    background-color: rgba(214, 199, 255, 0.329);
    filter: blur(10px);
    transition-duration: .3s;
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  .Btn:hover::before {
    transform: translateX(250px);
    transition-duration: .3s;
  }
  /* Effect on click */
  .Btn:active {
    transform: translate(2px,2px);
    transition-duration: .1s;
  }`;

export default ButtonBanner;
