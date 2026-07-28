import React, {useCallback, useMemo} from "react";
import {Language} from "../../types";
import {translations} from "../../translations";
import {languageSelector} from "../../../../Context/selectors";
import {setLanguage} from "../../../../Context/reducer/globalSlice";
import {saveLanguage} from "../../../../Context/reducer/init";
import {useAppDispatch} from "../../../../store/hooks";
import {useSelector} from "react-redux";
import {ProfileBlock} from "../ProfileBlock";
import {LanguageSwitch} from "../LanguageSwitch/LanguageSwitch";
import {MeBlock} from "../MeBlock";
import {HintBlock} from "../HintBlock";
import {WorksBlock} from "../WorksBlock";

type QuickContentProps = {
    onLinkContextMenu: (event: React.MouseEvent, url: string) => void;
};

export const QuickContent = ({onLinkContextMenu}: QuickContentProps) => {
    const dispatch = useAppDispatch();
    const language = useSelector(languageSelector);
    const text = useMemo(() => translations[language], [language]);

    const handleLanguageChange = useCallback((nextLanguage: Language) => {
        saveLanguage(nextLanguage);
        dispatch(setLanguage(nextLanguage));
    }, [dispatch]);

    return (
        <section className={"quick-shell"}>
            <ProfileBlock status={text.status} trustRank={text.trustRank} lead={text.lead} website={text.website} onLinkContextMenu={onLinkContextMenu} />

            <div className={"right-column"}>
                <LanguageSwitch language={language} label={text.languageLabel} onChange={handleLanguageChange} />
                <MeBlock title={text.aboutTitle} text={text.aboutText} />
                <HintBlock stats={text.stats} />
                <WorksBlock onLinkContextMenu={onLinkContextMenu} />
            </div>
        </section>
    );
};
