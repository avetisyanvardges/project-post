import React from 'react';
import SvgIcon from './SvgIcon';
import Svgs from '../../assets/icons/svgs';

const Icon = ({size, ...props}) => {
  return <SvgIcon {...props} height={size} width={size} svgs={Svgs} />;
};

export default Icon;
