import React from "react";
import avatarImage from "../../../../media/quick/avatar-square.png";
import {ProfileCardStyled} from "./styled";
import {ActionLink} from "../ActionLink/ActionLink";

type ProfileCardProps = {
    status: string;
    trustRank: string;
    lead: string;
    website: string;
    onLinkContextMenu: (event: React.MouseEvent, url: string) => void;
};

export const ProfileCard = ({status, trustRank, lead, website, onLinkContextMenu}: ProfileCardProps) => {
    return (
        <ProfileCardStyled>
            <div className={"avatar-wrap"}>
                <img src={avatarImage} alt={"Denis Hik"} />
            </div>
            <div className={"profile-body"}>
                <div className={"status-row"}>
                    <div className={"trust-rank"}>
                        <span className={"trust-dot"} />
                        {trustRank}
                    </div>
                    <div className={"status"}>
                        <span className={"status-dot"} />
                        {status}
                    </div>
                </div>
                <h1>Denis Hik</h1>
                <p className={"lead"}>
                    {lead}
                </p>
                <div className={"quick-actions"}>
                    <ActionLink href={"https://vrchat.com/home/user/usr_cb88a031-8fae-4dd9-bbd2-8178636e2ee9"} variant={"vrchat"} onContextMenu={onLinkContextMenu}>
                        VRChat
                    </ActionLink>
                    <ActionLink href={"https://denishik.io"} variant={"secondary"} onContextMenu={onLinkContextMenu}>
                        {website}
                    </ActionLink>
                    <ActionLink href={"https://discord.com/users/370583534647246848"} variant={"secondary"} onContextMenu={onLinkContextMenu}>
                        Discord
                    </ActionLink>
                    <ActionLink href={"https://jinxxy.com/denis_hik"} variant={"jinxxy"} onContextMenu={onLinkContextMenu}>
                        JinxXy
                    </ActionLink>
                    <ActionLink href={"https://denishik.gumroad.com"} variant={"secondary"} onContextMenu={onLinkContextMenu}>
                        Gumroad
                    </ActionLink>
                </div>
            </div>
        </ProfileCardStyled>
    );
};
