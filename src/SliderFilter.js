import React from "react";
import ReactDOM from "react-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

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
