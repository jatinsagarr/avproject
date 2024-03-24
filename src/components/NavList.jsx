//import React, { useState, useEffect ,useLayoutEffect,useRef} from 'react';

function NavList({items = [],data = {isOver : false,listItems : []}}) {
    return ( 
        <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
                <>
                {
                  
                  data.listItems.map((value) => {
                    return <li key={value + Math.random().toString()}>
                            <div className="nav__link">{value}</div>
                        </li>;
                  })
                }

                {
                   
                 (data.isOver) ?
                    <li className="dropdown__item">
                        <div className="nav__link">
                        More <i className="ri-arrow-down-s-line dropdown__arrow"></i>
                        </div>

                        <ul className="dropdown__menu">

                            {
                                  items.map((value,index) => {
                                    if(index >= data.listItems.length){
                                         return  <li key={value + Math.random().toString()}>
                                                <div className="dropdown__link">
                                                    <i className="ri-user-line"></i> {value}
                                                </div>                          
                                            </li>;
                                    }
                               })
                            }
                        </ul>
                    </li> : null

                 }
                </>
            </ul>
        </div>
    );
}

export default NavList;