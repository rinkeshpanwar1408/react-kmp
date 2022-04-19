import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Input,
} from "antd";
import { MdOutlineKeyboardVoice, MdSearch } from "react-icons/md";
import SearchListItem from "./SearchListItem";
import { useHistory, useRouteMatch } from "react-router-dom";
import { instanceApi as Api } from "../utility/axios";
import SimpleBar from "simplebar-react";
import { useDispatch } from "react-redux";
import * as ActionCreator from "../store/action/actions";
import { StyledCard } from "../styled-components/CommonControls";
import * as RouteUrl from "../model/route";
//importing spinner loading
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const { Title, Text } = Typography;

function SearchHome() {
    const match = useRouteMatch();
  const history = useHistory();
  const Dispatch = useDispatch();

  const [isFullScreen, setIsFullscreen] = useState(false);

  const [visibleSuggestion, setvisibleSuggestion] = useState(false);
  const [suggessionsList, setSuggessionsList] = useState([]);
  const [searchWord, setSearchWord] = useState("");


  const onSearchClickHandler =  () => {
    setvisibleSuggestion(false)
    Dispatch(ActionCreator.getSearchedData(searchWord));

    // history.replace(`${match.url}/${RouteUrl.SEARCH}`);
  };

  
  // const onApplyFilterClickHandler =  (filters) => {
  //   setvisibleSuggestion(false)
  //   Dispatch(ActionCreator.getSearchedData(searchWord,filters));

  //   // history.replace(`${match.url}/${RouteUrl.SEARCH}`);
  // };

  useEffect(() => {
    let timer;
    try {
      timer = setTimeout(() => {
        getdata();
      }, 500);

      const getdata = async () => {
        if (searchWord) {
          const result = await Api.get(`/suggest/${searchWord}`);
          setSuggessionsList(result.data);
        }
      };

      return () => {
        clearTimeout(timer);
      };
    } catch (error) {
      console.log(error);
    }
  }, [searchWord]);

 

  const onSearchTextChangeHandler = (event) => {
    const valueText = event.target.value;
    localStorage.setItem("loading_text", valueText);
    localStorage.setItem("filter_search", valueText);
      if(valueText === ''){
          setSuggessionsList([]);
      }
      setSearchWord(valueText);
  };

  const onSuggestionItemClickHandler = (text) => {
    setSearchWord(text);
    localStorage.setItem("loading_text", text);
    localStorage.setItem("filter_search", text);
    setvisibleSuggestion(false);
    Dispatch(ActionCreator.getSearchedData(text));
    history.replace(`${match.url}/${RouteUrl.SEARCH}`);
  };

  const onFullScreenHandler = useCallback(async () => {
    if (isFullScreen) {
      await document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullscreen(!isFullScreen);
  }, [isFullScreen])


  useEffect(() => {
    // subscribe event
    document.addEventListener("fullscreenchange", (e) => {
      if (document.fullscreenElement && !isFullScreen) {
        onFullScreenHandler(isFullScreen)
      }
    })
    return () => {
      // unsubscribe event
      document.removeEventListener("fullscreenchange", onFullScreenHandler);
    };
  }, [isFullScreen, onFullScreenHandler]);

    return ( 
        <>
          <div className="mainheader_container_navbar_searchcontainer">
            <Title className="mainheader_container_navbar_searchcontainer-title">Hi, how can we help you?</Title>
            <div className="mainheader_container_navbar_searchcontainer_inputBox">
              <Input
                placeholder="Hi, how can we help you?"
                className="mainheader_container_navbar_searchcontainer_inputBox-input"
                onFocus={() => searchWord ? setvisibleSuggestion(true) : setvisibleSuggestion(false)}
                value={searchWord}
                onChange={(e) => {
                  onSearchTextChangeHandler(e);
                  setvisibleSuggestion(true);
                }}
              />

              <div className="mainheader_container_navbar_searchcontainer_actionBox">
                <MdOutlineKeyboardVoice size={18} />
                <div
                  onClick={() => {
                    history.replace(`${match.url}/${RouteUrl.SEARCH}`);
                  }}
                  className="mainheader_container_navbar_searchcontainer_actionBox-search" style={{cursor: "pointer"}}>
                  <MdSearch size={20} onClick={onSearchClickHandler} />
                </div>
              </div>
              
              {
            //   suggessionsList.length > 0 ?
              ((visibleSuggestion && searchWord) && (suggessionsList.length > 0 ?
                <StyledCard className="mainheader_searchlist_container">
                  <SimpleBar className="mainheader_searchlist_container-scrollContainer">
                    {suggessionsList.map((item, i) => {
                      return (
                        <SearchListItem
                          item={item}
                          key={i}
                          onClick={onSuggestionItemClickHandler}
                        />
                      );
                    })}
                  </SimpleBar>
                </StyledCard>
                : 
                (searchWord.length > 1 && suggessionsList.length === 0 ?
               (
               <StyledCard className="mainheader_searchlist_container">
                        <SimpleBar className="mainheader_searchlist_container-scrollContainer">
                            <Text className="mainheader_searchlist_container_item-title">
                               Search Not Found
                            </Text>
                        </SimpleBar>
                </StyledCard> ) 
                : 
                (<StyledCard className="mainheader_searchlist_container">
                        <SimpleBar style={{textAlign: "center"}} className="mainheader_searchlist_container-scrollContainer">
                          <Spin indicator={antIcon} />
                        </SimpleBar>
                        </StyledCard>)
                    )
                ))
            //    : (
            //     searchWord !== "" ? console.log('nothing show') :
            //   (<StyledCard className="mainheader_searchlist_container">
            //   <SimpleBar className="mainheader_searchlist_container-scrollContainer">
            //     <Text className="mainheader_searchlist_container_item-title">
            //       Loading...
            //     </Text>
            //   </SimpleBar>
            // </StyledCard>))
            } 
            </div>
          </div>
        </>
     );
}

export default SearchHome;