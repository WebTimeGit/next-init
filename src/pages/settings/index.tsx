import React, {useEffect, useState} from "react";
import styles from "./settings.module.scss"

import SettingsProfile from "./settingsProfile/settingsProfile";
import {useRouter} from "next/router";
import {Container} from "@/components/container";

const TABS_VARIANTS = {
	settings: 'profile',
	lorem: 'lorem',
}

const btns = [
	{value: TABS_VARIANTS.settings, label: 'Profile'},
	{value: TABS_VARIANTS.lorem, label: 'lorem'}
]

function Settings() {
	const router = useRouter();
	const tab = router.query.tab
	const initialTab = btns.find(b => b.value === tab)?.value || TABS_VARIANTS.settings

	const [currentTab, setCurrentTab] = useState(initialTab)

	useEffect(() => {
		const tab = router.query.tab
		const tabValue = btns.find(b => b.value === tab)?.value || TABS_VARIANTS.settings
		setCurrentTab(tabValue)
	}, [router.query.tab])

	const onHandlerClick = (value: string) => {
		setCurrentTab(value);
		router.push(`?tab=${value}`, undefined, {shallow: true}).then()
	}

	return (
		<Container>
			<section className={styles.account}>
				<div className={styles.tabsWrapper}>
					<div className={styles.btns}>
						{btns.map(btn => (
							<button
								key={btn.value}
								className={currentTab === btn.value ? styles.active : ''}
								onClick={() => onHandlerClick(btn.value)}>
								{btn.label}
							</button>
						))}
					</div>
				</div>
				<div className={styles.bodyWrapper}>
					{currentTab === TABS_VARIANTS.settings && <SettingsProfile/>}
					{currentTab === TABS_VARIANTS.lorem && 'lorem'}
				</div>
			</section>
		</Container>
	)
}

export default Settings