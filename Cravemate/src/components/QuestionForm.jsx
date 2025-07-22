import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material'

const questions = [
  {
    id: 1,
    question: 'How hungry are you?',
    options: ['Not very', 'Somewhat', 'Very', 'Starving!']
  },
  {
    id: 2,
    question: 'Do you prefer sweet or savory?',
    options: ['Sweet', 'Savory', 'Both', 'Not sure']
  },
  {
    id: 3,
    question: 'Any dietary restrictions?',
    options: ['None', 'Vegetarian', 'Vegan', 'Gluten-free']
  }
]

const QuestionForm = ({ onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleOptionChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onSubmit(answers)
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {questions[currentQuestion].question}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={answers[questions[currentQuestion].id] || ''}
          onChange={(e) =>
            handleOptionChange(questions[currentQuestion].id, e.target.value)
          }
        >
          {questions[currentQuestion].options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!answers[questions[currentQuestion].id]}
        >
          {currentQuestion === questions.length - 1 ? 'Get Recommendations' : 'Next'}
        </Button>
      </Box>
    </Box>
  )
}

export default QuestionForm