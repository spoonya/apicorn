'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

import { Container } from '../ui';
import { Navigation } from './Navigation';

export const Header = () => {
  const { scrollY } = useScroll();

  const borderColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(226,232,240,1)', 'rgba(226, 232, 240, 0)']
  );
  const blurValue = useTransform(scrollY, [0, 100], [0, 50]);
  const backdropFilterValue = useTransform(
    blurValue,
    (value) => `blur(${value}px)`
  );
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.25)']
  );

  return (
    <motion.header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: backgroundColor,
        backdropFilter: backdropFilterValue,
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
      }}
      className="transition-all duration-300 h-max-[var(--header-height)] h-full"
    >
      <Container>
        <Navigation />
      </Container>
    </motion.header>
  );
};
