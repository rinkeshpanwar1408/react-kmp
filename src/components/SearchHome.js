import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Input,
} from "antd";
import { MdOutlineKeyboardVoice, MdSearch, MdClose } from "react-icons/md";
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
var recognition;
function SearchHome(props) {
  const history = useHistory();
  const [Microphone, setMicrophone] = useState(false);
  const Dispatch = useDispatch();
  const [isFullScreen, setIsFullscreen] = useState(false);
  const [Listening, setListening] = useState(false);
  const [visibleSuggestion, setvisibleSuggestion] = useState(false);
  const [suggessionsList, setSuggessionsList] = useState([]);
  const [searchWord, setSearchWord] = useState("");


  const onSearchClickHandler =  () => {
    setvisibleSuggestion(false)
    Dispatch(ActionCreator.getSearchedData(searchWord));
    
    // history.replace(`${match.url}/${RouteUrl.SEARCH}`);
  };
  useEffect(() => {
    let timer;
    try {
      timer = setTimeout(() => {
        getdata();
      }, 500);

      const getdata = async () => {
        if (searchWord) {
          const result = await Api.get(`elastic/suggest/${searchWord}`);
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
    setSearchWord(valueText);
  };

  const onSuggestionItemClickHandler = (text) => {
    setSearchWord(text);
    localStorage.setItem("loading_text", text);
    localStorage.setItem("filter_search", text);
    setvisibleSuggestion(false);
    Dispatch(ActionCreator.getSearchedData(text));
    history.push(props.searchPath);
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
  function stopListening(){ 
    recognition.stop()
    setListening(false) 
  }

  function startListening(){ 
    recognition.start() 
  }

  function toggleMicrophone(){  
    if(Listening){  
      stopListening()
    }else{  
      startListening()
    }
  } 
  useEffect(() => { 
  const speech = window.SpeechRecognition || window.webkitSpeechRecognition
  if(speech == undefined){
    setMicrophone(false)
  }else{
    setMicrophone(true)
    recognition = new speech()

    recognition.continuous = true
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    
    recognition.onstart = function() {
      setListening(true)
      setvisibleSuggestion(true)
    }
    recognition.onend = function(){ 
      setListening(false)
      setvisibleSuggestion(false)
    }
    recognition.onresult =  function(speech) { 
      let result = speech.results[speech.resultIndex];
      setSearchWord(result[0].transcript);
    }     
  }

  return () => { 
    recognition.stop();
  }
  }, [])
    return ( 
        <>
          <div className="mainheader_container_navbar_searchcontainer">
            <div className="mainheader_container_navbar_searchcontainer_inputBox">
              <Input
                placeholder="Search"
                className="mainheader_container_navbar_searchcontainer_inputBox-input"
                onFocus={() => searchWord ? setvisibleSuggestion(true) : setvisibleSuggestion(false)}
                value={searchWord}
                onChange={(e) => {
                  onSearchTextChangeHandler(e);
                  setvisibleSuggestion(true);
                }}
              />
              {
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
              } 
            </div>
            <div className="mainheader_container_navbar_searchcontainer_actionBox">
                {
                  (searchWord.length > 0) &&
                  <MdClose
                    style={{
                      cursor: "pointer",
                      color: "#265fd5"
                    }}
                    className="clear_search"
                    onClick={()=>{
                      setvisibleSuggestion(false);
                      setSearchWord("");
                      localStorage.setItem("loading_text", "");
                      localStorage.setItem("filter_search", "");
                  }}
                  size={18}
                  />
                }
                <div
                  onClick={() => {
                    history.push(props.searchPath);
                  }}
                  className="mainheader_container_navbar_searchcontainer_actionBox-search" style={{cursor: "pointer"}}>
                  <MdSearch size={20} onClick={onSearchClickHandler} />
                </div>
            </div>
          </div>
          {Microphone && 
            <div className="microphone_section" onClick={toggleMicrophone}>
              <MdOutlineKeyboardVoice size={18} />
            </div>
          }
        </>
     );
}

export default SearchHome;