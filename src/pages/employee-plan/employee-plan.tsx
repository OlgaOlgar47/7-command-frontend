import styles from './employee-plan.module.scss';

import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { RootState } from '../../store/store';
import { getUserById, setSelectedUser } from '../../store/reducers/userSlice';
import { getIprsEmployeeHistory } from '../../store/reducers/iprsSlice';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';

import { Plan } from '../../entities/plan-component/plan';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import { NavBarMini } from '../../entities/navbar-mini/navbar-mini';

import getFullName from '../../util/get-user-full-name';

export const EmployeePlan = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserById(Number(id)));
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch, id]);

  useEffect(() => {
    // добываем ИПРы
    const iprsDataResult = async () => {
      return await dispatch(getIprsEmployeeHistory(Number(id)));
    };

    iprsDataResult().catch(() => navigate('/404', { replace: true }));
  }, [dispatch, id, navigate]);

  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  // Если данные еще загружаются, показываем заглушку
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Если не удалось получить данные о пользователе, показываем сообщение об ошибке
  if (!selectedUser) {
    return <p>Невозможно получить данные о пользователе.</p>;
  }

  //console.log('SELECTED__USER History', selectedUser);

  const fullName = getFullName(selectedUser);

  return (
    <div className={styles.generalFooterWrapper}>
      <div className={styles.generalFooterContainer}>
        <div className={styles.container}>
          <NavBarMini />
          <div className={styles.wrapper}>
            <h2 className={styles.title}>План развития сотрудника</h2>
            <div className={styles.employeeWrapper}>
              <EmployeeInfoCard
                name={fullName}
                position={selectedUser.position?.name}
                avatar={selectedUser?.imageUrl}
              />
            </div>
            <Plan />
          </div>
        </div>
      </div>
      <div className={styles.generalFooter}></div>
    </div>
  );
};
