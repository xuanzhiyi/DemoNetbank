import { staffDirectory, meetings } from '../services/mockData'
import StaffDirectory from '../components/Help/StaffDirectory'
import MeetingTimeline from '../components/Help/MeetingTimeline'
import MeetingRequest from '../components/Help/MeetingRequest'
import { useState } from 'react'

export default function Help() {
  const [showMeetingForm, setShowMeetingForm] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Customer Support</h2>
        <p className="text-gray-600">Connect with our team and manage your meetings</p>
      </div>

      {/* Staff Directory */}
      <StaffDirectory staff={staffDirectory} />

      {/* Meeting Timeline */}
      <MeetingTimeline meetings={meetings} />

      {/* Meeting Request */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-navy-900">Request a Meeting</h3>
          {!showMeetingForm && (
            <button
              onClick={() => setShowMeetingForm(true)}
              className="btn-secondary text-sm"
            >
              + New Request
            </button>
          )}
        </div>

        {showMeetingForm && (
          <MeetingRequest
            staff={staffDirectory}
            onCancel={() => setShowMeetingForm(false)}
          />
        )}
      </div>
    </div>
  )
}
