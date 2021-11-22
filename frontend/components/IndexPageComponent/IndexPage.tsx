import type { NextPage } from "next";
import React, { useEffect, useState, useRef } from "react";
import Head from 'next/head';
import Image from 'next/image';
// import styles from "../styles/Home.module.css";
import styles from "../../styles/Index.module.scss";
//import MainPage from "../MainComponents/MainPage";
import ScrollDownComponent from "./ScrollDownComponent";

import dynamic from 'next/dynamic';
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const MainPage = dynamic(() =>
import('../MainComponents/MainPage'), {
loading: function loadingComponent() {
  return <LoadingComponent />;
},
});

const IndexPage: NextPage = () => {
  const mainText = useRef<any>();
  const circleBackground = useRef<any>();

  const [isLastScroll, setIsLastScroll] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(true);
  useEffect(() => {
    window.scrollTo(0,0);
    function handleScroll() {
      const scrollTop = window.scrollY;
      const isEndOfPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
      
      // window.resizeTo(
      //   1920, 1080
      // )
      
      // console.log(scrollTop, isEndOfPage, window.innerWidth,
      // window.innerHeight);
      // if (scrollTop >= 1080) {

      // }
      if (!circleBackground.current) {
        return;
      }
      circleBackground.current.style.width = `${100}vw`;
      circleBackground.current.style.height = `${100}vh`;
      
      if (545 - scrollTop > 0) {
        
        //circleBackground.current.style.marginLeft = `${37 - scrollTop}vw`;
        circleBackground.current.style.borderRadius = `50%`;
        circleBackground.current.style.marginTop = `${110}vh`;
        
      }
      else if((545 - scrollTop <= 0)){
        circleBackground.current.style.marginLeft = `0px`;
        circleBackground.current.style.borderRadius = `0%`;
        circleBackground.current.style.marginTop = `${110}vh`;
        // circleBackground.current.style.marginTop = `${0}px`;
      }``
      
      if (scrollTop <= 790) {
        mainText.current.style.color = "white";
      }
      else {
        mainText.current.style.color = "#FFD523";
      }
      
      if (isEndOfPage) {
        circleBackground.current.style.height = `100vh`;
        // mainText.current.style.margin= "15vh 75vh 20vh";
        mainText.current.style.height= "30vh";
        setIsLastScroll(true);
      }
      else {
        mainText.current.style.padding = "10vh 29vw 5vh 29vw";
        setIsLastScroll(false);
      }

      if (scrollTop === 0) {
        setIsScrollTop(true);
      }
      else {
        setIsScrollTop(false);
      }
      
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <article className={styles.articleTarget}>
        <div id={styles.stars}></div>
        <section id={styles.mainText} ref={mainText}>
          <h1>
          저희가
          <br></br>
          무엇을 할 수 있는지
          <br></br>
          보여드릴게요
          </h1>
          {
          isScrollTop ?
              <ScrollDownComponent /> :
            <></>
        }
        </section>
        
        <section ref={circleBackground} id={styles.firstSection}>
          {isLastScroll ? <MainPage /> : <></>}
        </section>
      </article>
    </div>
  );
};

export default IndexPage;
