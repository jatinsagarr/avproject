import {useRef,useLayoutEffect,useEffect, useState} from 'react';
import Logo from './Logo';
import NavToggle from './NavToggle';
import NavList from './NavList';
import SearchBox from './SearchBox';

function Header() {
    const items = ["Home","Electronics","Books","Music","Movies","Clothings","Games","Furniture","Electronics","Travel","Botanical","fjgfjfg","dgjdfjd","dkdfk","dfjdh","djfhfg"];
    const [data,setData] = useState({isOver : false,listItems : []});
    const ref = useRef();
    
    useLayoutEffect(() => {
        const {current} = ref;
        const hasOverflow = current.scrollWidth > current.clientWidth;
        console.log(`Width :: ${current.scrollWidth} -- ${current.clientWidth}`);

        if(hasOverflow && !data.isOver){
            console.log("Container is OverFlowed Now...",data.listItems);
            setData((val) =>{
                let itemsTemp = val.listItems;
                if(itemsTemp.length) itemsTemp.pop();
                if(itemsTemp.length) itemsTemp.pop();
                return {
                    isOver : true,
                    listItems : [...itemsTemp]
                }
            });
            return;
        }
        console.log(`LayoutEffect OverFlow Status :: ${hasOverflow} ${data.isOver}`,data.listItems);
    
        if(!data.isOver){
            setData((val) =>{
                if(val.listItems.length < items.length){
                    return {
                        isOver : val.isOver,
                        listItems : [...val.listItems,items[val.listItems.length]]
                    }
                }
                return val;
            });
        }
    },[data.isOver,data.listItems,items]);

    useEffect(() => {
        const handleResize = () => {
            setData((val)=>{
                return{
                    isOver : false,
                    listItems : []
                }
            })
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (  
        <header className="header">
            <nav className="nav container" ref={ref}>
                <div className="nav__data">
                    <Logo siteName={"ECOMM"}></Logo>
                    <NavToggle></NavToggle>
                </div>
                <NavList data={data} items={items}></NavList>
                <SearchBox></SearchBox>
            </nav>
        </header>
    );
}

export default Header;