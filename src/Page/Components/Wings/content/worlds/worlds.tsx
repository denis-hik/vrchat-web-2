import {WingsContentWorldsStyled} from "./styled";
import {Card} from "../../../../../Components/General/My/Card/Card";
import {useSelector} from "react-redux";
import {worldsSelector} from "../../../../../Context/selectors";

export const WorldsItemContent = () => {
    const worlds = useSelector(worldsSelector)

    return (
        <WingsContentWorldsStyled>
            {worlds.map((world, index) => (<Card
                key={index}
                className={"item"}
                image={world.image}
                description={world.name}
            />))}
        </WingsContentWorldsStyled>
    )
}