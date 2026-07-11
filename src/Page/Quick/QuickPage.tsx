import React, {useMemo, useState} from "react";
import {QuickPageStyled} from "./styled";
import {Language} from "./types";
import {translations} from "./translations";
import {QuickBackground} from "./blocks/QuickBackground/QuickBackground";
import {ProfileCard} from "./blocks/ProfileCard/ProfileCard";
import {LanguageSwitch} from "./blocks/LanguageSwitch/LanguageSwitch";
import {AboutCard} from "./blocks/AboutCard/AboutCard";
import {StatsGrid} from "./blocks/StatsGrid/StatsGrid";
import {ImageSlotsCard} from "./blocks/ImageSlotsCard/ImageSlotsCard";

const getInitialLanguage = (): Language => {
    if (typeof navigator === "undefined") return "en";

    return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
};

const QuickPage = () => {
    const [language, setLanguage] = useState<Language>(getInitialLanguage);
    const text = useMemo(() => translations[language], [language]);

    return (
        <QuickPageStyled>
            <QuickBackground />
            <section className={"quick-shell"}>
                <ProfileCard status={text.status} lead={text.lead} website={text.website} />

                <div className={"right-column"}>
                    <LanguageSwitch language={language} label={text.languageLabel} onChange={setLanguage} />
                    <AboutCard title={text.aboutTitle} text={text.aboutText} />
                    <StatsGrid stats={text.stats} />
                    <ImageSlotsCard title={text.imagesTitle} text={text.imagesText} slots={text.imageSlots} />
                </div>
            </section>
        </QuickPageStyled>
    );
};

export default QuickPage;
