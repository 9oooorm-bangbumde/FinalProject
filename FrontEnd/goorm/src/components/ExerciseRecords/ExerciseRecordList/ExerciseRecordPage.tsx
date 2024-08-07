import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import Pagination from '../../../pages/Board/components/Pagination';
import Searchbar from '../../../pages/Board/components/SearchBar';
import { ExerciseRecords } from '../../../pages/Exercise/ExerciseTypes';
import { getExerciseRecords } from '../../../pages/Exercise/api/exerciseApi';
import RecodsTabs from '../../Taps/ExerciseListTab/ExerciseRecordsTabs';
import styles from './ExerciseRecordPage.module.scss';

const ExerciseRecordPage: React.FC = () => {
  const { month } = useParams<{ month: string }>();
  const [selectedTab, setSelectedTab] = useState<string>(month || 'JAN');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [allRecords, setAllRecords] = useState<ExerciseRecords[]>([]);
  const [currentRecords, setCurrentRecords] = useState<ExerciseRecords[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExerciseRecords();
        setAllRecords(data);
        filterRecords(data, selectedTab);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterRecords(allRecords, selectedTab);
  }, [selectedTab, currentPage, searchQuery]);

  const filterRecords = (records: ExerciseRecords[], month: string) => {
    const filteredRecords = records.filter(record => {
      const recordMonth = new Date(record.exerciseDate).getMonth();
      return getMonthNumber(month) === recordMonth;
    });
    setCurrentRecords(filteredRecords);
    setTotalPages(Math.ceil(filteredRecords.length / recordsPerPage));
  };

  const getMonthNumber = (month: string): number => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months.indexOf(month);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div className={styles.container}>
      <h2>2024</h2>
      <RecodsTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {['번호', '날짜', '카테고리', '운동', '시간', '칼로리', '세트', '횟수', '중량', '거리', '경사'].map((header, index) => (
                <th key={index} className={classNames(styles.tableHeader)} style={{ width: '60px' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((record) => {
              const values = [
                record.recordId,
                formatDate(record.exerciseDate),
                record.categoryName === '유산소' ? record.categoryName : `근력 / ${record.categoryName}`,
                record.trainingName,
                record.durationMinutes !== null ? `${record.durationMinutes} 분` : '',
                record.caloriesBurned !== null ? `${record.caloriesBurned} kcal` : '',
                record.sets !== null ? `${record.sets} 세트` : '',
                record.reps !== null ? `${record.reps} 회` : '',
                record.weight !== null ? `${record.weight} kg` : '',
                record.distance !== null ? `${record.distance} km` : '',
                record.incline !== null ? `${record.incline} incline` : ''
              ];
              return (
                <tr key={record.recordId} className={classNames(styles.tableRow)}>
                  {values.map((value, index) => (
                    <td key={index} className={classNames(styles.tableCell)}>
                      {value}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
    </div>
  );
};

export default ExerciseRecordPage;
