import { Box, Typography } from '@mui/material'
import { useState } from 'react'

const Notification = ({ text, type, time }) => {
  const [message, setMessage] = useState(text)
  if (!message) {
    return null
  } else if (time > 0) {
    setTimeout(() => setMessage(null), time *1000 )
  }
  console.log(' notification message ->', message)
  return (
    <Box>
      <Typography variant='body1' color={type === 'error' ? 'red' : 'darkblue' }>
        {message}
      </Typography>
    </Box>
  )
}

export default Notification