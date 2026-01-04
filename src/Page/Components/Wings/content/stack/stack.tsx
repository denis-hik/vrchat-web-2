import {WingsContentStackStyled} from "./styled";
import {Card} from "../../../../../Components/General/My/Card/Card";
import {useSelector} from "react-redux";
import {stacksSelector} from "../../../../../Context/selectors";

export const StackItemContent = () => {
    const stacks = useSelector(stacksSelector)

    return (
        <WingsContentStackStyled>
            {stacks.map((world, index) => (<Card
                key={index}
                className={"item"}
                image={world.image}
                description={world.name}
                borderColor={"rgba(255,255,255,0.07)"}
                backgroundColor={"rgba(255,255,255,0.07)"}
            />))}
        </WingsContentStackStyled>
    )
}