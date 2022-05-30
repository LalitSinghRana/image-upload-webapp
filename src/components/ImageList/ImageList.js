import { IKImage } from 'imagekitio-react';
import { useState } from "react";
import './ImageList.css'
import consts from '../../consts';

const urlEndpoint = consts.URL_ENDPOINT;

// Array to store image links from server. 
// Using array instead of useState for faster loading of UI.
let imageArray = [];

// fetching last 5 images from server and storing them in imageArray
fetch(`http://localhost:3001/list`)
  .then(res => res.json())
  .then(data => imageArray = data)

function ImageList(props) {
  const [style, setStyle] = useState("");

  const getUrlFun = (img) => {
      setStyle(img);
      props.setUrl(img);
  }

  const listItems = imageArray.map((img) =>
    <li key={img.toString()} onClick={() => getUrlFun(img)}>
      {
        style!==img ?
        <IKImage
          urlEndpoint={urlEndpoint}
          src={img}
          className="final"
        /> :
        <IKImage
          urlEndpoint={urlEndpoint}
          src={img}
          className="initial"
        />
      }
    </li>
  );

  return (
    <>
      <ul>{listItems}</ul>
    </>
  );
}

export default ImageList;
export  { imageArray };




















// const [uploadedImage, setUploadedImage] = useState([]);

// fetch(`http://localhost:3001/list`)
//     .then(res => res.json())
//     .then(data => {
//         setUploadedImage([...data])
//     })



/* <ul>
{
  uploadedImage.map((img) =>
  <li key={img.toString()} onClick={() => getUrlFun(img)}>
  {
    style==img ?
      <IKImage
          urlEndpoint={urlEndpoint}
          src={img}
          className="final"
          // width="100"
      /> :
      <IKImage
        urlEndpoint={urlEndpoint}
        src={img}
        className="initial"
        // width="100"
    />
  }
</li>
  )
}
</ul> */
/* {
uploadedImage.length==0 ? (
  <ul>{listItems}</ul>
) : (
  <ul>
{
  uploadedImage.map((img) =>
  <li key={img.toString()} onClick={() => getUrlFun(img)}>
  {
    style==img ?
      <IKImage
          urlEndpoint={urlEndpoint}
          src={img}
          className="final"
          // width="100"
      /> :
      <IKImage
        urlEndpoint={urlEndpoint}
        src={img}
        className="initial"
        // width="100"
    />
  }
</li>
  )
}
</ul>
)
} */