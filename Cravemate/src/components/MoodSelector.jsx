import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material'
import {
  SentimentVerySatisfied as HappyIcon,
  SentimentSatisfied as CalmIcon,
  SentimentDissatisfied as SadIcon,
  SentimentVeryDissatisfied as AngryIcon,
  Mood as ExcitedIcon
} from '@mui/icons-material'

const moods = [
  { id: 1, name: 'Happy', icon: <HappyIcon fontSize="large" /> },
  { id: 2, name: 'Calm', icon: <CalmIcon fontSize="large" /> },
  { id: 3, name: 'Sad', icon: <SadIcon fontSize="large" /> },
  { id: 4, name: 'Angry', icon: <AngryIcon fontSize="large" /> },
  { id: 5, name: 'Excited', icon: <ExcitedIcon fontSize="large" /> }
]

const MoodSelector = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState(null)

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        How are you feeling today?
      </Typography>
      <Grid container spacing={2}>
        {moods.map((mood) => (
          <Grid item xs={12} sm={6} md={4} key={mood.id}>
            <Card
              sx={{
                cursor: 'pointer',
                backgroundColor:
                  selectedMood === mood.id ? 'primary.light' : 'background.paper'
              }}
              onClick={() => setSelectedMood(mood.id)}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                {mood.icon}
                <Typography variant="h6">{mood.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          disabled={!selectedMood}
          onClick={() => onMoodSelect(selectedMood)}
        >
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default MoodSelector