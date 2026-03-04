import { Meeting } from '../../types'
import { Clock, CheckCircle2 } from 'lucide-react'

interface MeetingTimelineProps {
  meetings: Meeting[]
}

export default function MeetingTimeline({ meetings }: MeetingTimelineProps) {
  // Sort by date, most recent first
  const sortedMeetings = [...meetings].sort((a, b) => b.date.getTime() - a.date.getTime())

  const upcomingMeetings = sortedMeetings.filter(m => m.type === 'upcoming')
  const pastMeetings = sortedMeetings.filter(m => m.type === 'past')

  const MeetingItem = ({ meeting }: { meeting: Meeting }) => (
    <div className="flex gap-4 pb-8">
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          meeting.type === 'upcoming'
            ? 'bg-pink-100 border-2 border-pink-500'
            : 'bg-navy-100 border-2 border-navy-500'
        }`}>
          {meeting.type === 'upcoming' ? (
            <Clock size={16} className="text-pink-600" />
          ) : (
            <CheckCircle2 size={16} className="text-navy-600" />
          )}
        </div>
        {/* Line */}
        <div className="w-0.5 h-20 bg-gray-300 my-2" />
      </div>

      {/* Meeting details */}
      <div className="flex-1 pt-1">
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-navy-900">{meeting.topic}</h4>
              <p className="text-sm text-gray-600 mt-1">
                with {meeting.staff.name} • {meeting.staff.role === 'relationship_manager' ? 'RM' : 'Expert'}
              </p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              meeting.type === 'upcoming'
                ? 'bg-pink-100 text-pink-700'
                : 'bg-navy-100 text-navy-700'
            }`}>
              {meeting.type === 'upcoming' ? 'Scheduled' : 'Completed'}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold text-navy-900">
                {meeting.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              {' at '}
              <span>{meeting.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            {meeting.notes && (
              <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700">
                <p className="font-medium text-gray-900 mb-1">Notes:</p>
                <p>{meeting.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Upcoming Meetings */}
      {upcomingMeetings.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Upcoming Meetings</h3>
          <div className="relative pl-4">
            {upcomingMeetings.map((meeting) => (
              <MeetingItem key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
      )}

      {/* Past Meetings */}
      {pastMeetings.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Meeting History</h3>
          <div className="relative pl-4">
            {pastMeetings.map((meeting) => (
              <MeetingItem key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
      )}

      {meetings.length === 0 && (
        <div className="card text-center py-8">
          <p className="text-gray-600">No meetings scheduled yet</p>
        </div>
      )}
    </div>
  )
}
