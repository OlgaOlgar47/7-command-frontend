import styles from './main-page.module.scss';
import { useState } from 'react';
import Header from '../../shared/header-component/header';
import { NavBarMain } from '../../entities/navbar-main/navbar-main';
import layout1 from '../../images/main-layout/top.png';
import layout2 from '../../images/main-layout/main-news.png';
import layout3 from '../../images/main-layout/card.png';
import layout4 from '../../images/main-layout/cards.png';
import layout5 from '../../images/main-layout/cards-1.png';
import layout6 from '../../images/main-layout/button.png';
interface ManagerIprDraftProps {
	isMentor: boolean;
}
export const MainPage = ({ isMentor }: ManagerIprDraftProps) => {
	const [role, setRole] = useState<boolean>(true);

	return (
		<>
			{role ? <Header /> : <Header />}
			<main className={styles.main}>
				<div className={styles.container}>
					<NavBarMain isMentor={isMentor} />
					<div className={styles.contentWrapper}>
						<div className={styles.titleWrapper}>
							<img src={layout1} alt="заглушка" className={styles.title}></img>
						</div>
						<div className={styles.headerWrapper}>
							<img src={layout2} alt="заглушка" className={styles.news}></img>
							<img src={layout3} alt="заглушка" className={styles.card}></img>
						</div>
						<div className={styles.cardsWrapper}>
							<img src={layout4} alt="заглушка" className={styles.cards}></img>
							<img src={layout5} alt="заглушка" className={styles.cards}></img>
						</div>
						<div className={styles.buttonWrapper}>
							<img src={layout6} alt="заглушка" className={styles.button}></img>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};
