import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [formVisible, setFormVisible] = useState(false)

  const hideWhenVisible = { display: formVisible ? 'none' : '', marginTop: 10 }
  const showWhenVisible = { display: formVisible ? '' : 'none', marginTop: 10 }

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible} >
        <Button variant='contained' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant='contained' onClick={toggleVisibility}>cancel</Button>
      </div>
      <br />
    </div>
  )
})
Togglable.displayName = 'Togglable'

export default Togglable