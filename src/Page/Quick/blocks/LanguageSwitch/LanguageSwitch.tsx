import React from "react";
import {Language} from "../../types";
import {LanguageSwitchStyled} from "./styled";

type LanguageSwitchProps = {
    language: Language;
    label: string;
    onChange: (language: Language) => void;
};

const languages: Language[] = ["ru", "en"];

export const LanguageSwitch = ({language, label, onChange}: LanguageSwitchProps) => {
    return (
        <LanguageSwitchStyled aria-label={label}>
            {languages.map((item) => (
                <button
                    className={language === item ? "active" : ""}
                    type={"button"}
                    onClick={() => onChange(item)}
                    key={item}
                >
                    {item.toUpperCase()}
                </button>
            ))}
        </LanguageSwitchStyled>
    );
};
