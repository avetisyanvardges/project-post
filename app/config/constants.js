import {Dimensions, Platform} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {colors} from './theme';

export const PAGING_CONFIG_LIMIT = {
  following: 30,
  followers: 30,
  listThread: 20,
  listMessage: 20,
  savedPosts: 12,
};

export const PADDING_CONSTANT = {
  paddingBase: 8,
  paddingMedium: 12,
  paddingLarge: 16,
};

export const DATE_TIME_FORMAT = {
  timeDateOfWeek: 'dddd LT',
  monthDayTime: 'MMM DD, LT',
  time: 'LT',
};

export const USER_TEST_ID = [
  '20210006',
  '20210007',
  '20210008',
  '20210009',
  '20210010',
  '20210011',
  '20210012',
  '20210013',
];

export const CONTENT_SPACING = 15;

export const MAX_ZOOM_FACTOR = 20;

const metrics = {
  top: initialWindowMetrics?.insets?.top || 0,
  left: initialWindowMetrics?.insets?.left || 0,
  right: initialWindowMetrics?.insets?.right || 0,
  bottom: initialWindowMetrics?.insets?.bottom || 0,
};

const SAFE_BOTTOM =
  Platform.select({
    ios: metrics.bottom,
  }) ?? 0;

//Search Constants
const searchHeaderHeight = 70;
export const SEARCH_CONSTANTS = {
  //Variable
  iconSize: 18, //Search Bar Icons
  headerHeight: searchHeaderHeight,
  inputWidth: Dimensions.get('window').width * 0.95,
  contentSpacing: CONTENT_SPACING * 2,
  //Search Bar Styling
  searchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: searchHeaderHeight,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  searchInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightCharcoal,
    //borderWidth: 1,
    //borderColor: colors.blue,
    height: 46,
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 46 / 2,
  },
  iconGroup: {
    padding: 10,
    width: 85,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
  },
  iconRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  iconDivider: {
    width: 1,
    height: 26,
    backgroundColor: '#bbb',
  },
  //Recent and Recommended Search Tile Styles
  searchTileTitle: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
  searchTileSubTitle: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '300',
    marginTop: 4,
  },
  contentMargin: {marginLeft: 30},
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rowItem: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
};

export const EVENT_NAME = {
  sendMessage: 'sendMessage',
  deleteMessage: 'deleteMessage',
  showAction: 'showAction',
  reaction: 'reaction',
  reloadThread: 'reloadThread',
  reloadListThread: 'reloadListThread',
};
//Navigation Constants
export const NAV_CONSTANTS = {
  bottomNavBarHeight: 50,
  topNavBarHeight: 45,
};

//Camera Constants
export const CAMERA_CONSTANTS = {
  contentSpacing: CONTENT_SPACING * 2,
  safeAreaPadding: {
    paddingLeft: metrics.left + CONTENT_SPACING,
    paddingTop: metrics.top + CONTENT_SPACING,
    paddingRight: metrics.right + CONTENT_SPACING,
    paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
    processingPadding: metrics.top + 10,
  },
  // The maximum zoom _factor_ you should be able to zoom in
  maxZoomFactor: 20,
  screenWidth: Dimensions.get('window').width,
  screenHeight: Platform.select({
    android: Dimensions.get('screen').height - metrics.bottom,
    ios: Dimensions.get('window').height,
  }),
  // Capture Button
  captureButtonSize: 78,
};
