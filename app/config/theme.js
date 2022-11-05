export const colors = {
  black: "#000",
  white: "#ffffff",
  lightBlue: "#aee4fc", //HyperText & Save
  blue: "#14aef2", //App Blue
  loopBlue: "#3aabe1", //Logo
  darkBlue: "#0884C0",
  lightCharcoal: "#343434",
  midCharcoal: "#282727",
  charcoal: "#222222",
  darkCharcoal: "#1C1B1B",
  silver: "#D9D9D9",
  lightGrey: "#888C8C",
  grey: "#707070",
  darkGrey: "#3A3B3C", //Share Search
  red: "#FF3342", //Deletions & Like
};

export const test = {
  primary: "#fc5c65",
  secondary: "#4ecdc4",
  primary: "#fc5c65",
  secondary: "#4ecdc4",
  maroon: "#F67568",
  orange: "#FF5733",
  yellow: "#FFF633",
  green: "#4FFF33",
  pink: "#FF33FC",
  medium: "#6e6969",
  light: "#f8f4f4",
  dark: "#0c0c0c",
  danger: "#ff5252",
};

export const theme = {
  separator: { color: "#ffffff50", margin: "4%" },

  activityIndicator: { color: "#ffffff70" },
  topBar: {
    fontSize: 20,
    titlePadding: 10,
    titleWeight: "600",
    borderColor: "#ffffff50",
    margin: "2.5%",
  },
  spacing: {
    gutter: 40,
    header: 10,
  },
  container: {
    padding: 10,
    margin: 15,
  },
  avatar: {
    xs: 32,
    ms: 42,
    os: 52,
    sm: 62,
    md: 75,
    lg: 100,
  },
  backgroundColor: colors.darkCharcoal,
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 6,
    backgroundColor: colors.lightCharcoal,
    lineColor: "#ffffff50",
    textColor: colors.white,
    placeholderColor: "#ffffff50",
  },
  label: {
    fontSize: 16,
  },
  messaging: {
    recipBackground: colors.grey,
    authBackground: colors.blue,
  },
  modal: {
    borderRadius: 6,
    themeBlue: colors.blue,
    backgroundOverlay: "#00000070",
    overlayOpacity: "0.7",
    textColor: colors.white,
    subTextColor: colors.lightGrey,
    backgroundColor: colors.charcoal,
    separatorColor: "#ffffff50",
    selectBackgroundColor: colors.charcoal,
    warningColor: colors.red,
  },
  padding: {
    paddingBase: 8,
    paddingMedium: 12,
    paddingLarge: 16,
  },
  text: {
    primary: colors.white,
  },
  cards: {
    post: {
      widthRatio: 3,
      heightRatio: 1.75,
    },
  },
};

export const icon = {
  opacity: {
    light: 0.5,
    medium: 0.75,
    heavy: 0.85,
  },
};

export const shadows = {
  text: {
    backgroundColor: "transparent",
    textShadowColor: colors.charcoal,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
};
