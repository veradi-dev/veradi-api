import React from 'react';
import styled from "styled-components";

const Button = styled.button`
  margin-bottom: 5px;
  border-radius: 32px;
  padding: 12.5px 0px;
  align-items: center;
  width: 25%;
  background-color: ${props => (props.time.booked? "#808080" : props.time.active? "#3CFBFF" :"#FFFFFF")} ;
`;

const Text = styled.text`
  font-weight: 600;
  font-size: 16px;
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