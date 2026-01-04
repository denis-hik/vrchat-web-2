import {BottomItemContentStyled} from "./styled";
import {useSelector} from "react-redux";
import {linksSelector} from "../../../../../Context/selectors";

export const BottomItemContent = () => {
    const links = useSelector(linksSelector);

    return (
        <BottomItemContentStyled>
            {links.map((link, index) => (<a
                key={index}
                href={link.url}
                className={"item-link"}
                target={"_blank"}
            >
                {link.icon !== "JinxXy" && <img alt={String(index)} src={link.icon}/>}
                {link.icon === "JinxXy" ? <span className={"JinxXy"}>JinxXy</span> : ''}
            </a>))}
        </BottomItemContentStyled>
    )
}