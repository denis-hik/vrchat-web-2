import React from "react";
import avatarImage from "../../../../media/quick/avatar-square.png";
import {ProfileCardStyled} from "./styled";

type ProfileCardProps = {
    status: string;
    lead: string;
    website: string;
};

export const ProfileCard = ({status, lead, website}: ProfileCardProps) => {
    return (
        <ProfileCardStyled>
            <div className={"avatar-wrap"}>
                <img src={avatarImage} alt={"Denis Hik"} />
            </div>
            <div className={"profile-body"}>
                <div className={"status"}>
                    <span className={"status-dot"} />
                    {status}
                </div>
                <h1>Denis Hik</h1>
                <p className={"lead"}>
                    {lead}
                </p>
                <div className={"quick-actions"}>
                    <a
                        className={"action-link vrchat-link"}
                        href={"https://vrchat.com/home/user/usr_cb88a031-8fae-4dd9-bbd2-8178636e2ee9"}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        VRChat
                    </a>
                    <a className={"action-link secondary"} href={"https://denishik.io"} target={"_blank"} rel={"noreferrer"}>
                        {website}
                    </a>
                    <a className={"action-link jinxxy-link"} href={"https://jinxxy.com/denis_hik"} target={"_blank"} rel={"noreferrer"}>
                        JinxXy
                    </a>
                    <a className={"action-link secondary"} href={"https://denishik.gumroad.com"} target={"_blank"} rel={"noreferrer"}>
                        Gumroad
                    </a>
                </div>
            </div>
        </ProfileCardStyled>
    );
};
