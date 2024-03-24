import { useState} from 'react';


function Carousel() {
    const [cntIdx,setCntIdx] = useState(2);

    let imagesData = [
        {src : "https://picsum.photos/seed/imag1/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag2/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag3/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag4/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag5/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag6/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag7/600/400",title : "Modern kitchen utensils"},
    ];

    let extractData = [];
    let idx = cntIdx - 2;
    while(extractData.length < 5){
        let idxTemp = idx % imagesData.length;

        switch (idxTemp) {
            case 0:
                extractData.push({...imagesData[idxTemp],left : "20%",zindex : 20,height:"15rem",width:"25rem"});
                break;
            case 1:
                extractData.push({...imagesData[idxTemp],left : "30%",zindex : 30,height:"20rem",width:"30rem"});
                break;
            case 2:
                extractData.push({...imagesData[idxTemp],left : "50%",zindex : 40,height:"25rem",width:"35rem"});
                break;
            case 3:
                extractData.push({...imagesData[idxTemp],left : "70%",zindex : 30,height:"20rem",width:"30rem"});
                break;
            case 4:
                extractData.push({...imagesData[idxTemp],left : "80%",zindex : 20,height:"15rem",width:"25rem"});
                break;
            default:
                break;
            
        }
        idx++;
    }

    console.log(extractData);
   
    return (
    //   <div className='wrapperContainer'>
        <div className="carContainer">
            {
                extractData.map((value,idx)=>{
                      return (
                        <div className="imgParent" key={idx} style={{left : value.left,zIndex : value.zindex,height:value.height,width:value.width}}>
                            <div className="imgContainer" data-title={value.title}>
                                <img src={value.src} className="mainImage"></img>
                            </div>
                        </div>
                      );
                })
            }

            <div className='indicator'>
                <i class="ri-arrow-left-line"></i>
                {
                    extractData.map((value,idx) => {
                        return <i class="ri-circle-fill"></i>;
                    })
                }
                <i class="ri-arrow-right-line"></i>
            </div>
            
        </div>
    //   </div>
    );
}

export default Carousel;