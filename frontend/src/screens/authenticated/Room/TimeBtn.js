import React from 'react';
import styled from "styled-components";
import { device } from '../../interactive/device';

const Button = styled.button`
  margin-bottom: 2px;
  margin-right: 2px;
  border-radius: 15px;
  padding: 12.5px 0px;
  align-items: center;
  border:${props => (props.time.booked? 'transparent' : props.time.active? "#53990e" :"#f0f7f4")} ;
  width: 24%;
  background-color: ${props => (props.time.team==props.user.team ? (props.time.active? "#FF0000": "#FFFA78") : props.time.booked? "#a8a7a7" : (props.time.active?"#53990e" :"#f0f7f4"))} ;
`;
//https://jsramblings.com/how-to-use-media-queries-with-styled-components/
//https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/responsive-guide
//height 지정???

const Text = styled.text`
  font-weight: 300;
  color: #000000;
  @media ${device.desktop} {
    font-size: 20px;
  }
  @media ${device.desktopL} { 
    font-size: 20px;
  }
  @media ${device.laptop} { 
    font-size: 20px;
  }
  @media ${device.laptopL} { 
    font-size: 20px;
  }
  @media ${device.mobileS} { //작은폰
    font-size: 10px;
  }
  @media ${device.mobileM} { //모바일????
    font-size: 11px;
  }
  @media ${device.mobileL} { //데스크탑
    font-size: 15px;
  }
  
`;
//
const Time = React.memo(function User({ time, onToggle, user }) {
  return (
    <Button time={time} onClick={() => onToggle(time.id)} user={user}>
      {time.booked? time.team : time.time}
    </Button>
  );

});

function TimeBtn({ times, onToggle, user }) {
  return (
    <div>
      {times.map(time => (
        <Time onToggle={onToggle} time={time} key={time.id} user={user}/>
      ))
      }
    </div>
  );
}

export default React.memo(TimeBtn);