import React, {useContext} from 'react';
import {AuthContext} from "@/context/authContext";
import {UpdatePhoto} from "@/pages/settings/settingsProfile/updatePhoto/updatePhoto";
import {UpdateName} from "@/pages/settings/settingsProfile/updateName/updateName";

function SettingsProfile(){
	const {userData} = useContext(AuthContext);

	return (
		<>
			<UpdatePhoto image={userData?.profileImageUrl}/>
			<UpdateName />
		</>
	)
}

export default SettingsProfile;