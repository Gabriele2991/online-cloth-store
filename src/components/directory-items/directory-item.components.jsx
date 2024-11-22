import {BackgroundImage, Body, DirectoryItemContainer} from "./directory-item.styles";
//import { useNavigate } from "react-router-dom";
const DirectoryItem = ({category}) =>{
    
    //I used the way to change the Body in a LINK in the stylesheet BUT
    //we can use the HOOK useNavigate, passing the created route in the document
    //that handle the images in homepage in JsonDirectory and use it in useNavigate

    const {title, imageUrl, /*route*/ } = category;

    // const navigate = useNavigate();
    // const onNavigateHandler = ()=>navigate(route;)

    return(
    
    <DirectoryItemContainer /*onClick={onNavigateHandler}*/>
        <BackgroundImage imageUrl={imageUrl} />
        <Body to={"shop/" + title.toLowerCase()}>
            <h2>{title}</h2>
            <p>Shop Now</p>
        </Body>
    </DirectoryItemContainer>
)}
export default DirectoryItem;
