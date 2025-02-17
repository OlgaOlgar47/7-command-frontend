import styles from './mentor-plan.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';

import { MentorList } from '../../entities/mentor-list/mentor-list';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';

import { getMentorIprsList, selectMentorList } from '../../store/reducers/mentorIprSlice';

export const MentorPlan: React.FC = () => {
  const dispatch = useAppDispatch();
  const mentorIprsList = useAppSelector(selectMentorList);

  useEffect(() => {
    dispatch(getMentorIprsList());
  }, [dispatch]);

  //console.log('MENTOR_LIST_IPRS', mentorIprsList);

  return (
    <div className={styles.generalFooterWrapper}>
      <div className={styles.generalFooterContainer}>
        <section className={styles.myPlan}>
          <div className={styles.container}>
            <NavBarMini></NavBarMini>
            <div className={styles.wrapper}>
              <h1 className={styles.title}>Менторство сотрудников</h1>
              <div className={styles.containerList}>
                <MentorList data={mentorIprsList?.employees} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.generalFooter}></div>
    </div>
  );
};
