import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {MdContentCopy} from "react-icons/md";
import {QuickPageStyled} from "./styled";
import {QuickBackground} from "./blocks/QuickBackground/QuickBackground";
import {QuickContent} from "./blocks/QuickContent/QuickContent";
import {ContextMenu} from "./blocks/ContextMenu/ContextMenu";
import {languageSelector} from "../../Context/selectors";
import {translations} from "./translations";

const CopyIcon = MdContentCopy as React.FC;

const QuickPage = () => {
    const language = useSelector(languageSelector);
    const text = useMemo(() => translations[language], [language]);
    const [contextMenu, setContextMenu] = useState({
        show: false,
        x: 0,
        y: 0,
        url: "",
    });

    const copyToClipboard = useCallback((value: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(value);
            return;
        }

        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }, []);

    const handlePageContextMenu = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu((current) => ({...current, show: false}));
    }, []);

    const handleLinkContextMenu = useCallback((event: React.MouseEvent, url: string) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({
            show: true,
            x: event.clientX,
            y: event.clientY,
            url,
        });
    }, []);

    const options = useMemo(() => [
        {
            label: text.copyUrl,
            icon: <CopyIcon />,
            onClick: () => {
                copyToClipboard(contextMenu.url);
                setContextMenu((current) => ({...current, show: false}));
            },
        },
    ], [contextMenu.url, copyToClipboard, text.copyUrl]);

    useEffect(() => {
        if (!contextMenu.show) {
            return;
        }

        const closeMenu = () => {
            setContextMenu((current) => ({...current, show: false}));
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        window.addEventListener("click", closeMenu);
        window.addEventListener("scroll", closeMenu, true);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("click", closeMenu);
            window.removeEventListener("scroll", closeMenu, true);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [contextMenu.show]);

    return (
        <QuickPageStyled className={"scrl"} onContextMenu={handlePageContextMenu}>
            <QuickBackground />
            <QuickContent onLinkContextMenu={handleLinkContextMenu} />
            <ContextMenu
                show={contextMenu.show}
                x={contextMenu.x}
                y={contextMenu.y}
                options={options}
            />
        </QuickPageStyled>
    );
};

export default QuickPage;
