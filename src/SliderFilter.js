import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const SliderFilter = ({ min, max, handleChange, name }) => {
  return (
    <div>
      {max && (
        <Range
          style={{cursor: 'pointer'}}
          min={min}
          max={max}
          defaultValue={[min, max]}
          handle={value => `${value}`}
          onAfterChange={value => handleChange(value, name)}
        />
      )}
    </div>
  );
};

export default SliderFilter;