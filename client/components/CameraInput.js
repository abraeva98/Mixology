import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
// import readReceipt from '../../readReceipt'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const blacklisted = {
  total: true,
  subtotal: true,
  supermarket: true,
  market: true,
  ctown: true
}

const readReceipt = receipt => {
  const isAWord = w => {
    if (w in blacklisted) return false
    return w ? w.length > 2 : false
  }
  receipt = receipt.map(word => {
    return word.replace(/[^a-zA-Z]+/, '')
  })
  return receipt.filter(isAWord)
}

const CameraInput = () => {
  const [loading, setLoading] = useState(false)
  const [hasScanned, setScanStatus] = useState(false)
  const [error, setError] = useState(false)
  const [text, setText] = useState([])

  //useStyles() is material ui
  const classes = useStyles()
  const handleInput = evt => {
    isLoading(true)
    const read = async () => {
      try {
        // lines 56-61 are for fetching real data from vision api
        // file is our uploaded image, in a File object
        const file = evt.target.files[0]
        const formData = new FormData()
        //append the File to formData so it can be sent to the server
        formData.append('img', file)
        const { data } = await axios.post(`/gvision`, formData)
        const receipt = readReceipt(data)

        //fake data for testing so we don't use up loads of api calls
        // const receipt = [
        //   'apples',
        //   'avocado',
        //   'white rum',
        //   'lime',
        //   'orange liquer'
        // ]

        setLoading(false)
        setScanStatus(true)
        //if data comes back empty, throws an error
        if (!receipt) throw new Error('Something went wrong')
        setText(receipt)
      } catch (e) {
        //set error state so that an error message is displayed to user
        setError(true)
        console.error(e)
      }
    }
    read()
  }

  const handleRemove = word => {
    setText(text.filter(w => w !== word))
  }

  //can currently only accept one file at a time
  return (
    <div id='file-input-container-all'>
      { loading ? <CircularProgress /> :
      <div id='file-input'>
        { error ? <h2>something went wrong!</h2> : ''}
        <ul id='input-text-list'>
          { text && text.map(word =>
          <li className='scanned-item'>
            <span>{word}</span>
            <IconButton aria-label="delete">
              <DeleteForeverIcon onClick={() => handleRemove(word)} size="small" />
            </IconButton>
          </li>
          ) }
        </ul>
        <div className={classes.root} id='file-input-buttons'>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onInput={handleInput}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span" size="large" startIcon={<CloudUploadIcon />}>
              { hasScanned ? 'Scan Again' : 'Scan Receipt' }
            </Button>
          </label>
          <input accept="image/*" className={classes.input} id="icon-button-file" type="file" capture="camera" onInput={handleInput} />
          <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        { hasScanned && 
          <div id='after-scan-buttons'>
            { !error && <button type='submit'>Add All to Cabinet</button> }
            <button type='submit'>Add Items with Text Input</button>
          </div>
        }
      </div>
      }
    </div>
  )
}

export default CameraInput