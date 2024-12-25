import { StyleSheet } from 'react-native'

export const Gradients = {
  orangeGradient: {
    colors: ['#F0C735', '#EF9B38'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  yellowGradient: {
    colors: ['#F0C735', '#EF9B38'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  expoYellowGradient: {
    colors: ['#FFD700', '#FFA500'] as [string, string],

    start: { x: 0, y: 0 },

    end: { x: 1, y: 1 },
  },
}

export const FontSizes = {
  fs14: 14,
  fs16: 16,
  fs17: 17,
  fs18: 18,
  fs20: 20,
  fs32: 32,
  fs36: 36,
}

export const LineHeights = {
  lh18: 18,
  lh21: 21,
  lh40: 40,
  lh125: 125,
}

export const BorderRadii = {
  br8: 8,
  br10: 10,
}

export const Spacing = {
  mr6: 6,
  mr8: 8,
}

export const Shadows = {
  s10: {
    boxShadow: `0 0 10 1 rgba(0, 0, 0, 0.3)`,
  },
}

export const Fonts = StyleSheet.create({
  Inter_300Light: {
    fontFamily: 'Inter_300Light',
  },
  Regular14: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  Regular18: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 18,
  },
  Medium18: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 18,
  },
  SemiBold18: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  Bold14: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    lineHeight: 18,
  },
  Bold18: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    lineHeight: 18,
  },
  Regular20: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 20,
  },
  Medium20: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    lineHeight: 20,
  },
  SemiBold20: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 20,
  },
  Bold20: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    lineHeight: 20,
  },
  Regular22: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    lineHeight: 22,
  },
  Medium22: {
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    lineHeight: 22,
  },
  SemiBold22: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    lineHeight: 22,
  },
  Bold22: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    lineHeight: 22,
  },
  Regular24: {
    fontFamily: 'Inter_400Regular',
    fontSize: 20,
    lineHeight: 24,
  },
  Medium24: {
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
    lineHeight: 24,
  },
  SemiBold24: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    lineHeight: 24,
  },
  Bold24: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    lineHeight: 24,
  },
  Regular28: {
    fontFamily: 'Inter_400Regular',
    fontSize: 24,
    lineHeight: 28,
  },
  Medium28: {
    fontFamily: 'Inter_500Medium',
    fontSize: 24,
    lineHeight: 28,
  },
  SemiBold28: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 28,
  },
  Bold28: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    lineHeight: 28,
  },
  Regular32: {
    fontFamily: 'Inter_400Regular',
    fontSize: 28,
    lineHeight: 32,
  },
  Medium32: {
    fontFamily: 'Inter_500Medium',
    fontSize: 28,
    lineHeight: 32,
  },
  SemiBold32: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 28,
    lineHeight: 32,
  },
  Bold32: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    lineHeight: 32,
  },
  Regular36: {
    fontFamily: 'Inter_400Regular',
    fontSize: 32,
    lineHeight: 36,
  },
  Medium36: {
    fontFamily: 'Inter_500Medium',
    fontSize: 32,
    lineHeight: 36,
  },
  SemiBold36: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 32,
    lineHeight: 36,
  },
  Bold36: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    lineHeight: 36,
  },
  Regular40: {
    fontFamily: 'Inter_400Regular',
    fontSize: 36,
    lineHeight: 40,
  },
  Medium40: {
    fontFamily: 'Inter_500Medium',
    fontSize: 36,
    lineHeight: 40,
  },
  SemiBold40: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 36,
    lineHeight: 40,
  },
  Bold40: {
    fontFamily: 'Inter_700Bold',
    fontSize: 36,
    lineHeight: 40,
  },
  Montserrat_300Light: {
    fontFamily: 'Montserrat_300Light',
  },
  Montserrat_600SemiBold: {
    fontFamily: 'Montserrat_600SemiBold',
  },
  Urbanist_400Regular: {
    fontFamily: 'Urbanist_400Regular',
    lineHeight: 24,
    fontSize: 16,
    letterSpacing: 0.15,
  },
})
