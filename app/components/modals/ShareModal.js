import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Modal,
  Share,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PropTypes from "prop-types";
//Global Context
import { AuthContext } from "../../config/context";
//Data Displays
import Icon from "../svgIcons/Icon";
import ShareTile from "./modalTiles/ShareTile";
import AppText from "../dataDisplays/AppText";
//Theme Constants
import { colors, theme, input } from "../../config/theme";
//Queries
import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
import { USER, FOLLOWING_LIST } from "../../services/graphql/userQueries";
import { POST } from "../../services/graphql/postQueries";
import { SHARE_POST } from "../../services/graphql/directMessagingMutations";

function ShareModal({
  isShareVisible,
  setIsShareVisible,
  handleShareSuccess,
  handleShareError,
  s3Link,
  postId,
  venueId,
  vendorId,
}) {
  const authUserId = useContext(AuthContext);
  const [filteredList, setFilteredList] = useState([]); //Filtered List
  const [selectedList, setSelectedList] = useState([]); //Selected List
  const [search, setSearch] = useState(" ");
  const masterList = useRef(Array()); //Master List use to set all other lists
  const recipientList = useRef(Array()); //Recipient ID list sent to mutation function

  const [isSelected, setIsSelected] = useState(false); //We use this variable to see if any of the items in the view are selected or not (this decides whether we disable the button or not)

  const inputRef = useRef(null);
  const [text, setText] = useState(""); //Used to set text value for reply and comment submit

  const insets = useSafeAreaInsets();
  const flexAboveModal = 3;
  const flexOfModal = 7;

  const client = new ApolloClient({
    uri: "http://54.177.179.113/graphql/",
    cache: new InMemoryCache(),
  });

  const followingData = useQuery(FOLLOWING_LIST, {
    variables: {
      userId: authUserId,
    },
  });

  if (followingData.error) {
    console.log(
      "User Following Query " +
        followingData.error +
        " (Post Id: " +
        authUserId +
        ")"
    );
  }

  // const [loadUserData] = useLazyQuery(USER);

  // const getUserData = async (element) => {
  //   console.log(element.userId);
  //   loadUserData({
  //     variables: {
  //       recipientUserId: element.userId,
  //       authUserId: authUserId,
  //     },
  //     fetchPolicy: "no-cache",
  //   })
  //     .then(({ data }) => {
  //       console.log(data.user.userId);
  //       if (data.user) {
  //         const item = {
  //           userId: data.user.userId,
  //           username: data.user.username,
  //           level: data.user.level,
  //           avatar: data.user.avatar,
  //           message: "",
  //           isItemSelected: false,
  //         };
  //         //Need to check if Id already exists in current list
  //         masterList.current.push(item);
  //         if (masterList.current.length == followingList.length) {
  //           setFilteredList(masterList.current);
  //           setSelectedList(masterList.current);
  //         }
  //       }
  //     })
  //     .catch((error) => console.log("User Query " + error));
  // };

  const getUserData = async (element) => {
    const userData = client.query({
      query: USER,
      variables: {
        recipientUserId: element.userId,
        authUserId: authUserId,
      },
    });
    if (userData.error) {
      console.log(
        "User Query " + userData.error + " (User Id: " + item.userId + ")"
      );
    }
    if (!(await userData).loading) {
      const newItem = (await userData).data;
      if (newItem.user) {
        const item = {
          userId: newItem.user.userId,
          username: newItem.user.username,
          level: newItem.user.level,
          avatar: newItem.user.avatar,
          message: "",
          isItemSelected: false,
        };
        //Need to check if Id already exists in current list
        masterList.current.push(item);
        if (
          masterList.current.length ==
          followingData.data.usersFollowing.users.length
        ) {
          setFilteredList(masterList.current);
          setSelectedList(masterList.current);
        }
      }
    }
  };

  useEffect(() => {
    if (followingData.data) {
      recipientList.current = Array(); //This is the list sent to the Mutation Function
      masterList.current = Array(); ///This will be reset in getUserList function
      if (followingData.data.usersFollowing.users.length > 0) {
        followingData.data.usersFollowing.users.forEach((element) => {
          getUserData(element);
        });
      } else {
        setFilteredList(masterList.current);
        setSelectedList(masterList.current);
      }
    }
  }, [followingData.data]);

  //Mutations & Apollo Cache Update
  const [sharedAttachment] = useMutation(SHARE_POST, {
    onError(error) {
      console.log(error.message);
      setSearch(null); //Resets Search
      setSelectedList(null); //Resets SelectedList
      setFilteredList(null); //Resets FilteredList
      handleShareError();
    },

    update(cache, { data }) {
      const postQuery = cache.readQuery({
        query: POST,
        variables: { userId: authUserId, postId: postId },
      });
      if (postQuery) {
        cache.writeQuery({
          query: POST,
          variables: { userId: authUserId, postId: postId },
          data: {
            post: {
              ...postQuery.post,
              postSharesAggregate: {
                aggregate: {
                  // count: postQuery.post.postSharesAggregate.aggregate.count + 1,
                  count: 20,
                },
              },
            },
          },
        });
      }
    },
    onCompleted(data) {
      setSearch(null); //Resets Search
      setSelectedList(null); //Resets SelectedList
      setFilteredList(null); //Resets FilteredList
      handleShareSuccess();
    },
  });

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = selectedList.filter(function (item) {
        const itemData = item.username
          ? item.username.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.includes(textData);
      });
      setFilteredList(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      setFilteredList(selectedList);
      setSearch(null);
    }
  };

  //This function takes a selected list and injected the message into each object in the list
  // const addTextInput = () => {
  //   recipientList.current = selectedList;
  //   const newList = recipientList.current.map((element) => {
  //     if (element.isItemSelected) {
  //       const updatedItem = {
  //         ...element,
  //         message: text,
  //       };
  //       return updatedItem;
  //     } else return element;
  //   });
  //   recipientList.current = newList;
  // };

  const getRecipientList = () => {
    selectedList.map((element) => {
      if (element.isItemSelected) {
        recipientList.current.push(element.userId);
      }
    });
  };

  //When a user hits submit on the share modal
  const onSend = () => {
    getRecipientList();
    if (postId) {
      sharedAttachment({
        variables: {
          authUserId: authUserId,
          recipientUserId: recipientList.current,
          message: text,
          shareObj: {
            template: {
              type: "Post",
              id: postId,
            },
            link: s3Link,
          },
        },
      });
    }
    if (venueId) {
      handleShareSuccess();
      // sharedAttachment({
      //   variables: {
      //     authUserId: authUserId,
      //     recipientUserId: recipientList.current,
      //     message: text,
      //     shareObj: {
      //       template: {
      //         type: "Venue",
      //         id: venueId,
      //       },
      //       link: s3Link,
      //     },
      //   },
      // });
    }
    if (vendorId) {
      handleShareSuccess();
      // sharedAttachment({
      //   variables: {
      //     authUserId: authUserId,
      //     recipientUserId: recipientList.current,
      //     message: text,
      //     shareObj: {
      //       template: {
      //         type: "Vendor",
      //         id: vendorId,
      //       },
      //       link: s3Link,
      //     },
      //   },
      // });
    }
  };

  const onKeyPress = (event) => {
    if (event.nativeEvent.key == "Enter") {
      //console.log("Enter");
    } else {
      //console.log("Something else Pressed");
    }
  };

  const onSubmitEditing = () => {
    Keyboard.dismiss();
  };

  //When a user selects a profile on the share modal
  const onSelect = (item) => {
    recipientList.current = Array();
    const newList = selectedList.map((element) => {
      if (item.userId == element.userId) {
        const updatedItem = {
          ...element,
          isItemSelected: !item.isItemSelected,
        };
        return updatedItem;
      } else return element;
    });
    setIsSelected(!newList.every((element) => element.isItemSelected == false)); //Checks to see if every item in the array is false (not selected) - if so then we need to setIsSelected to false
    setSelectedList(newList);
    setFilteredList(newList);
    setSearch(null);
  };

  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: "Loop Experiences Inc.",
          title: "Loop Experiences Inc",
          //url: require("../../assets/PostVideos/PhiPhiIslandsThailand.mp4"),
        },
        {
          excludedActivityTypes: [],
        }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
      setSearch(null); //Resets Search
      setSelectedList(null); //Resets SelectedList
      setFilteredList(null); //Resets FilteredList
      handleShareError();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isShareVisible}>
      {/*  Touchable Space above Share Modal to close Modal  */}
      <TouchableWithoutFeedback
        onPress={() => setIsShareVisible(!isShareVisible)}
      >
        <View style={{ flex: flexAboveModal }} />
      </TouchableWithoutFeedback>

      {/* Share Modal: Seperated by Header and Flalist (profiles)  */}
      <View
        style={{
          flex: flexOfModal,
          backgroundColor: theme.modal.backgroundColor,
        }}
      >
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <View style={styles.searchInputText}>
              <View style={{ paddingVertical: 5, paddingHorizontal: 7 }}>
                <Icon
                  name="search"
                  fill={theme.input.placeholderColor}
                  size={17}
                />
              </View>
              <TextInput
                style={styles.text}
                returnKeyType="done" //ios
                returnKeyLabel="done" //andriod
                placeholder="Search"
                placeholderTextColor={theme.input.placeholderColor}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                numberOfLines={1}
                multiline={false}
                onSubmitEditing={onSubmitEditing} //called only when multiline is false
                //onKeyPress={onKeyPress} //called only when multiline is true
              />
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => onShare()}>
            <View style={{ marginLeft: 10, marginTop: 3 }}>
              <Icon
                //name="person-add-outline"
                name="share-square"
                fill={colors.white}
                size={28}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.separator} />
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.userId.toString()}
            renderItem={({ item }) => (
              <ShareTile item={item} onSelect={onSelect} />
            )}
          />
        </View>
      </View>
      <KeyboardAvoidingView behavior="position">
        {isSelected ? (
          <View style={styles.inputContainer}>
            <View style={styles.inputText}>
              <TextInput
                ref={inputRef}
                style={{
                  width: "90%",
                  color: colors.white,
                  fontSize: 15,
                }}
                returnKeyType="done"
                multiline={true}
                blurOnSubmit={true}
                placeholderTextColor={colors.lightGrey}
                placeholder={"Write a message..."}
                onChangeText={(value) => setText(value)}
                value={text}
              />
            </View>
            {/* <TouchableOpacity onPress={onSend}>
              <View
                style={{
                  width: 50,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ paddingVertical: 5, paddingHorizontal: 5 }}>
                  <Icon name="search" fill={colors.white} size={18} />
                </View>
              </View>
            </TouchableOpacity> */}
          </View>
        ) : null}
        <View
          style={{
            paddingBottom: insets.bottom,
            backgroundColor: theme.modal.backgroundColor,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              isSelected ? onSend() : console.log("disabled");
            }}
          >
            <View style={styles.footerContainer}>
              <View
                style={[
                  styles.footerButton,
                  isSelected ? null : { opacity: 0.2 },
                ]}
              >
                <AppText
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: colors.white,
                  }}
                >
                  Send
                </AppText>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.modal.backgroundColor,
    borderRadius: 10,
  },
  inputContainer: {
    //backgroundColor: theme.input.backgroundColor,
    backgroundColor: theme.modal.backgroundColor,
    flexDirection: "row",
    paddingTop: 10,
    bottom: 0,
    paddingLeft: 5,
  },
  inputText: {
    width: "100%",
    height: "100%",
    paddingVertical: 10,
    paddingLeft: 15,
  },
  separator: {
    height: 1,
    backgroundColor: theme.modal.separatorColor,
    opacity: 0.1,
    margin: 5,
  },
  searchContainer: {
    flexDirection: "row",
    bottom: 0,
    backgroundColor: theme.modal.backgroundColor,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputContainer: {
    width: "85%",
    borderRadius: 8,
    //borderWidth: 2,
    //borderColor: colors.grey,
    backgroundColor: colors.darkGrey,
  },
  searchInputText: {
    flexDirection: "row",
    padding: 3,
  },
  footerContainer: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.modal.backgroundColor,
  },
  footerButton: {
    borderRadius: 8,
    height: "70%",
    width: "93%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
  text: {
    flex: 1,
    color: colors.white,
    fontSize: 17,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
});

ShareModal.propTypes = {
  isShareVisible: PropTypes.bool.isRequired,
  setIsShareVisible: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
};

ShareModal.defaultProps = {
  handleShare: () => {
    console.log("Post Shared");
  },
};

export default ShareModal;
