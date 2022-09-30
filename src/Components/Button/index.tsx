import React, { useEffect, useState } from 'react';
// import Header from '@layout/header';

import './index.less';

type Props = {
  onTap: Function;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ onTap, children }: Props) => {
  useEffect(() => {}, []);

  return (
    <div
      onClick={e => {
        onTap(e);
      }}
      className="primary-button"
    >
      {children}
    </div>
  );
};

export default Button;
