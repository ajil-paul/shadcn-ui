import React from 'react';

import { Loader } from 'lucide-react';

import { SpinnerProps } from './types';

export const Spinner = ({ size = 20 }: SpinnerProps) => (
  <Loader className="animate-spin" size={size} />
);
