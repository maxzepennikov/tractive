import './BarIndicator.css';
import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

function BarIndicator({name, weight, ranging, step}) {

    const barHeight = 30;
    let marginGap = 2;

    let maxVal = ranging[ranging.length - 1]['max'];
    let prevVal = 0;
    let left = weight * 100 / maxVal;
    const [marginGapStep, setMarginGapStep] = useState(0);
    const [minLeft, setMinLeft] = useState(0);
    const [maxLeft, setMaxLeft] = useState(0);
    const elemBar = useRef(null);

    ranging.forEach(segment => {
        segment.min = prevVal === 0 ? 0 : prevVal + step;
        segment.width = (segment.max - prevVal) * 100 / maxVal;
        prevVal = segment.max;
    });

    const rangingBar = ranging.map(
        segment =>
            <div
                key={segment.max}
                className="bar__segment"
                style={{flex: `1 1 ${segment.width}%`, background: weight >= segment.min && weight <= segment.max ? segment.color : '#c4c4c4'}}
            />
    );

    const rangingName = ranging.map(
        segment =>
            <div
                key={segment.name}
                className="names__name"
                style={{flex: `0 0 calc(${segment.width}% - 10px)`}}
            >
                {segment.name}
            </div>
    );

    useEffect(() => {
        let min = (barHeight/3)*100/elemBar.current.clientWidth;
        setMinLeft(min);
        setMaxLeft(100 - min);
        setMarginGapStep((marginGap/2)*100/elemBar.current.clientWidth);
    }, [])

    const position = () => {
        if (left < minLeft) {
            return minLeft;
        }
        if (left > maxLeft) {
            return maxLeft;
        }
        let sum = 0;
        ranging.forEach(segment => {
            sum += segment.width;
            if (left > sum-marginGapStep && left < sum+marginGapStep) {
                if (left > sum) {
                    left = sum + marginGapStep;
                } else {
                    left = sum - marginGapStep;
                }
            }
        })
        return left;
    }

    return (
        <div className="barIndicator">
            <div className="barIndicator__name">{name}'s BMI is</div>
            <div className="barIndicator__weight">{weight}</div>
            <div className="barIndicator__bar">
                <div className="triangleWrap">
                    <div className="triangleWrap__triangle" style={{left: `${position()}%`}}>
                        <div className="triangle-bg-xxs"/>
                    </div>
                </div>
                <div className="bar" style={{ borderRadius: `${barHeight}px`, height: `${barHeight}px`}} ref={elemBar}>
                    {rangingBar}
                </div>
                <div className="names">
                    {rangingName}
                </div>
            </div>
        </div>
    );
}

BarIndicator.defaultProps = {
    step: 0.01
};

BarIndicator.propTypes = {
    name: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    ranging: PropTypes.array.isRequired,
    step: PropTypes.number,
};

export default BarIndicator;
