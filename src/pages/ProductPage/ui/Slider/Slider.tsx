import 'react-awesome-slider/dist/styles.css';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import AwesomeSlider from 'react-awesome-slider';

import cls from './Slider.module.scss';

type SliderProps = {
  className?: string;
  images: string[];
}

const Slider: FC<SliderProps> = ({ className, images }) => {
  if (images.length < 2) {
    return (
      <div className={className}>
        <div className={cls.Slider__img} style={{ 'backgroundImage': `url(${images[0]})` }}></div>
      </div>
    );
  } else {
    return (
      <div className={className}>
        <AwesomeSlider className={cls.Slider__slider}>
          {
            images.map(image => (
              <div key={image} data-src={image} />
            ))
          }
        </AwesomeSlider>
      </div>
    );
  }
};

export default observer(Slider);
