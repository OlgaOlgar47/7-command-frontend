import styles from './tasks-overview.module.scss';
import styles2 from './tasks-overview-form.module.scss';
import React, { FC, ChangeEvent, useState } from 'react';

import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { Arrow } from '@alfalab/core-components/select/components/arrow';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { Textarea } from '@alfalab/core-components/textarea';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import avatarMentor from '../../images/avatars/avatar_mentor1.png';
import { goal, role, competence, mentor } from '../../shared/utils/constants';
interface ManagerIprDraftProps {
	isExecutive: boolean;
	iprStatus: string;
}
interface OptionShape {
	key: string;
}

export const TasksOverview = ({
	isExecutive,
	iprStatus,
}: ManagerIprDraftProps) => {
	const optionsRole: OptionShape[] = role;
	const optionsGoal: OptionShape[] = goal;
	const optionsMentor: OptionShape[] = mentor;
	const optionsCompetence: OptionShape[] = competence;

	const [multiple, setMultiple] = useState(true);
	const [shownChevron, setShownChevron] = useState(true);

	const [valueGoal, setValueGoal] = useState<string>('');
	const [valueRole, setValueRole] = useState<string>('');
	const [valueMentor, setValueMentor] = useState<string>('');
	const [valueCompetence, setValueCompetence] = useState<string>('');
	const [valueStartDate, setStartDate] = useState<string>('');
	const [valueEndDate, setEndDate] = useState<string>('');
	const [valueDescription, setValueDescription] = useState<string>('');
	const [valueComment, setValueComment] = useState<string>('');

	const allInputs = {
		goal: valueGoal,
		role: valueRole,
		competence: valueCompetence,
		mentor: valueMentor,
		startDate: valueStartDate,
		endDate: valueEndDate,
		description: valueComment,
		comment: valueDescription,
	};
	console.log(allInputs);

	const [modalOpen, setModalOpen] = useState(false);

	const matchOption = (option: OptionShape, inputValue: string): boolean =>
		option.key.toLowerCase().includes((inputValue || '').toLowerCase());

	// Обработка импутов
	const handleInputGoal = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueGoal(value);
	};

	const handleInputRole = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueRole(value);
	};

	function handleInputDescription(
		event: ChangeEvent<HTMLTextAreaElement>
	): void {
		event.preventDefault();
		const target = event.target as HTMLTextAreaElement;
		if (target.name === 'description') {
			setValueDescription(target.value);
			console.log(valueDescription);
		}
		if (!target) {
			return;
		}
	}

	function handleInputComment(event: ChangeEvent<HTMLTextAreaElement>): void {
		event.preventDefault();
		const target = event.target as HTMLTextAreaElement;
		if (target.name === 'comment') {
			setValueComment(target.value);
			console.log(valueComment);
		}
		if (!target) {
			return;
		}
	}
	const handleInputMentor = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueMentor(value);
	};
	// Обработка изменения импутов

	const handleChangeGoal = ({ selected }: { selected: OptionShape | null }) => {
		setValueGoal(selected ? selected.key : '');
	};

	const handleChangeRole = ({ selected }: { selected: OptionShape | null }) => {
		setValueRole(selected ? selected.key : '');
	};
	const handleChangeMentor = ({
		selected,
	}: {
		selected: OptionShape | null;
	}) => {
		setValueMentor(selected ? selected.key : '');
	};

	const handleChangeStartDate = (event: any, { value }: { value: string }) => {
		// setStartDate(value);
		var d = new Date(Date.now()).toLocaleString().split(',')[0];
		d.toString();
		setStartDate(d);
	};
	const handleChangeEndDate = (event: any, { value }: { value: string }) => {
		setEndDate(value);
	};
	// Обработка фильтры поиска значения

	const getFilteredGoals = (): OptionShape[] => {
		return optionsGoal.some(({ key }) => key === valueGoal)
			? optionsGoal
			: optionsGoal.filter((option) => matchOption(option, valueGoal));
	};

	const getFilteredRoles = (): OptionShape[] => {
		return optionsRole.some(({ key }) => key === valueRole)
			? optionsRole
			: optionsRole.filter((option) => matchOption(option, valueRole));
	};
	const getFilteredMentor = (): OptionShape[] => {
		return optionsMentor.some(({ key }) => key === valueMentor)
			? optionsMentor
			: optionsMentor.filter((option) => matchOption(option, valueMentor));
	};

	const handleInputCompetence = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueCompetence(value);
	};
	const inputValues: string[] = valueCompetence.replace(/ /g, '').split(',');
	const selectedOptions: OptionShape[] = optionsCompetence.filter((option) =>
		inputValues.includes(option.key.trim())
	);

	const selected: string[] | OptionShape = multiple
		? selectedOptions.map((option) => option.key)
		: optionsCompetence.find((o) => o.key === inputValues[0]) || [];

	const tagValues = valueCompetence.trim().split(',');

	const handleChangeCompetence = ({
		selected,
		selectedMultiple,
	}: {
		selected: OptionShape | null;
		selectedMultiple: OptionShape[] | null;
	}): void => {
		if (multiple) {
			const value = selectedMultiple?.length
				? selectedMultiple.map((option) => option.key).join(', ')
				: '';
			setValueCompetence(value);
			return;
		}
		setValueCompetence(selected ? selected.key : '');
	};

	const getFilteredOptionsCompetence = (): OptionShape[] => {
		if (multiple) {
			return optionsCompetence.filter((option) => {
				return (
					selectedOptions.includes(option) ||
					matchOption(option, inputValues[inputValues.length - 1])
				);
			});
		}

		return optionsCompetence.some(({ key }) => key === valueCompetence)
			? optionsCompetence
			: optionsCompetence.filter((option) =>
					matchOption(option, valueCompetence)
				);
	};

	return (
		<fieldset className={styles2.blockWrapper}>
			<legend className={styles2.blockTitle}>Общее описание</legend>
			<div className={styles2.formBlock}>
				<div className={styles2.formRow}>
					<div style={{ width: 496 }}>
						<InputAutocomplete
							name="goal"
							block={true}
							closeOnSelect={true}
							className="inputGoal"
							size="s"
							options={getFilteredGoals()}
							label="Цель *"
							placeholder="Начните вводить название"
							onChange={handleChangeGoal}
							onInput={handleInputGoal}
							Arrow={shownChevron ? Arrow : undefined}
							value={valueGoal}
							allowUnselect={true}
							showEmptyOptionsList={true}
							inputProps={{
								onClear: () => setValueGoal(''),
								clear: true,
							}}
							disabled={isExecutive ? false : true}
						></InputAutocomplete>
					</div>
					<div style={{ width: 496 }}>
						<InputAutocomplete
							name="role"
							block={true}
							closeOnSelect={true}
							className="inputRole"
							size="s"
							options={getFilteredRoles()}
							label="Специализация *"
							placeholder="Начните вводить название"
							onChange={handleChangeRole}
							onInput={handleInputRole}
							Arrow={shownChevron ? Arrow : undefined}
							value={valueRole}
							allowUnselect={true}
							inputProps={{
								onClear: () => setValueRole(''),
								clear: true,
							}}
							disabled={isExecutive ? false : true}
						></InputAutocomplete>
					</div>
				</div>
				<div>
					<InputAutocomplete
						name="competence"
						value={valueCompetence}
						block={true}
						multiple={multiple}
						allowUnselect={true}
						closeOnSelect={true}
						onChange={handleChangeCompetence}
						onInput={handleInputCompetence}
						options={getFilteredOptionsCompetence()}
						Arrow={shownChevron ? Arrow : undefined}
						inputProps={{
							onClear: () => setValueCompetence(''),
							clear: true,
						}}
						className={styles2.inputCompetence}
						size="s"
						label="Компетенция *"
						placeholder="Начните вводить название"
						disabled={isExecutive ? false : true}
					></InputAutocomplete>
				</div>
				<div className={styles2.formRowTag}>
					{valueCompetence.length > 0
						? tagValues.map((value: string, key: number) => {
								return (
									<div key={value.length + 1} style={{ maxWidth: '319' }}>
										<FilterTag
											showClear={true}
											size="xxs"
											shape="rounded"
											view="filled"
											checked={true}
											onClear={() => {
												setValueCompetence('');
											}}
										>
											{value}
										</FilterTag>
									</div>
								);
							})
						: ''}
				</div>
				<div className={styles2.formRow}>
					<div>
						<InputAutocomplete
							name="mentor"
							block={true}
							closeOnSelect={true}
							className={styles2.inputMentor}
							size="s"
							options={getFilteredMentor()}
							label="Ментор"
							placeholder="Начните вводить название"
							onChange={handleChangeMentor}
							onInput={handleInputMentor}
							Arrow={shownChevron ? Arrow : undefined}
							value={valueMentor}
							allowUnselect={true}
							inputProps={{
								onClear: () => setValueMentor(''),
								clear: true,
							}}
							disabled={isExecutive ? false : true}
						></InputAutocomplete>

						{!isExecutive && iprStatus === 'черновик' ? (
							<img
								className={styles2.avatarMentor}
								src={avatarMentor}
								alt="avatar"
							></img>
						) : (
							''
						)}
					</div>

					<div style={{ width: 236 }}>
						<UniversalDateInput
							name="startDate"
							block={true}
							view="date"
							label="Дата создания"
							size="s"
							value={valueStartDate}
							onChange={handleChangeStartDate}
							picker={true}
							Calendar={CalendarDesktop}
							calendarProps={{
								selectorView: 'month-only',
							}}
							clear={true}
							onClear={(e) => {
								e.stopPropagation();
								setStartDate('');
							}}
							disabled={isExecutive ? false : true}
						/>
					</div>
					<div style={{ width: 236 }}>
						<UniversalDateInput
							name="endDate"
							block={true}
							view="date"
							label="Дата завершения"
							size="s"
							value={valueEndDate}
							// onChange={handleChange}
							onChange={handleChangeEndDate}
							picker={true}
							Calendar={CalendarDesktop}
							calendarProps={{
								selectorView: 'month-only',
							}}
							clear={true}
							onClear={(e) => {
								e.stopPropagation();
								setEndDate('');
							}}
							disabled={isExecutive ? true : false}
						/>
					</div>
					<div
						style={{
							width: 1016,
						}}
					>
						<Textarea
							name="description"
							value={valueDescription}
							onChange={handleInputDescription}
							fieldClassName={styles2.textClass}
							maxHeight={91}
							label="Описание"
							labelView="inner"
							size="m"
							block={true}
							maxLength={96}
							showCounter={true}
							autosize={true}
							disabled={isExecutive ? false : true}
						/>
					</div>
					<div
						style={{
							width: 1016,
						}}
					>
						<Textarea
							name="comment"
							onChange={handleInputComment}
							fieldClassName={styles2.textClass}
							maxHeight={91}
							label="Комментарий (виден только вам)"
							labelView="inner"
							size="m"
							block={true}
							maxLength={96}
							showCounter={true}
							autosize={true}
							disabled={isExecutive ? false : true}
						/>
					</div>
				</div>
			</div>
		</fieldset>
	);
};
