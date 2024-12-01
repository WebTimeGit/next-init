import React, {useState} from 'react';
import {loggedAxios} from '@/services/axios';
import {AxiosError} from 'axios';
import {API} from '@/services/api/api';
import styles from './updateName.module.scss';

export const UpdateName = () => {
	const [newUsername, setNewUsername] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUsername(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)
		setSuccessMessage(null)

		if (!newUsername.trim()) return setError('Username cannot be empty')

		setLoading(true)
		try {
			await loggedAxios.patch(API.updateName, {newUsername})
			setSuccessMessage('Username updated successfully!')
			setNewUsername('')
		} catch (err) {
			if (err instanceof AxiosError && err.response?.data?.message) {
				setError(err.response.data.message)
			} else {
				setError('An error occurred. Please try again.')
			}
		} finally {
			setLoading(false)
		}
	}


	return (
		<div className={styles.updateName}>
			<h2>Update Your Name</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.inputWrapper}>
					<input
						type="text"
						placeholder="Enter your new name"
						value={newUsername}
						onChange={handleInputChange}
						className={styles.input}
					/>
				</div>
				<button type="submit" className={styles.button} disabled={loading}>
					{loading ? 'Updating...' : 'Update Name'}
				</button>
			</form>
			{error && <p className={styles.error}>{error}</p>}
			{successMessage && <p className={styles.success}>{successMessage}</p>}
		</div>
	)
}
