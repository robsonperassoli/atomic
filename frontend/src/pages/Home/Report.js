import React, { useState } from 'react'
import { useQuery, useSubscription, gql, useMutation } from '@apollo/client'
import { Layer, Button, Box, Anchor, Text } from 'grommet'
import { Print, DocumentDownload, Close } from 'grommet-icons'
import useSelectedProjectId from '../../hooks/useSelectedProjectId'
import ReportOptionsModal from './ReportOptionsModal'

const TOKEN_QUERY = gql`
  {
    token
  }
`

const REPORT_SUSCRIPTION = gql`
  subscription {
    reportFinished {
      id
      title
      url
    }
  }
`

const REQUEST_REPORT = gql`
  mutation RequestReport($projectId: ID!, $startDate: DateTime!, $endDate: DateTime!) {
     requestTasksReport(projectId: $projectId, startDate: $startDate, endDate: $endDate)
  }
`

const reportNotificationClosed = { visible: false, props: {} }

const downloadAndCreateLink = async (token, url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${token}`
    })
  })
  const blob = await response.blob()
  return window.URL.createObjectURL(blob)
}

function Report() {
  const { data: { token } } = useQuery(TOKEN_QUERY)
  const projectId = useSelectedProjectId()
  const [requestReport] = useMutation(REQUEST_REPORT)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [reportNotification, setReportNotification] = useState(reportNotificationClosed)

  useSubscription(REPORT_SUSCRIPTION, {
    onSubscriptionData: async ({ subscriptionData }) => {
      const { data: { reportFinished } } = subscriptionData
      const { url } = reportFinished

      const blobURL = await downloadAndCreateLink(token, url)

      setReportNotification({ visible: true, props: { ...reportFinished, url: blobURL } })
    }
  })

  const onCreateReportClicked = async ({ startDate, endDate }) => {
    await requestReport({ variables: { projectId, startDate, endDate } })
    setReportModalOpen(false)
  }

  return (
    <>
      <Button plain icon={<Print />} onClick={() => setReportModalOpen(true)}/>
      {reportModalOpen && (
        <ReportOptionsModal
          onReportRequest={onCreateReportClicked}
          onClose={() => setReportModalOpen(false)}
        />
      )}

      {reportNotification.visible && (
        <Layer
          modal={false}
          position='top-right'
          margin='small'
          plain
        >
          <Box border='all' round='small' pad='small' background='white' width='medium'>
            <Box align='end'>
              <Close size='small' onClick={() => setReportNotification(reportNotificationClosed)} />
            </Box>
            <Text>Your report is ready, click the link below to download.</Text>
            <Anchor
              margin={{ top: 'small' }}
              href={reportNotification.props.url}
              size='small'
              label='Download Report'
              icon={<DocumentDownload />}
              target='_blank'
            />
          </Box>
        </Layer>
      )}
    </>
  )
}

export default Report
