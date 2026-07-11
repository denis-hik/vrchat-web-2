import React, {useCallback, useMemo} from "react";
import {Language} from "../../types";
import {translations} from "../../translations";
import {languageSelector} from "../../../../Context/selectors";
import {setLanguage} from "../../../../Context/reducer/globalSlice";
import {useAppDispatch} from "../../../../store/hooks";
import {useSelector} from "react-redux";
import {ProfileCard} from "../ProfileCard/ProfileCard";
import {LanguageSwitch} from "../LanguageSwitch/LanguageSwitch";
import {AboutCard} from "../AboutCard/AboutCard";
import {StatsGrid} from "../StatsGrid/StatsGrid";
import {WorksCard} from "../WorksCard/WorksCard";

export const QuickContent = () => {
    const dispatch = useAppDispatch();
    const language = useSelector(languageSelector);
    const text = useMemo(() => translations[language], [language]);

    const handleLanguageChange = useCallback((nextLanguage: Language) => {
        dispatch(setLanguage(nextLanguage));
    }, [dispatch]);

    return (
        <section className={"quick-shell"}>
            <ProfileCard status={text.status} trustRank={text.trustRank} lead={text.lead} website={text.website} />

            <div className={"right-column"}>
                <LanguageSwitch language={language} label={text.languageLabel} onChange={handleLanguageChange} />
                <AboutCard title={text.aboutTitle} text={text.aboutText} />
                <StatsGrid stats={text.stats} />
                <WorksCard />
            </div>
        </section>
    );
};
