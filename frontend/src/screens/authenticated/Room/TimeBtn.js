import React from 'react';
import styled from "styled-components";

const Button = styled.button`
  margin-bottom: 2px;
  margin-right: 2px;
  border-radius: 15px;
  padding: 12.5px 0px;
  align-items: center;
  border:${props => (props.time.booked? 'transparent' : props.time.active? "#53990e" :"#f0f7f4")} ;
  width: 24%;
  background-color: ${props => (props.time.booked? "#a8a7a7" : props.time.active? "#53990e" :"#f0f7f4")} ;
`;


//https://jsramblings.com/how-to-use-media-queries-with-styled-components/
//https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/responsive-guide
const Text = styled.text`
  font-weight: 600;
  
  font-size: 11px;
  color: #000000
`;
//
const Time = React.memo(function User({ time, onToggle }) {
  return (
    <Button time={time} onClick={() => onToggle(time.id)}>
      <Text>
      {time.booked? time.team : time.time}
      </Text>
    </Button>
  );

});

function TimeBtn({ times, onToggle }) {
  return (
    <div>
      {times.map(time => (
        <Time onToggle={onToggle} time={time} key={time.id} />
      ))}
    </div>
  );
}

export default React.memo(TimeBtn);