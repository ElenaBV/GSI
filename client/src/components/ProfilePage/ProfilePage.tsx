import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const score = useSelector((state: RootState) => state.scoreReducer.score);
  const [profileData, setProfileData] = useState<any>(null);
console.log("score",score)
  const formattedTime = (isoTime) => {
    const date = new Date(isoTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleString('ru-Ru', options);
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/profile', {
        params: { email: user.email }
      });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [user.email,score]);

  // useEffect(() => {
  // }, [profileData.gamesData]);

  


  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '30px', margin: 'auto', maxWidth: 600 }}>
      <Typography variant="h5" component="h3" style={{ padding: '16px',  margin: 'auto'}}>
        Личный кабинет
      </Typography>
      {profileData && (
        <div>
          <Typography variant="body1">
            Общее количество игр: {profileData.totalGames}
            
          </Typography>
          <Typography variant="body1">
            Общий количество очков: {profileData.totalPoints}
          </Typography>
          <Typography variant="h6">Статистика по каждой игре:</Typography>
          <ul>
            {profileData.gamesData.map((game: any) => (
              <li key={game.id}>
                <Typography variant="body2">
                  Игра {game.id}: результат - {game.points}, время - {formattedTime(game.time)}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Paper>
  );
};

export default ProfilePage;