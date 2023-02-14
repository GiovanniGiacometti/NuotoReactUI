import React from 'react';
import ImageMapper from 'react-img-mapper';


export default function Image ({targetSelection}){
    const lineWidth = 3;
    const fillColor = "blue";
    const strokeColor = "black"
    const URL = "images/download.png";
    const MAP = {
        name: 'bodymap',
        areas: [
            {
              "id": "Head",
              "title": "Head",
              "shape": "poly",
              "name": "Head",
              "fillColor": fillColor,
              "strokeColor": strokeColor,
              "lineWidth" : lineWidth,
              "coords": [
                117,6,107,8,99,15,94,26,93,33,93,39,97,50,100,56,101,67,107,67,131,67,133,58,133,53,139,49,141,40,140,31,141,23,133,12,128,7
              ]
            },
            {
                "id": "RightShoulder",
                "title": "RightShoulder",
                "shape": "poly",
                "name": "RightShoulder",
                "fillColor": fillColor,
                "strokeColor": strokeColor,
                "lineWidth" : lineWidth,
                "coords": [
                    100,73,72,84,63,103,83,105,108,87
                ]
              },
              {
                "id": "LeftShoulder",
                "title": "LeftShoulder",
                "shape": "poly",
                "name": "LeftShoulder",
                "fillColor": fillColor,
                "strokeColor": strokeColor,
                "lineWidth" : lineWidth,
                "coords": [
                    138,75,129,85,148,103,170,103,166,85,152,78
                ]
              },
              {
                "id": "RightElbow",
                "title": "RightElbow",
                "shape": "poly",
                "name": "RightElbow",
                "fillColor": fillColor,
                "strokeColor": strokeColor,
                "lineWidth" : lineWidth,
                "coords": [
                    45,161,55,143,77,151,65,171
                ]
              },
              {
                "id": "LeftElbow",
                "title": "LeftElbow",
                "shape": "poly",
                "name": "LeftElbow",
                "fillColor": fillColor,
                "strokeColor": strokeColor,
                "lineWidth" : lineWidth,
                "coords": [
                    153,141,174,137,183,157,161,167,152,155
                ]
              },
          ],
    };

    return <ImageMapper src={URL} map={MAP} onClick={area => targetSelection(area.id)} stayHighlighted={true} />
}