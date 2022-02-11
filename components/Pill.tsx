import React from 'react';
import type { NextPage } from 'next';

const Pill: NextPage<{
  label: string;
}> = ({ label }) => {
  return <span className="tag">{label}</span>;
};

export default Pill;
