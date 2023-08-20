import React, { useState } from 'react';
import { Range, getTrackBackground  } from 'react-range';

const DoubleRangeSlider = ({ values, onChange }) => {

  const handleChange = (newValues) => {
    onChange(newValues);
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Range
        values={values}
        step={1}
        min={1890}
        max={new Date().getFullYear()}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              
              display: 'flex',
              width: '80%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#548BF4', '#ccc'],
                  min: 0,
                  max: 100
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '16px',
              width: '16px',
              borderRadius: '50%',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                height: '5px',
                width: '5px',
                backgroundColor: '#548BF4'
              }}
            />
          </div>
        )}
      />
    </div>
    <div  id="output">
        <p>{values[0]}</p>
        <p>{values[1]}</p>
      </div>
    </>
  );
};

export default DoubleRangeSlider;
