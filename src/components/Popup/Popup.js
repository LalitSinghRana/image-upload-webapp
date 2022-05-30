import React from "react";
import { useState } from "react";
import './Popup.css'
import ImageKit from "imagekit-javascript"
import ImageList from "../ImageList/ImageList.js";
import { imageArray } from "../ImageList/ImageList.js";
import consts from "../../consts";
import logo from"../../upload-logo.png";

// Creating ImageKit auth instance
var imagekit = new ImageKit({
    publicKey : consts.PUBLIC_KEY,
    urlEndpoint : consts.URL_ENDPOINT,
    authenticationEndpoint : consts.AUTHENTICATION_ENDPOINT
});



function Popup(props) {
    // This useState is used to store image that is uploaded from PC/mobile
    const [selectedImage, setSelectedImage] = useState(logo);
    // This useState is for disabling upload button once clicked
    const [uploadBtnDisabled, setUploadBtnDisabled] = useState(false);

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        // checking for if file is not empty and file type is image only
        if (e.target.files && e.target.files.length > 0 && e.target.files[0].type.split("/")[0] === "image") {
            setSelectedImage(e.target.files[0]);
        }
    };

    // This function will upload image to ImageKit server
    function upload() {
        setUploadBtnDisabled(true)
        imagekit.upload({
            file : selectedImage,
            fileName : "abc.jpg",
            tags : ["tag1"]
        }, (err, res) => {
            if(res) {
                imageArray.unshift(res.thumbnailUrl)
                if(imageArray.length > 5) imageArray.pop()
                props.setUrl(res.url);
            }
            closePopup();
        })
    }

    // To go back to Home page
    const cancelButton = () => {
        props.setUrl(consts.DEFAULT_STRING_URL);
        closePopup();
    }

    // This function resets all useState
    const closePopup = () => {
        props.setTrigger(false);
        setSelectedImage(logo);
        setUploadBtnDisabled(false);
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="top-div">
                <img
                    src={selectedImage===logo ? logo : URL.createObjectURL(selectedImage)}
                    alt="Thumb"
                />
                {
                    selectedImage===logo ? (
                        <>
                            <label htmlFor="imageUpload" >Choose image</label>
                            <input
                                id="imageUpload"
                                accept="image/*"
                                type="file"
                                onChange={imageChange}
                            />
                        </>
                    ) :
                    (
                        <>
                            <button onClick={upload} disabled={uploadBtnDisabled} >Upload & Use</button>
                        </>
                    )
                }  
            </div>
            <h2>Your Images :</h2>
            <div className="mid-div">
                <ImageList setUrl={props.setUrl}/>
            </div>
            <div className="bottom-div">
                <button onClick={closePopup} >Use selected image</button>
                <button onClick={cancelButton} >Back</button>
            </div>
        </div>
    ) : "";
}

export default Popup;
