import { useState } from 'react';
import styles from './tasks.module.scss';
import { Table } from '@alfalab/core-components/table';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { Status } from '@alfalab/core-components/status';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { Textarea } from '@alfalab/core-components/textarea';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { Collapse } from '@alfalab/core-components/collapse';

interface TaskProps {
	id: number;
	title: string;
	deadline: string;
	statusText: string;
	statusColor?:
		| 'green'
		| 'orange'
		| 'red'
		| 'blue'
		| 'grey'
		| 'teal'
		| 'purple'
		| undefined;
	closeButton?: boolean | undefined;
	dateValue?: string;
}

const tasksData: TaskProps[] = [
	{
		id: 1,
		title: 'Менторинг новых сотрудников',
		deadline: 'До 30 января',
		statusText: 'не выполнена',
		statusColor: 'red',
		closeButton: false,
	},
	{
		id: 2,
		title: 'Разработка стратегии компании',
		deadline: 'До 20 марта',
		statusText: 'ожидает проверки',
		statusColor: 'purple',
		closeButton: true,
	},
	{
		id: 3,
		title: 'Найм сотрудников',
		deadline: 'До 10 апреля',
		statusText: 'выполнена',
		statusColor: 'green',
		closeButton: false,
	},
	{
		id: 4,
		title: 'Подготовка и выступление на конференции',
		deadline: 'До 1 июня',
		statusText: 'отменена',
		statusColor: 'orange',
		closeButton: true,
	},
];

export const Tasks: React.FC = () => {
	const [expandedTasks, setExpandedTasks] = useState<Record<number, boolean>>(
		{}
	);
	const [valueEndDate, setEndDate] = useState<string>('');
	const handleChangeEndDate = (event: any, { value }: { value: string }) => {
		setEndDate(value);
	};

	const chevronClick = (taskId: number) => {
		setExpandedTasks((prevExpandedTasks) => ({
			...prevExpandedTasks,
			[taskId]: !prevExpandedTasks[taskId], // Инвертируем значение для конкретной задачи
		}));
	};

	return (
		<Table className={styles.table}>
			<Table.TBody>
				{tasksData.map(
					({ id, title, deadline, statusColor, statusText, closeButton }) => (
						<>
							<>
								<Table.TRow className={styles.row} key={id}>
									<Table.TCell className={styles.cellWithIcon}>
										{closeButton && <CrossCircleMIcon color="#70707A" />}
										{title}
									</Table.TCell>
									<Table.TCell>{deadline}</Table.TCell>
									<Table.TCell>
										<Status view="soft" color={statusColor}>
											{statusText}
										</Status>
									</Table.TCell>
									<Table.TCell>
										<ChevronDownMIcon onClick={() => chevronClick(id)} />
									</Table.TCell>
								</Table.TRow>
							</>
							<Collapse expanded={expandedTasks[id]}>
								<div className={styles.openedTask}>
									<Textarea
										fieldClassName={styles.text}
										maxHeight={91}
										label="Описание"
										labelView="inner"
										size="m"
										block={true}
										// maxLength={96}
										showCounter={true}
										autosize={true}
									/>
									<div style={{ width: 300 }}>
										<UniversalDateInput
											block={true}
											view="date"
											label="Дата завершения"
											size="s"
											value={valueEndDate}
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
										/>
									</div>
								</div>
							</Collapse>
						</>
					)
				)}
			</Table.TBody>
		</Table>
	);
};
