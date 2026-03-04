import { Staff, MeetingRequest as MeetingRequestType } from '../../types'
import { useState } from 'react'
import { Calendar, MessageSquare, X, Check } from 'lucide-react'

interface MeetingRequestProps {
  staff: Staff[]
  onCancel: () => void
}

export default function MeetingRequest({ staff, onCancel }: MeetingRequestProps) {
  const [formData, setFormData] = useState<MeetingRequestType>({
    purpose: 'account',
    date: new Date(Date.now() + 86400000),
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const productExperts = staff.filter(s => s.role === 'product_expert')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Meeting request submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      onCancel()
      setSubmitted(false)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="card bg-green-50 border-2 border-green-500">
        <div className="flex items-center gap-3 text-green-700">
          <Check size={24} />
          <div>
            <h4 className="font-semibold">Meeting Request Submitted!</h4>
            <p className="text-sm">Our team will confirm your meeting shortly</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      {/* Purpose */}
      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-2">Purpose *</label>
        <select
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
          className="input-field"
          required
        >
          <option value="account">Account Management</option>
          <option value="loans">Loans & Hedging</option>
          <option value="fx">Foreign Exchange</option>
          <option value="assets">Asset & Wealth Management</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>

      {/* Preferred Staff */}
      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-2">Preferred Specialist (Optional)</label>
        <select
          value={formData.preferredStaff || ''}
          onChange={(e) => setFormData({ ...formData, preferredStaff: e.target.value || undefined })}
          className="input-field"
        >
          <option value="">No preference</option>
          {productExperts.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} - {member.specialization}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-2 flex items-center gap-2">
          <Calendar size={16} />
          Preferred Date *
        </label>
        <input
          type="date"
          value={formData.date.toISOString().split('T')[0]}
          onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
          className="input-field"
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-2 flex items-center gap-2">
          <MessageSquare size={16} />
          Meeting Topic / Notes *
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us what you'd like to discuss..."
          className="input-field resize-none"
          rows={4}
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="btn-primary flex-1"
        >
          Submit Request
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline flex-1 flex items-center justify-center gap-2"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </form>
  )
}
