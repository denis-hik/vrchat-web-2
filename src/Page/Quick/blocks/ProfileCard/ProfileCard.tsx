import React from "react";
import avatarImage from "../../../../media/quick/avatar-square.png";
import {ProfileCardStyled} from "./styled";
import {ActionLink} from "../ActionLink/ActionLink";

type ProfileCardProps = {
    status: string;
    trustRank: string;
    lead: string;
    website: string;
};

export const ProfileCard = ({status, trustRank, lead, website}: ProfileCardProps) => {
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
                    <ActionLink href={"https://vrchat.com/home/user/usr_cb88a031-8fae-4dd9-bbd2-8178636e2ee9"} variant={"vrchat"}>
                        VRChat
                    </ActionLink>
                    <ActionLink href={"https://denishik.io"} variant={"secondary"}>
                        {website}
                    </ActionLink>
                    <ActionLink href={"https://discord.com/users/370583534647246848"} variant={"secondary"}>
                        Discord
                    </ActionLink>
                    <ActionLink href={"https://jinxxy.com/denis_hik"} variant={"jinxxy"}>
                        JinxXy
                    </ActionLink>
                    <ActionLink href={"https://denishik.gumroad.com"} variant={"secondary"}>
                        Gumroad
                    </ActionLink>
                </div>
            </div>
        </ProfileCardStyled>
    );
};
