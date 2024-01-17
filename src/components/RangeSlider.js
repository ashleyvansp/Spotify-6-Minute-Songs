import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import '../styles/RangeSlider.css'

function valuetext(value) {
  return `${value}`;
}

const Input = styled(MuiInput)`
  width: 42px;
`;

const maxPermittedValue = 900;

function RangeSlider({ onChange, durationRange }) {
  const handleChange = (event, newValue) => {
    const [newMin, newMax] = newValue;
    if (newMin < 0) {
        onChange([0, newMax]);
    }
    if (newMax > maxPermittedValue) {
        onChange([newMin, maxPermittedValue]);
    }
    if (newMin > newMax) {
        return;
    }
    else {
        onChange([newMin, newMax]);
    }
  };

  const handleMaxValueChange = (event) => {
    onChange(event.target.value === '' ? [durationRange[0],0] : [durationRange[0],Number(event.target.value)]);
  };

  const handleMinValueChange = (event) => {
    onChange(event.target.value === '' ? [0,durationRange[1]] : [Number(event.target.value),durationRange[1]]);
  };

  const handleBlurMaxValue = () => {
    if (durationRange[1] < 0) {
      onChange([0,durationRange[0]]);
    } else if (durationRange[1]  > maxPermittedValue) {
      onChange([durationRange[0],maxPermittedValue]);
    }
  };

  const handleBlurMinValue = () => {
    if (durationRange[0] < 0) {
      onChange([0,durationRange[1]]);
    } else if (durationRange[0] > maxPermittedValue) {
      onChange([durationRange[1],maxPermittedValue]);
    }
  };

  return (
    <div className='RangeSlider'>
        <Box sx={{ width: 300 }}>
            <Grid container spacing={2} alignItems={"center"}>
                <Grid item>
                    <Input
                        value={durationRange[0]}
                        size="small"
                        onChange={handleMinValueChange}
                        onBlur={handleBlurMinValue}
                        inputProps={{
                        step: 10,
                        min: 0,
                        max: durationRange[1],
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>  
                <Grid item xs>
                    <Slider
                        getAriaLabel={() => 'Song duration'}
                        value={durationRange}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={maxPermittedValue}
                        getAriaValueText={valuetext}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={durationRange[1]}
                        size="small"
                        onChange={handleMaxValueChange}
                        onBlur={handleBlurMaxValue}
                        inputProps={{
                            step: 10,
                            min: durationRange[0],
                            max: maxPermittedValue,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>                                     
            </Grid>
        </Box>
    </div>
  );
}

export default RangeSlider