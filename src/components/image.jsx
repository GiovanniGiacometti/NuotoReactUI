import ImageMapper from 'react-img-mapper';


export default function ImageBody({targetSelection, first}){

    const lineWidth = 5;
    const fillColorChosen = "blue";
    const fillColorNotChosen = "pink";
    const strokeColor = "black"
    const URL = "images/download.png";
    var MAP = {
        name: 'bodymap',
        areas: [
            {
              "id": "Head",
              "title": "Head",
              "shape": "poly",
              "name": "Head",
              "coords": [
                117,6,107,8,99,15,94,26,93,33,93,39,97,50,100,56,101,67,107,67,131,67,133,58,133,53,139,49,141,40,140,31,141,23,133,12,128,7
              ]
            },
            {
                "id": "RightShoulder",
                "title": "RightShoulder",
                "shape": "poly",
                "name": "RightShoulder",
                "coords": [
                    100,73,72,84,63,103,83,105,108,87
                ]
              },
              {
                "id": "LeftShoulder",
                "title": "LeftShoulder",
                "shape": "poly",
                "name": "LeftShoulder",
                "coords": [
                    138,75,129,85,148,103,170,103,166,85,152,78
                ]
              },
              {
                "id": "RightElbow",
                "title": "RightElbow",
                "shape": "poly",
                "name": "RightElbow",
                "coords": [
                    45,161,55,143,77,151,65,171
                ]
              },
              {
                "id": "LeftElbow",
                "title": "LeftElbow",
                "shape": "poly",
                "name": "LeftElbow",
                "coords": [
                    153,141,174,137,183,157,161,167,152,155
                ]
              },
          ],
    };

    
    for (let i=0;i<MAP["areas"].length;i++){
        if(i===first){
          MAP["areas"][i]["preFillColor"] = fillColorChosen;
          MAP["areas"][i]["active"] = true;
        }
        else{
          MAP["areas"][i]["active"] = false;
          MAP["areas"][i]["preFillColor"] = fillColorNotChosen;
        }
    }
   

    return <ImageMapper 
                width={170} 
                imgWidth={221} 
                src={URL} 
                map={MAP} 
                onClick={area => targetSelection(area.id)} 
                stayHighlighted 
                strokeColor={strokeColor}  
                lineWidth={lineWidth}/>;

}


    // // console.log(MAP);
    // // console.log(first);

    // // const imageMapperRef = useRef(null);
    // const ref = useRef(null);

    // useEffect(() => {
    //   if(first && ref.current){
    //     console.log("Id");
    //     const event = new CustomEvent("click",{ detail: {"id":0} })
    //     ref.current.click();
        
    //   }
    // });

    // var onLoad = ()=>{
    //   if(first && ref.current){
    //     console.log("Id");
    //     const event = new CustomEvent("click",{ detail: {"id":0} })
    //     ref.current.click();
        
    //   }
    // }
