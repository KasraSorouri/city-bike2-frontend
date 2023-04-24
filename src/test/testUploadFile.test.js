import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UploadFiles from '../components/UploadFiles'

jest.mock('../services/fileService', () => ({
  uploadFile: jest.fn().mockResolvedValue({ status: 200 }),
}))

describe('UploadFiles', () => {
  test('renders component correctly', () => {
    render(<UploadFiles />)

    expect(screen.getByText('Here you can Upload the CSV file that includes Trips and Stations data.')).toBeInTheDocument()
    expect(screen.getByText('Upload trips file')).toBeInTheDocument()
    expect(screen.getByText('Upload Stations file')).toBeInTheDocument()
    expect(screen.getByLabelText('Please choose a CSV file')).toBeInTheDocument()
  })
})
