import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '../hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const baseClass =
    type === 'title'
      ? 'text-2xl font-bold leading-8'
      : type === 'defaultSemiBold'
        ? 'text-base font-semibold leading-6'
        : type === 'subtitle'
          ? 'text-lg font-bold'
          : 'text-base leading-6';

  const linkClass = type === 'link' ? 'text-base leading-7' : '';

  return (
    <Text className={`${baseClass} ${linkClass} ${className ?? ''}`} style={[{ color }, style]} {...rest} />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
