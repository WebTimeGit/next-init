import React from 'react';
import {getImgHandler, trimmer} from "@/services/helpers";
import styles from "./avatar.module.scss";
import {Avatar} from "@/components/avatar/avatar";
import {TUser} from "@/context/authContext";

export type TUserInfoBlock = {
	showName?: boolean
	userItem?: TUser
}

export const UsernameWithAvatar = ({userItem}: TUserInfoBlock) => {
	const imgSrc = getImgHandler(userItem?.profileImageUrl)


	return (
		<>
			<figure className={styles.userAvatar}><Avatar src={imgSrc}/></figure>
			<span className={styles.userName}>{trimmer(userItem?.username, 25)}</span>
		</>
	)
}