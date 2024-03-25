import {useState,useMemo, useRef} from 'react';

class SlidesProvider{
    imagesData = [
        {src : "https://picsum.photos/seed/imag1/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag2/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag3/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag4/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag5/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag6/600/400",title : "Modern kitchen utensils"},
        {src : "https://picsum.photos/seed/imag7/600/400",title : "Modern kitchen utensils"},
    ];

    slides = [];
    taranslationData = [
        [100,150,200,250,300],
        [0,50,100,150,200],
        [-100,-50,0,50,100],
        [-200,-150,-100,-50,0],
        [-300,-250,-200,-150,-100],
    ]
    // taranslationData = [
    //     [100,150,200,267,380],
    //     [0,50,100,166,260],
    //     [-120,-50,0,50,120],
    //     [-260,-167,-100,-50,0],
    //     [-380,-267,-185.8,-150,-100],
    // ]

    getSlides = (idx) =>{
        return this.slides[idx];
    }

    pushSlides = (value,idx) => {
        this.slides.push({
            ref : value,
            tx : this.taranslationData[idx]
        });
    }
    
    rightShift = () => {
        let lastSlide = this.slides[this.slides.length - 1];
        for(let idx = this.slides.length - 1;idx > 0;idx--){
           this.slides[idx] = this.slides[idx - 1];
        }
        this.slides[0] = lastSlide;
    }
    setSlides = (idx,value) =>{
       this.slides[idx] = {
          ref : value,
          tx : this.taranslationData[idx]
       }
    }
}

function Carousel() {
    let refObj = new SlidesProvider();
    let extractData = [];
    let imagesData = refObj.imagesData;
    
    useMemo(() => {
        let idx = 0;
        while(extractData.length < 5){
            let idxTemp = idx % imagesData.length;
    
            switch (idxTemp){
                case 0:
                    extractData.push({...imagesData[idxTemp],left : "100%",zindex : 20,height:"15rem",width:"35rem"});
                    break;
                case 1:
                    extractData.push({...imagesData[idxTemp],left : "50%",zindex : 30,height:"20rem",width:"35rem"});
                    break;
                case 2:
                    extractData.push({...imagesData[idxTemp],left : "0%",zindex : 40,height:"25rem",width:"35rem"});
                    break;
                case 3:
                    extractData.push({...imagesData[idxTemp],left : "-50%",zindex : 30,height:"20rem",width:"35rem"});
                    break;
                case 4:
                    extractData.push({...imagesData[idxTemp],left : "-100%",zindex : 20,height:"15rem",width:"35rem"});
                    break;
                default:
                    break;
                
            }
            idx++;
        }
    
    },[extractData]);

    return (
        <div className="carContainer">
            <div className='imgWrapper'>
                 {
                            extractData.map((value,idx)=>{
                                refObj.pushSlides(idx,idx);
                                return <ImageContainer key={idx} idx={idx} value={value} refObj={refObj}></ImageContainer>
                            })
                 }
            </div>
            <CarouselController extractData={extractData} refObj={refObj}></CarouselController>
        </div>
    );
}

function ImageContainer({value,idx,refObj = new SlidesProvider()}) {
    const ref = useRef();
    refObj.setSlides(idx,ref);

    let transistionData = [
        {min : "100",max : "300",zindex : 20,height:"15rem",width:"35rem"},
        {min : "0",max : "200",zindex : 30,height:"20rem",width:"35rem"},
        {min : "-100",max : "100",zindex : 40,height:"25rem",width:"35rem"},
        {min : "-200",max : "0",zindex : 30,height:"20rem",width:"35rem"},
        {min : "-300",max : "-100",zindex : 20,height:"15rem",width:"35rem"},
    ];
    // let transistionData = [
    //     {min : "100",max : "300",zindex : 20,height:"15rem",width:"25rem"},
    //     {min : "0",max : "200",zindex : 30,height:"20rem",width:"30rem"},
    //     {min : "-100",max : "100",zindex : 40,height:"25rem",width:"35rem"},
    //     {min : "-200",max : "0",zindex : 30,height:"20rem",width:"35rem"},
    //     {min : "-300",max : "-100",zindex : 20,height:"15rem",width:"25rem"},
    // ];

    return ( 
            <div className="imgParent" ref={ref} style={{
                zIndex:value.zindex,
                height:value.height,
                width:value.width,
                transform : `translateX(${value.left})`
            }}>
                <p>{value.title}</p>
                <div className="imgContainer">
                    <img src={value.src} className="mainImage"></img>
                </div>
            </div>
     );
}

function CarouselController({extractData,refObj = new SlidesProvider()}) {
    const [cntIdx,setCntIdx] = useState(2);

    let transistionData = [
        {min : "100",max : "300",zindex : 20,height:"15rem",width:"35rem"},
        {min : "0",max : "200",zindex : 30,height:"20rem",width:"35rem"},
        {min : "-100",max : "100",zindex : 40,height:"25rem",width:"35rem"},
        {min : "-200",max : "0",zindex : 30,height:"20rem",width:"35rem"},
        {min : "-300",max : "-100",zindex : 20,height:"15rem",width:"35rem"},
    ];
    return (  
        <div className='indicator'>
            <i class="ri-arrow-left-line"></i>
            {
                extractData.map((value,idx) => {
                    return <i key={idx} className="ri-checkbox-blank-circle-fill"></i>;
                })
            }
            <i class="ri-arrow-right-line"  onClick={()=>{
                console.log("--------------------------");
                let slidesLength = refObj.slides.length;

                for(let idx = 0;idx < slidesLength;idx++){
                    const slide = refObj.getSlides(idx);
                    const {current} = slide.ref;

                    let nextIdx = (slidesLength - 1 == idx) ? 0 : idx + 1;
                    console.log(slide);

                    console.log(`${idx} ${current.style.height} -- ${current.style.width} ${current.style.transform} ${current.style.zIndex}`);
              
                    current.style.height = transistionData[nextIdx].height;
                    current.style.width = transistionData[nextIdx].width;
                    current.style.transform = `translateX(${slide.tx[nextIdx]}%)`;
                    current.style.zIndex = transistionData[nextIdx].zindex;
                     
                    console.log(`${idx} ${current.style.height} -- ${current.style.width} ${current.style.transform} ${current.style.zIndex}`);
                }

                refObj.rightShift();
                console.log(refObj.slides);
                
                
               
                // lastRef.current.style.height = transistionData[0].height;
                // lastRef.current.style.width = transistionData[0].width;
                // lastRef.current.style.transform = `translateX(${transistionData[lastIndex].min}%)`;
                // lastRef.current.style.zIndex = transistionData[0].zindex;


            }}></i>
        </div>
    );
}

export default Carousel;
