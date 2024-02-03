import React, { useState, useRef } from 'react';
import styles from './mentor-list.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { Popover } from '@alfalab/core-components/popover';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Status } from '@alfalab/core-components/status';
import { Typography } from '@alfalab/core-components/typography';
import { Table } from '@alfalab/core-components/table';
import { EmployeeGoalPlan } from '../../shared/utils/test-users';
import { Mentor } from '../../store/reducers/mentorIprSlice';
import { Space } from '@alfalab/core-components/space';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import {
	selectCommonLibsIPRGoals,
	selectCommonLibsIPRStatus,
	selectCommonLibsPositions,
} from '../../store/reducers/libSlice';
import avatar from '../../images/avatars/avatar_mentor1.png';
import {
	formatDateString,
	getStatusColor,
	getValueById,
} from '../../shared/utils/constants';
export interface MentorListProps {
	data: Mentor[] | undefined;
	// mentorList?: [] | undefined;
}

export const MentorList: React.FC<MentorListProps> = ({ data }) => {
	const dispatch = useAppDispatch();

	// console.log('MENTOR - DATA', data);

	const positionsLib = useAppSelector(selectCommonLibsPositions);
	const iprGoalsLib = useAppSelector(selectCommonLibsIPRGoals);
	const iprStatusLib = useAppSelector(selectCommonLibsIPRStatus);

	const [popoverVisible, setPopoverVisible] = useState(false);
	const [selectedEmployee, setSelectedEmployee] =
		useState<EmployeeGoalPlan | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	const closePopover = () => {
		setPopoverVisible(false);
		setSelectedEmployee(null);
	};

	return (
		<>
			<Table
				className={styles.table}
				wrapper={false}
				// pagination={
				// 	<Table.Pagination
				// 	// perPage={perPage}
				// 	// currentPageIndex={page}
				// 	// pagesCount={pagesCount}
				// 	// onPageChange={handlePageChange}
				// 	// hidePerPageSelect={true}
				// 	/>
				// }
			>
				<Table.THead>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Сотрудник</span>
						</div>
					</Table.THeadCell>
					<Table.THeadCell>Цель</Table.THeadCell>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Дата</span>
						</div>
					</Table.THeadCell>
					<Table.THeadCell>Прогресс</Table.THeadCell>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Статус</span>
						</div>
					</Table.THeadCell>
					<Table.THeadCell title="Пустая"></Table.THeadCell>
					<Table.THeadCell title="Пустая"></Table.THeadCell>
				</Table.THead>
				<Table.TBody>
					{data?.map(
						({
							date_of_end,
							firstName,
							goal,
							id,
							imageUrl,
							lastName,
							middleName,
							position_id,
							progress,
							specialty_id,
							status,
							task_completed,
							task_count,
						}) => {
							const color = getStatusColor(status);

							function progressPerCent(data: any) {
								const numberArr = data.split('/');
								const perCent = (numberArr[0] / numberArr[1]) * 100;
								return Math.round(perCent);
							}
							return (
								<Table.TRow key={id}>
									<Table.TCell>
										<Space size={2} align={'start'}>
											<div
												className={styles.tCell}
												style={{
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center',
												}}
											>
												<img
													src={avatar}
													style={{
														width: '40px',
														height: '40px',
													}}
													alt="аватар"
												></img>
												<div style={{ marginLeft: '8px', width: '250px' }}>
													<Typography.Text view="primary-small" tag="div">
														{`${lastName} ${firstName} ${middleName}`}
													</Typography.Text>
													<Typography.Text
														view="primary-small"
														color="secondary"
													>
														{getValueById(position_id, positionsLib)}
													</Typography.Text>
												</div>
											</div>
										</Space>
									</Table.TCell>
									<Table.TCell>
										<div className={styles.tCell}>
											{getValueById(goal, iprGoalsLib)}
										</div>
									</Table.TCell>
									<Table.TCell>
										<div className={styles.tCell}>
											{formatDateString(date_of_end)}
										</div>
									</Table.TCell>
									<Table.TCell>
										<CircularProgressBar
											value={progressPerCent(progress)}
											title={progress}
											size="s"
											contentColor="primary"
											className={styles.progressBar}
										/>
									</Table.TCell>
									<Table.TCell>
										<div className={styles.tCell}>
											<Status view="soft" color={color}>
												{getValueById(status, iprStatusLib)}
											</Status>
										</div>
									</Table.TCell>
									<Table.TCell>
										<div className={styles.tBtn}>
											<Button view="tertiary" size="xxs">
												Открыть
											</Button>
										</div>
									</Table.TCell>
								</Table.TRow>
							);
						}
					)}
				</Table.TBody>
			</Table>

			{selectedEmployee && (
				<Popover
					anchorElement={buttonRef.current}
					open={popoverVisible}
					position="bottom"
				>
					<div
						style={{
							padding: '15px',
							width: '100px',
							display: 'flex',
							flexDirection: 'column',
							gap: '36px',
						}}
					>
						{/* <Button view="ghost" size="s" onClick={handleDeleteClick}>
							Удалить
						</Button> */}
						<Button
							view="ghost"
							size="s"
							onClick={() => {
								closePopover();
								console.log('History clicked');
							}}
						>
							История
						</Button>
					</div>
				</Popover>
			)}
		</>
	);
};
