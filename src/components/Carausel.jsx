import {useState,useMemo, useRef,useEffect} from 'react';

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

    slidesDimensions = [
        {zindex : 20,height:"var(--slide-height-zero)",width : "var(--slide-width)"},
        {zindex : 30,height:"var(--slide-height-one)",width : "var(--slide-width)"},
        {zindex : 40,height:"var(--slide-height-two)",width : "var(--slide-width)"},
        {zindex : 30,height:"var(--slide-height-one)",width : "var(--slide-width)"},
        {zindex : 20,height:"var(--slide-height-zero)",width : "var(--slide-width)"},
    ]

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

    leftShift = () => {
        let firstSlide = this.slides[0];
        for(let idx = 0;idx <this.slides.length - 1;idx++){
           this.slides[idx] = this.slides[idx + 1];
        }
        this.slides[this.slides.length - 1] = firstSlide;
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
            extractData.push({...imagesData[idxTemp],...refObj.slidesDimensions[idxTemp]});
            idx++;
        }
    
    },[extractData,refObj.slidesDimensions,imagesData]);

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
    let slide = refObj.getSlides(idx);

    return ( 
            <div className="imgParent" ref={ref} style={{
                zIndex:value.zindex,
                height:value.height,
                width:value.width,
                transform : `translateX(${slide.tx[idx]}%)`
            }}>
                <p>{value.title}</p>
                <div className="imgContainer">
                    <img src={value.src} className="mainImage" alt={value.title}></img>
                </div>
            </div>
     );
}

function CarouselController({extractData,refObj = new SlidesProvider()}){
    const [cntIdx,setCntIdx] = useState(2);

    let transistionData = refObj.slidesDimensions;
    console.log(transistionData);
    useEffect(() => {
      let timer = setInterval(()=>{
           rightNext();
      },2500);

      return () => {
         clearInterval(timer);
      }
    });
    

    const rightNext = () => {
        let slidesLength = refObj.slides.length;

        for(let idx = 0;idx < slidesLength;idx++){
            const slide = refObj.getSlides(idx);
            const {current} = slide.ref;

            let nextIdx = (slidesLength - 1 === idx) ? 0 : idx + 1;
           
            //console.log(`${idx} ${current.style.height} -- ${current.style.width} ${current.style.transform} ${current.style.zIndex}`);
      
            current.style.height = transistionData[nextIdx].height;
            current.style.width = transistionData[nextIdx].width;
            current.style.transform = `translateX(${slide.tx[nextIdx]}%)`;
            current.style.zIndex = transistionData[nextIdx].zindex;
             
            //console.log(`${idx} ${current.style.height} -- ${current.style.width} ${current.style.transform} ${current.style.zIndex}`);
        }

        refObj.rightShift();
        setCntIdx((cntIdx + 1) % slidesLength);
        //console.log(refObj.slides);
    }

    const leftNext = () => {
        let slidesLength = refObj.slides.length;

        for(let idx = slidesLength - 1;idx >= 0;idx--){
            const slide = refObj.getSlides(idx);
            const {current} = slide.ref;

            let prevIdx = (idx === 0) ? slidesLength - 1 : idx - 1;
           
            //console.log(`${idx} ${current.style.height} -- ${current.style.width} ${current.style.transform} ${current.style.zIndex}`);
      
            current.style.height = transistionData[prevIdx].height;
            current.style.width = transistionData[prevIdx].width;
            current.style.transform = `translateX(${slide.tx[prevIdx]}%)`;
            current.style.zIndex = transistionData[prevIdx].zindex;
             
            //console.log(`${idx} ${current.style.height} -- ${current.style.width} ${current.style.transform} ${current.style.zIndex}`);
        }

        refObj.leftShift();
        setCntIdx((cntIdx === 0) ? slidesLength - 1 : cntIdx - 1);
        
        //console.log(refObj.slides);
    }

    return (  
        <div className='indicator'>
            <i class="ri-arrow-left-line" onClick={leftNext}></i>
            {
                extractData.map((value,idx) => {
                    return <i key={idx} className={`ri-checkbox-blank-circle-fill ${(idx === cntIdx) ? "selected" : ""}`}></i>;
                })
            }
            <i class="ri-arrow-right-line"  onClick={rightNext}></i>
        </div>
    );
}

export default Carousel;
