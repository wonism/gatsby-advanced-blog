import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaHome from 'react-icons/lib/fa/home';
import FaSearch from 'react-icons/lib/fa/search';
import FaTags from 'react-icons/lib/fa/tags';
import { flow, isEmpty, isEqual, filter, map, uniq, get, size, toLower, replace, startsWith } from 'lodash/fp';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '~/components/Common/constants';

const Hamburger = styled.div`
  position: fixed;
  display: none;
  top: 0;
  right: 0;
  z-index: 5000;
  @media (max-width: 414px) {
    display: block;
  }

  &:before,
  &:after {
    display: block;
    content: '';
    clear: both;
  }

  & > div {
    float: left;
  }
`;

const MovableFaCaretDown = styled(FaCaretDown)`
  transition: transform .4s ease-out .1s;
  transform: rotate(180deg);

  &.is-active {
    transform: rotate(0deg);
  }
`;

/*!
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 */
const GnbWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Lato");
  position: fixed;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-color: rgba(255, 255, 255, .6);
  font-size: 18px;
  font-family: Lato;
  font-weight: 600;
  z-index: 3000;

  @media (max-width: 414px) {
    height: 60px;
    line-height: 60px;
    background-color: transparent;

    .hamburger{font:inherit;display:inline-block;overflow:visible;margin:0;padding:15px;cursor:pointer;transition-timing-function:linear;transition-duration:.15s;transition-property:opacity,filter;text-transform:none;color:inherit;border:0;background-color:transparent}.hamburger:hover{opacity:.7}.hamburger-box{position:relative;display:inline-block;width:40px;height:24px}.hamburger-inner{top:50%;display:block;margin-top:-2px}.hamburger-inner,.hamburger-inner:after,.hamburger-inner:before{position:absolute;width:40px;height:4px;transition-timing-function:ease;transition-duration:.15s;transition-property:transform;border-radius:4px;background-color:#000}.hamburger-inner:after,.hamburger-inner:before{display:block;content:""}.hamburger-inner:before{top:-10px}.hamburger-inner:after{bottom:-10px}.hamburger--3dx .hamburger-box{perspective:80px}.hamburger--3dx .hamburger-inner{transition:transform .15s cubic-bezier(.645,.045,.355,1),background-color 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dx .hamburger-inner:after,.hamburger--3dx .hamburger-inner:before{transition:transform 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dx.is-active .hamburger-inner{transform:rotateY(180deg);background-color:transparent}.hamburger--3dx.is-active .hamburger-inner:before{transform:translate3d(0,10px,0) rotate(45deg)}.hamburger--3dx.is-active .hamburger-inner:after{transform:translate3d(0,-10px,0) rotate(-45deg)}.hamburger--3dx-r .hamburger-box{perspective:80px}.hamburger--3dx-r .hamburger-inner{transition:transform .15s cubic-bezier(.645,.045,.355,1),background-color 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dx-r .hamburger-inner:after,.hamburger--3dx-r .hamburger-inner:before{transition:transform 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dx-r.is-active .hamburger-inner{transform:rotateY(-180deg);background-color:transparent}.hamburger--3dx-r.is-active .hamburger-inner:before{transform:translate3d(0,10px,0) rotate(45deg)}.hamburger--3dx-r.is-active .hamburger-inner:after{transform:translate3d(0,-10px,0) rotate(-45deg)}.hamburger--3dy .hamburger-box{perspective:80px}.hamburger--3dy .hamburger-inner{transition:transform .15s cubic-bezier(.645,.045,.355,1),background-color 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dy .hamburger-inner:after,.hamburger--3dy .hamburger-inner:before{transition:transform 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dy.is-active .hamburger-inner{transform:rotateX(-180deg);background-color:transparent}.hamburger--3dy.is-active .hamburger-inner:before{transform:translate3d(0,10px,0) rotate(45deg)}.hamburger--3dy.is-active .hamburger-inner:after{transform:translate3d(0,-10px,0) rotate(-45deg)}.hamburger--3dy-r .hamburger-box{perspective:80px}.hamburger--3dy-r .hamburger-inner{transition:transform .15s cubic-bezier(.645,.045,.355,1),background-color 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dy-r .hamburger-inner:after,.hamburger--3dy-r .hamburger-inner:before{transition:transform 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dy-r.is-active .hamburger-inner{transform:rotateX(180deg);background-color:transparent}.hamburger--3dy-r.is-active .hamburger-inner:before{transform:translate3d(0,10px,0) rotate(45deg)}.hamburger--3dy-r.is-active .hamburger-inner:after{transform:translate3d(0,-10px,0) rotate(-45deg)}.hamburger--3dxy .hamburger-box{perspective:80px}.hamburger--3dxy .hamburger-inner{transition:transform .15s cubic-bezier(.645,.045,.355,1),background-color 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dxy .hamburger-inner:after,.hamburger--3dxy .hamburger-inner:before{transition:transform 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dxy.is-active .hamburger-inner{transform:rotateX(180deg) rotateY(180deg);background-color:transparent}.hamburger--3dxy.is-active .hamburger-inner:before{transform:translate3d(0,10px,0) rotate(45deg)}.hamburger--3dxy.is-active .hamburger-inner:after{transform:translate3d(0,-10px,0) rotate(-45deg)}.hamburger--3dxy-r .hamburger-box{perspective:80px}.hamburger--3dxy-r .hamburger-inner{transition:transform .15s cubic-bezier(.645,.045,.355,1),background-color 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dxy-r .hamburger-inner:after,.hamburger--3dxy-r .hamburger-inner:before{transition:transform 0s cubic-bezier(.645,.045,.355,1) .1s}.hamburger--3dxy-r.is-active .hamburger-inner{transform:rotateX(180deg) rotateY(180deg) rotate(-180deg);background-color:transparent}.hamburger--3dxy-r.is-active .hamburger-inner:before{transform:translate3d(0,10px,0) rotate(45deg)}.hamburger--3dxy-r.is-active .hamburger-inner:after{transform:translate3d(0,-10px,0) rotate(-45deg)}.hamburger--arrow.is-active .hamburger-inner:before{transform:translate3d(-8px,0,0) rotate(-45deg) scaleX(.7)}.hamburger--arrow.is-active .hamburger-inner:after{transform:translate3d(-8px,0,0) rotate(45deg) scaleX(.7)}.hamburger--arrow-r.is-active .hamburger-inner:before{transform:translate3d(8px,0,0) rotate(45deg) scaleX(.7)}.hamburger--arrow-r.is-active .hamburger-inner:after{transform:translate3d(8px,0,0) rotate(-45deg) scaleX(.7)}.hamburger--arrowalt .hamburger-inner:before{transition:top .1s ease .1s,transform .1s cubic-bezier(.165,.84,.44,1)}.hamburger--arrowalt .hamburger-inner:after{transition:bottom .1s ease .1s,transform .1s cubic-bezier(.165,.84,.44,1)}.hamburger--arrowalt.is-active .hamburger-inner:before{top:0;transition:top .1s ease,transform .1s cubic-bezier(.895,.03,.685,.22) .1s;transform:translate3d(-8px,-10px,0) rotate(-45deg) scaleX(.7)}.hamburger--arrowalt.is-active .hamburger-inner:after{bottom:0;transition:bottom .1s ease,transform .1s cubic-bezier(.895,.03,.685,.22) .1s;transform:translate3d(-8px,10px,0) rotate(45deg) scaleX(.7)}.hamburger--arrowalt-r .hamburger-inner:before{transition:top .1s ease .1s,transform .1s cubic-bezier(.165,.84,.44,1)}.hamburger--arrowalt-r .hamburger-inner:after{transition:bottom .1s ease .1s,transform .1s cubic-bezier(.165,.84,.44,1)}.hamburger--arrowalt-r.is-active .hamburger-inner:before{top:0;transition:top .1s ease,transform .1s cubic-bezier(.895,.03,.685,.22) .1s;transform:translate3d(8px,-10px,0) rotate(45deg) scaleX(.7)}.hamburger--arrowalt-r.is-active .hamburger-inner:after{bottom:0;transition:bottom .1s ease,transform .1s cubic-bezier(.895,.03,.685,.22) .1s;transform:translate3d(8px,10px,0) rotate(-45deg) scaleX(.7)}.hamburger--arrowturn.is-active .hamburger-inner{transform:rotate(-180deg)}.hamburger--arrowturn.is-active .hamburger-inner:before{transform:translate3d(8px,0,0) rotate(45deg) scaleX(.7)}.hamburger--arrowturn.is-active .hamburger-inner:after{transform:translate3d(8px,0,0) rotate(-45deg) scaleX(.7)}.hamburger--arrowturn-r.is-active .hamburger-inner{transform:rotate(-180deg)}.hamburger--arrowturn-r.is-active .hamburger-inner:before{transform:translate3d(-8px,0,0) rotate(-45deg) scaleX(.7)}.hamburger--arrowturn-r.is-active .hamburger-inner:after{transform:translate3d(-8px,0,0) rotate(45deg) scaleX(.7)}.hamburger--boring .hamburger-inner,.hamburger--boring .hamburger-inner:after,.hamburger--boring .hamburger-inner:before{transition-property:none}.hamburger--boring.is-active .hamburger-inner{transform:rotate(45deg)}.hamburger--boring.is-active .hamburger-inner:before{top:0;opacity:0}.hamburger--boring.is-active .hamburger-inner:after{bottom:0;transform:rotate(-90deg)}.hamburger--collapse .hamburger-inner{top:auto;bottom:0;transition-delay:.13s;transition-timing-function:cubic-bezier(.55,.055,.675,.19);transition-duration:.13s}.hamburger--collapse .hamburger-inner:after{top:-20px;transition:top .2s cubic-bezier(.33333,.66667,.66667,1) .2s,opacity .1s linear}.hamburger--collapse .hamburger-inner:before{transition:top .12s cubic-bezier(.33333,.66667,.66667,1) .2s,transform .13s cubic-bezier(.55,.055,.675,.19)}.hamburger--collapse.is-active .hamburger-inner{transition-delay:.22s;transition-timing-function:cubic-bezier(.215,.61,.355,1);transform:translate3d(0,-10px,0) rotate(-45deg)}.hamburger--collapse.is-active .hamburger-inner:after{top:0;transition:top .2s cubic-bezier(.33333,0,.66667,.33333),opacity .1s linear .22s;opacity:0}.hamburger--collapse.is-active .hamburger-inner:before{top:0;transition:top .1s cubic-bezier(.33333,0,.66667,.33333) .16s,transform .13s cubic-bezier(.215,.61,.355,1) .25s;transform:rotate(-90deg)}.hamburger--collapse-r .hamburger-inner{top:auto;bottom:0;transition-delay:.13s;transition-timing-function:cubic-bezier(.55,.055,.675,.19);transition-duration:.13s}.hamburger--collapse-r .hamburger-inner:after{top:-20px;transition:top .2s cubic-bezier(.33333,.66667,.66667,1) .2s,opacity .1s linear}.hamburger--collapse-r .hamburger-inner:before{transition:top .12s cubic-bezier(.33333,.66667,.66667,1) .2s,transform .13s cubic-bezier(.55,.055,.675,.19)}.hamburger--collapse-r.is-active .hamburger-inner{transition-delay:.22s;transition-timing-function:cubic-bezier(.215,.61,.355,1);transform:translate3d(0,-10px,0) rotate(45deg)}.hamburger--collapse-r.is-active .hamburger-inner:after{top:0;transition:top .2s cubic-bezier(.33333,0,.66667,.33333),opacity .1s linear .22s;opacity:0}.hamburger--collapse-r.is-active .hamburger-inner:before{top:0;transition:top .1s cubic-bezier(.33333,0,.66667,.33333) .16s,transform .13s cubic-bezier(.215,.61,.355,1) .25s;transform:rotate(90deg)}.hamburger--elastic .hamburger-inner{top:2px;transition-timing-function:cubic-bezier(.68,-.55,.265,1.55);transition-duration:.275s}.hamburger--elastic .hamburger-inner:before{top:10px;transition:opacity .125s ease .275s}.hamburger--elastic .hamburger-inner:after{top:20px;transition:transform .275s cubic-bezier(.68,-.55,.265,1.55)}.hamburger--elastic.is-active .hamburger-inner{transition-delay:75ms;transform:translate3d(0,10px,0) rotate(135deg)}.hamburger--elastic.is-active .hamburger-inner:before{transition-delay:0s;opacity:0}.hamburger--elastic.is-active .hamburger-inner:after{transition-delay:75ms;transform:translate3d(0,-20px,0) rotate(-270deg)}.hamburger--elastic-r .hamburger-inner{top:2px;transition-timing-function:cubic-bezier(.68,-.55,.265,1.55);transition-duration:.275s}.hamburger--elastic-r .hamburger-inner:before{top:10px;transition:opacity .125s ease .275s}.hamburger--elastic-r .hamburger-inner:after{top:20px;transition:transform .275s cubic-bezier(.68,-.55,.265,1.55)}.hamburger--elastic-r.is-active .hamburger-inner{transition-delay:75ms;transform:translate3d(0,10px,0) rotate(-135deg)}.hamburger--elastic-r.is-active .hamburger-inner:before{transition-delay:0s;opacity:0}.hamburger--elastic-r.is-active .hamburger-inner:after{transition-delay:75ms;transform:translate3d(0,-20px,0) rotate(270deg)}.hamburger--emphatic{overflow:hidden}.hamburger--emphatic .hamburger-inner{transition:background-color .125s ease-in .175s}.hamburger--emphatic .hamburger-inner:before{left:0;transition:transform .125s cubic-bezier(.6,.04,.98,.335),top .05s linear .125s,left .125s ease-in .175s}.hamburger--emphatic .hamburger-inner:after{top:10px;right:0;transition:transform .125s cubic-bezier(.6,.04,.98,.335),top .05s linear .125s,right .125s ease-in .175s}.hamburger--emphatic.is-active .hamburger-inner{transition-delay:0s;transition-timing-function:ease-out;background-color:transparent}.hamburger--emphatic.is-active .hamburger-inner:before{top:-80px;left:-80px;transition:left .125s ease-out,top .05s linear .125s,transform .125s cubic-bezier(.075,.82,.165,1) .175s;transform:translate3d(80px,80px,0) rotate(45deg)}.hamburger--emphatic.is-active .hamburger-inner:after{top:-80px;right:-80px;transition:right .125s ease-out,top .05s linear .125s,transform .125s cubic-bezier(.075,.82,.165,1) .175s;transform:translate3d(-80px,80px,0) rotate(-45deg)}.hamburger--emphatic-r{overflow:hidden}.hamburger--emphatic-r .hamburger-inner{transition:background-color .125s ease-in .175s}.hamburger--emphatic-r .hamburger-inner:before{left:0;transition:transform .125s cubic-bezier(.6,.04,.98,.335),top .05s linear .125s,left .125s ease-in .175s}.hamburger--emphatic-r .hamburger-inner:after{top:10px;right:0;transition:transform .125s cubic-bezier(.6,.04,.98,.335),top .05s linear .125s,right .125s ease-in .175s}.hamburger--emphatic-r.is-active .hamburger-inner{transition-delay:0s;transition-timing-function:ease-out;background-color:transparent}.hamburger--emphatic-r.is-active .hamburger-inner:before{top:80px;left:-80px;transition:left .125s ease-out,top .05s linear .125s,transform .125s cubic-bezier(.075,.82,.165,1) .175s;transform:translate3d(80px,-80px,0) rotate(-45deg)}.hamburger--emphatic-r.is-active .hamburger-inner:after{top:80px;right:-80px;transition:right .125s ease-out,top .05s linear .125s,transform .125s cubic-bezier(.075,.82,.165,1) .175s;transform:translate3d(-80px,-80px,0) rotate(45deg)}.hamburger--minus .hamburger-inner:after,.hamburger--minus .hamburger-inner:before{transition:bottom .08s ease-out 0s,top .08s ease-out 0s,opacity 0s linear}.hamburger--minus.is-active .hamburger-inner:after,.hamburger--minus.is-active .hamburger-inner:before{transition:bottom .08s ease-out,top .08s ease-out,opacity 0s linear .08s;opacity:0}.hamburger--minus.is-active .hamburger-inner:before{top:0}.hamburger--minus.is-active .hamburger-inner:after{bottom:0}.hamburger--slider .hamburger-inner{top:2px}.hamburger--slider .hamburger-inner:before{top:10px;transition-timing-function:ease;transition-duration:.15s;transition-property:transform,opacity}.hamburger--slider .hamburger-inner:after{top:20px}.hamburger--slider.is-active .hamburger-inner{transform:translate3d(0,10px,0) rotate(45deg)}.hamburger--slider.is-active .hamburger-inner:before{transform:rotate(-45deg) translate3d(-5.71429px,-6px,0);opacity:0}.hamburger--slider.is-active .hamburger-inner:after{transform:translate3d(0,-20px,0) rotate(-90deg)}.hamburger--slider-r .hamburger-inner{top:2px}.hamburger--slider-r .hamburger-inner:before{top:10px;transition-timing-function:ease;transition-duration:.15s;transition-property:transform,opacity}.hamburger--slider-r .hamburger-inner:after{top:20px}.hamburger--slider-r.is-active .hamburger-inner{transform:translate3d(0,10px,0) rotate(-45deg)}.hamburger--slider-r.is-active .hamburger-inner:before{transform:rotate(45deg) translate3d(5.71429px,-6px,0);opacity:0}.hamburger--slider-r.is-active .hamburger-inner:after{transform:translate3d(0,-20px,0) rotate(90deg)}.hamburger--spin .hamburger-inner{transition-timing-function:cubic-bezier(.55,.055,.675,.19);transition-duration:.22s}.hamburger--spin .hamburger-inner:before{transition:top .1s ease-in .25s,opacity .1s ease-in}.hamburger--spin .hamburger-inner:after{transition:bottom .1s ease-in .25s,transform .22s cubic-bezier(.55,.055,.675,.19)}.hamburger--spin.is-active .hamburger-inner{transition-delay:.12s;transition-timing-function:cubic-bezier(.215,.61,.355,1);transform:rotate(225deg)}.hamburger--spin.is-active .hamburger-inner:before{top:0;transition:top .1s ease-out,opacity .1s ease-out .12s;opacity:0}.hamburger--spin.is-active .hamburger-inner:after{bottom:0;transition:bottom .1s ease-out,transform .22s cubic-bezier(.215,.61,.355,1) .12s;transform:rotate(-90deg)}.hamburger--spin-r .hamburger-inner{transition-timing-function:cubic-bezier(.55,.055,.675,.19);transition-duration:.22s}.hamburger--spin-r .hamburger-inner:before{transition:top .1s ease-in .25s,opacity .1s ease-in}.hamburger--spin-r .hamburger-inner:after{transition:bottom .1s ease-in .25s,transform .22s cubic-bezier(.55,.055,.675,.19)}.hamburger--spin-r.is-active .hamburger-inner{transition-delay:.12s;transition-timing-function:cubic-bezier(.215,.61,.355,1);transform:rotate(-225deg)}.hamburger--spin-r.is-active .hamburger-inner:before{top:0;transition:top .1s ease-out,opacity .1s ease-out .12s;opacity:0}.hamburger--spin-r.is-active .hamburger-inner:after{bottom:0;transition:bottom .1s ease-out,transform .22s cubic-bezier(.215,.61,.355,1) .12s;transform:rotate(90deg)}.hamburger--spring .hamburger-inner{top:2px;transition:background-color 0s linear .13s}.hamburger--spring .hamburger-inner:before{top:10px;transition:top .1s cubic-bezier(.33333,.66667,.66667,1) .2s,transform .13s cubic-bezier(.55,.055,.675,.19)}.hamburger--spring .hamburger-inner:after{top:20px;transition:top .2s cubic-bezier(.33333,.66667,.66667,1) .2s,transform .13s cubic-bezier(.55,.055,.675,.19)}.hamburger--spring.is-active .hamburger-inner{transition-delay:.22s;background-color:transparent}.hamburger--spring.is-active .hamburger-inner:before{top:0;transition:top .1s cubic-bezier(.33333,0,.66667,.33333) .15s,transform .13s cubic-bezier(.215,.61,.355,1) .22s;transform:translate3d(0,10px,0) rotate(45deg)}.hamburger--spring.is-active .hamburger-inner:after{top:0;transition:top .2s cubic-bezier(.33333,0,.66667,.33333),transform .13s cubic-bezier(.215,.61,.355,1) .22s;transform:translate3d(0,10px,0) rotate(-45deg)}.hamburger--spring-r .hamburger-inner{top:auto;bottom:0;transition-delay:0s;transition-timing-function:cubic-bezier(.55,.055,.675,.19);transition-duration:.13s}.hamburger--spring-r .hamburger-inner:after{top:-20px;transition:top .2s cubic-bezier(.33333,.66667,.66667,1) .2s,opacity 0s linear}.hamburger--spring-r .hamburger-inner:before{transition:top .1s cubic-bezier(.33333,.66667,.66667,1) .2s,transform .13s cubic-bezier(.55,.055,.675,.19)}.hamburger--spring-r.is-active .hamburger-inner{transition-delay:.22s;transition-timing-function:cubic-bezier(.215,.61,.355,1);transform:translate3d(0,-10px,0) rotate(-45deg)}.hamburger--spring-r.is-active .hamburger-inner:after{top:0;transition:top .2s cubic-bezier(.33333,0,.66667,.33333),opacity 0s linear .22s;opacity:0}.hamburger--spring-r.is-active .hamburger-inner:before{top:0;transition:top .1s cubic-bezier(.33333,0,.66667,.33333) .15s,transform .13s cubic-bezier(.215,.61,.355,1) .22s;transform:rotate(90deg)}.hamburger--stand .hamburger-inner{transition:transform 75ms cubic-bezier(.55,.055,.675,.19) .15s,background-color 0s linear 75ms}.hamburger--stand .hamburger-inner:before{transition:top 75ms ease-in 75ms,transform 75ms cubic-bezier(.55,.055,.675,.19) 0s}.hamburger--stand .hamburger-inner:after{transition:bottom 75ms ease-in 75ms,transform 75ms cubic-bezier(.55,.055,.675,.19) 0s}.hamburger--stand.is-active .hamburger-inner{transition:transform 75ms cubic-bezier(.215,.61,.355,1) 0s,background-color 0s linear .15s;transform:rotate(90deg);background-color:transparent}.hamburger--stand.is-active .hamburger-inner:before{top:0;transition:top 75ms ease-out .1s,transform 75ms cubic-bezier(.215,.61,.355,1) .15s;transform:rotate(-45deg)}.hamburger--stand.is-active .hamburger-inner:after{bottom:0;transition:bottom 75ms ease-out .1s,transform 75ms cubic-bezier(.215,.61,.355,1) .15s;transform:rotate(45deg)}.hamburger--stand-r .hamburger-inner{transition:transform 75ms cubic-bezier(.55,.055,.675,.19) .15s,background-color 0s linear 75ms}.hamburger--stand-r .hamburger-inner:before{transition:top 75ms ease-in 75ms,transform 75ms cubic-bezier(.55,.055,.675,.19) 0s}.hamburger--stand-r .hamburger-inner:after{transition:bottom 75ms ease-in 75ms,transform 75ms cubic-bezier(.55,.055,.675,.19) 0s}.hamburger--stand-r.is-active .hamburger-inner{transition:transform 75ms cubic-bezier(.215,.61,.355,1) 0s,background-color 0s linear .15s;transform:rotate(-90deg);background-color:transparent}.hamburger--stand-r.is-active .hamburger-inner:before{top:0;transition:top 75ms ease-out .1s,transform 75ms cubic-bezier(.215,.61,.355,1) .15s;transform:rotate(-45deg)}.hamburger--stand-r.is-active .hamburger-inner:after{bottom:0;transition:bottom 75ms ease-out .1s,transform 75ms cubic-bezier(.215,.61,.355,1) .15s;transform:rotate(45deg)}.hamburger--squeeze .hamburger-inner{transition-timing-function:cubic-bezier(.55,.055,.675,.19);transition-duration:75ms}.hamburger--squeeze .hamburger-inner:before{transition:top 75ms ease .12s,opacity 75ms ease}.hamburger--squeeze .hamburger-inner:after{transition:bottom 75ms ease .12s,transform 75ms cubic-bezier(.55,.055,.675,.19)}.hamburger--squeeze.is-active .hamburger-inner{transition-delay:.12s;transition-timing-function:cubic-bezier(.215,.61,.355,1);transform:rotate(45deg)}.hamburger--squeeze.is-active .hamburger-inner:before{top:0;transition:top 75ms ease,opacity 75ms ease .12s;opacity:0}.hamburger--squeeze.is-active .hamburger-inner:after{bottom:0;transition:bottom 75ms ease,transform 75ms cubic-bezier(.215,.61,.355,1) .12s;transform:rotate(-90deg)}.hamburger--vortex .hamburger-inner{transition-timing-function:cubic-bezier(.19,1,.22,1);transition-duration:.2s}.hamburger--vortex .hamburger-inner:after,.hamburger--vortex .hamburger-inner:before{transition-delay:.1s;transition-timing-function:linear;transition-duration:0s}.hamburger--vortex .hamburger-inner:before{transition-property:top,opacity}.hamburger--vortex .hamburger-inner:after{transition-property:bottom,transform}.hamburger--vortex.is-active .hamburger-inner{transition-timing-function:cubic-bezier(.19,1,.22,1);transform:rotate(765deg)}.hamburger--vortex.is-active .hamburger-inner:after,.hamburger--vortex.is-active .hamburger-inner:before{transition-delay:0s}.hamburger--vortex.is-active .hamburger-inner:before{top:0;opacity:0}.hamburger--vortex.is-active .hamburger-inner:after{bottom:0;transform:rotate(90deg)}.hamburger--vortex-r .hamburger-inner{transition-timing-function:cubic-bezier(.19,1,.22,1);transition-duration:.2s}.hamburger--vortex-r .hamburger-inner:after,.hamburger--vortex-r .hamburger-inner:before{transition-delay:.1s;transition-timing-function:linear;transition-duration:0s}.hamburger--vortex-r .hamburger-inner:before{transition-property:top,opacity}.hamburger--vortex-r .hamburger-inner:after{transition-property:bottom,transform}.hamburger--vortex-r.is-active .hamburger-inner{transition-timing-function:cubic-bezier(.19,1,.22,1);transform:rotate(-765deg)}.hamburger--vortex-r.is-active .hamburger-inner:after,.hamburger--vortex-r.is-active .hamburger-inner:before{transition-delay:0s}.hamburger--vortex-r.is-active .hamburger-inner:before{top:0;opacity:0}.hamburger--vortex-r.is-active .hamburger-inner:after{bottom:0;transform:rotate(-90deg)}
  }
`;

const SubMenu = styled.ul`
  position: absolute;
  top: 100px;
  line-height: 1.8em;
  background-color: #fff;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  transition: max-height .4s ease-out .1s;

  li {
    padding: 6px 12px;
  }

  a:hover {
    color: ${SECONDARY_COLOR};
    text-decoration: underline;
  }
`;

const ListMenu = styled.li`
  display: inline-block;
  position: relative;
  padding: 0 0 0 2em;
  font-weight: 500;
  @media (max-width: 414px) {
    display: none;
  }

  a {
    color: #000;
  }

  ul {
    max-height: 0;
    white-space: nowrap;
  }

  &:hover {
    ul {
      max-height: 360px;
    }
  }

  small {
    font-size: 12px;
  }
`;

const Home = styled(FaHome)`
  font-size: 40px;
`;

const StyledLink = styled(Link)`
  &.active {
    color: ${SECONDARY_COLOR};
    text-decoration: underline;
  }

  &:hover {
    color: ${SECONDARY_COLOR};
    text-decoration: underline;
  }
`;

const SearchBarWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 240px;
  margin: auto;
  padding: 0 36px 0 0;
  text-align: right;
  @media (max-width: 414px) {
    display: none;
    position: relative;
    padding: 0;
    width: 100%;
  }

  label {
    position: relative;
    padding: 0 8px 0 0;
    z-index: 1001;
  }
`;

const SearchBar = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 36px;
  margin: auto;
  padding: 0 .4em;
  width: 240px;
  height: 2.4em;
  line-height: 2.4em;
  border-radius: 0;
  border: 1px solid #555;
  font-size: 18px;
  outline: 0;
  z-index: 1000;
  @media (max-width: 414px) {
    display: none;
    right: 0;
    left: 0;
    width: 100%;
  }

  &:focus {
    border-color: ${PRIMARY_COLOR};
  }
`;

const SearchedPosts = styled.div`
  position: absolute;
  top: 100px;
  right: 3px;
  width: 317px;
  max-height: 500px;
  background-color: #fff;
  box-shadow: ${({ isEmpty }) => (isEmpty ? '0 0 0' : '0 2px 4px rgba(0,0,0,0.2)')};
  box-shadow: ${({ isEmpty }) => (isEmpty ? '0 0 0' : '0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)')};
  font-weight: 400;
  overflow-y: auto;
  @media (max-width: 414px) {
    display: none;
    position: static;
    width: 100%;
    max-height: none;
    box-shadow: 0 0 0;
  }
`;

const Title = styled.h4`
  width: 100%;
  height: 2.4em;
  line-height: 2.4em;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Summary = styled.p`
  cursor: pointer;
  margin: 0 0 2px;
  height: 1.8em;
  line-height: 1.8em;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Tag = styled.span`
  padding: 0 0 0 .4em;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchedPost = styled.article`
  padding: 4px 8px;
  border-bottom: 1px solid #eee;
  line-height: 1.4em;

  h4,
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Background = styled.div`
  display: none;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  transition: opacity .4s ease-out .1s;
  opacity: ${({ isActive }) => (isActive ? '.5' : '0')};
  @media (max-width: 414px) {
    display: block;
  }
`;

const MobileMenus = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 16px;
  width: 80%;
  height: 100%;
  background-color: #fff;
  transition: left.4s ease-out .1s;
  z-index: 3;
  overflow-y: auto;
  @media (max-width: 414px) {
    display: block;
  }
`;

const MobileMenu = styled.section`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @media (max-width: 414px) {
    display: block;
    line-height: 60px;
    pointer-events: ${({ isActive }) => (isActive ? 'all' : 'none')};

    ul,
    li,
    div,
    input {
      display: block;
    }
  }

  li {
    padding: 0;
    width: 100%;

    & > ul {
      position: static;
      max-height: ${({ isSubActive }) => (isSubActive ? '0' : '360px')} !important;
    }
  }

  & > div + div {
    left: ${({ isActive }) => (isActive ? '0' : '-100%')};
    box-shadow: ${({ isActive }) => (isActive ? '0 2px 4px rgba(0,0,0,0.2)' : '0 0 0')};
    box-shadow: ${({ isActive }) => (isActive ? '0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)' : '0 0 0')};
  }
`;

const Gnb = ({
  location,
  categories,
  postInformations,
  hasPortfolio,
  navigateToPath,
  inputKeyword,
  searchKeyword,
  isMenuOpened,
  openMenu,
  closeMenu,
  isSubMenuOpened,
  openSubMenu,
  closeSubMenu,
}) => {
  const filteredPosts = !isEmpty(searchKeyword)
    ? filter(({ category = '', title = '', tags = [] }) => {
      const c = toLower(category);
      const h = toLower(title);
      const t = map(toLower)(tags);

      const searchedWithCategory = c.search(searchKeyword) !== -1;
      const searchedWithTitle = h.search(searchKeyword) !== -1;
      const searchedWithTags = flow(
        filter(t => (t.search(searchKeyword) !== -1)),
        filtered => !isEmpty(filtered)
      )(t);

      return searchedWithCategory || searchedWithTitle || searchedWithTags;
    })(postInformations)
    : [];
  const { pathname } = location;
  const isPortfolio = flow(
    replace(/\/$/, ''),
    startsWith('/portfolios')
  )(pathname);
  const isHome = flow(
    replace(/\/$/, ''),
    isEqual('')
  )(pathname);
  const isResume = flow(
    replace(/\/$/, ''),
    isEqual('/resume')
  )(pathname);
  const isPost = !(isPortfolio || isHome || isResume);

  return (
    <GnbWrapper>
      <MobileMenu isActive={isMenuOpened} isSubActive={isSubMenuOpened}>
        <Background onClick={closeMenu} isActive={isMenuOpened} />
        <MobileMenus>
          <ul>
            <ListMenu>
              <StyledLink to="/" onClick={closeMenu}>
                <Home />
              </StyledLink>
            </ListMenu>
            <ListMenu>
              <StyledLink to="/pages/1" className={isPost ? 'active' : ''} onClick={closeMenu}>
                Posts
              </StyledLink>
              {
                size(categories)
                  ? (
                    <Fragment>
                      &nbsp;
                      <MovableFaCaretDown
                        className={isSubMenuOpened ? 'is-active' : ''}
                        onClick={isSubMenuOpened ? closeSubMenu : openSubMenu}
                      />
                    </Fragment>
                  )
                  : null
              }
              <SubMenu>
                <div>
                  {flow(
                    filter(({ key }) => !isEqual('__ALL__')(key)),
                    map(({ key, length }) => (
                      <li key={key}>
                        <Link to={`/categories/${key}/1`} onClick={closeMenu}>
                          {key}
                          &nbsp;
                          <small>
                            {`(${length})`}
                          </small>
                        </Link>
                      </li>
                    ))
                  )(categories)}
                </div>
              </SubMenu>
            </ListMenu>
            {hasPortfolio ? (
              <ListMenu>
                <StyledLink to="/portfolios" className={isPortfolio ? 'active' : ''} onClick={closeMenu}>
                  Portfolio
                </StyledLink>
              </ListMenu>
            ) : null}
            <ListMenu>
              <StyledLink to="/resume" className={isResume ? 'active' : ''} onClick={closeMenu}>
                Resume
              </StyledLink>
            </ListMenu>
            <SearchBarWrapper>
              <label htmlFor="search">
                <FaSearch />
              </label>
              <SearchBar
                id="search"
                type="text"
                value={searchKeyword}
                onChange={flow(
                  get('target.value'),
                  inputKeyword,
                )}
              />
            </SearchBarWrapper>
            <SearchedPosts isEmpty={isEmpty(filteredPosts)}>
              {map(({ path, title, summary, tags }) => (
                <SearchedPost key={path}>
                  <Title onClick={() => { navigateToPath(path); }}>
                    {title}
                  </Title>
                  <Summary onClick={() => { navigateToPath(path); }}>
                    {summary}
                  </Summary>
                  {size(tags) ? (
                    <FaTags />
                  ) : null}
                  {flow(
                    uniq,
                    map(tag => (
                      <Tag key={tag} onClick={() => { navigateToPath(`/tags/${tag}/1`); }}>
                        <small>
                          {tag}
                        </small>
                      </Tag>
                    ))
                  )(tags)}
                </SearchedPost>
              ))(filteredPosts)}
            </SearchedPosts>
          </ul>
        </MobileMenus>
      </MobileMenu>
      <Hamburger
        className={`hamburger hamburger--spin js-hamburger ${isMenuOpened ? 'is-active' : ''}`}
        onClick={isMenuOpened ? closeMenu : openMenu}
      >
        <div className="hamburger-box">
          <div className="hamburger-inner" />
        </div>
      </Hamburger>
      <ul>
        <ListMenu>
          <StyledLink to="/">
            <Home />
          </StyledLink>
        </ListMenu>
        <ListMenu>
          <StyledLink to="/pages/1" className={isPost ? 'active' : ''}>
            Posts
            &nbsp;
            {size(categories) ? <FaCaretDown /> : null}
          </StyledLink>
          <SubMenu>
            <div>
              {flow(
                filter(({ key }) => !isEqual('__ALL__')(key)),
                map(({ key, length }) => (
                  <li key={key}>
                    <Link to={`/categories/${key}/1`}>
                      {key}
                      &nbsp;
                      <small>
                        {`(${length})`}
                      </small>
                    </Link>
                  </li>
                ))
              )(categories)}
            </div>
          </SubMenu>
        </ListMenu>
        {hasPortfolio ? (
          <ListMenu>
            <StyledLink to="/portfolios" className={isPortfolio ? 'active' : ''}>
              Portfolio
            </StyledLink>
          </ListMenu>
        ) : null}
        <ListMenu>
          <StyledLink to="/resume" className={isResume ? 'active' : ''}>
            Resume
          </StyledLink>
        </ListMenu>
        <SearchBarWrapper>
          <label htmlFor="search">
            <FaSearch />
          </label>
          <SearchBar
            id="search"
            type="text"
            value={searchKeyword}
            onChange={flow(
              get('target.value'),
              inputKeyword,
            )}
          />
        </SearchBarWrapper>
        <SearchedPosts isEmpty={isEmpty(filteredPosts)}>
          {map(({ path, title, summary, tags }) => (
            <SearchedPost key={path}>
              <Title onClick={() => { navigateToPath(path); }}>
                {title}
              </Title>
              <Summary onClick={() => { navigateToPath(path); }}>
                {summary}
              </Summary>
              {size(tags) ? (
                <FaTags />
              ) : null}
              {flow(
                uniq,
                map(tag => (
                  <Tag key={tag} onClick={() => { navigateToPath(`/tags/${tag}/1`); }}>
                    <small>
                      {tag}
                    </small>
                  </Tag>
                ))
              )(tags)}
            </SearchedPost>
          ))(filteredPosts)}
        </SearchedPosts>
      </ul>
    </GnbWrapper>
  );
};

Gnb.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  postInformations: PropTypes.arrayOf(PropTypes.shape({})),
  hasPortfolio: PropTypes.bool.isRequired,
  navigateToPath: PropTypes.func.isRequired,
  inputKeyword: PropTypes.func.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  isSubMenuOpened: PropTypes.bool.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  closeSubMenu: PropTypes.func.isRequired,
};

Gnb.defaultProps = {
  categories: [],
  postInformations: [],
};

export default Gnb;
