import { Icon } from '@chakra-ui/react';
import { IconProp } from './icons.props';

const TurkIcon = ({ ...props }: IconProp): JSX.Element => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    zoomAndPan="magnify"
    viewBox="0 0 37.5 37.499999"
    height="30"
    preserveAspectRatio="xMidYMid meet"
    version="1.0"
    {...props}
  >
    <defs>
      <clipPath id="2c6f1e5e80">
        <path
          d="M 2.582031 7.078125 L 34.832031 7.078125 L 34.832031 30.328125 L 2.582031 30.328125 Z M 2.582031 7.078125 "
          clipRule="nonzero"
        />
      </clipPath>
    </defs>
    <g clipPath="url(#2c6f1e5e80)">
      <path
        fill="#e30917"
        d="M 34.816406 26.75 C 34.816406 28.726562 33.214844 30.328125 31.238281 30.328125 L 6.175781 30.328125 C 4.195312 30.328125 2.59375 28.726562 2.59375 26.75 L 2.59375 10.65625 C 2.59375 8.679688 4.195312 7.078125 6.175781 7.078125 L 31.238281 7.078125 C 33.214844 7.078125 34.816406 8.679688 34.816406 10.65625 Z M 34.816406 26.75 "
        fillOpacity="1"
        fillRule="nonzero"
      />
    </g>
    <path
      fill="#eeeeee"
      d="M 16.914062 24.070312 C 13.949219 24.070312 11.546875 21.667969 11.546875 18.703125 C 11.546875 15.742188 13.949219 13.339844 16.914062 13.339844 C 18.089844 13.339844 19.171875 13.71875 20.054688 14.355469 C 18.847656 12.992188 17.089844 12.128906 15.125 12.128906 C 11.492188 12.128906 8.542969 15.074219 8.542969 18.703125 C 8.542969 22.335938 11.492188 25.28125 15.125 25.28125 C 17.089844 25.28125 18.847656 24.414062 20.054688 23.050781 C 19.171875 23.6875 18.089844 24.070312 16.914062 24.070312 Z M 20.417969 18.910156 L 22.601562 19.410156 L 22.800781 21.640625 L 23.953125 19.722656 L 26.136719 20.222656 L 24.664062 18.535156 L 25.816406 16.617188 L 23.753906 17.492188 L 22.285156 15.804688 L 22.480469 18.03125 Z M 20.417969 18.910156 "
      fillOpacity="1"
      fillRule="nonzero"
    />
  </Icon>
);

export default TurkIcon;
