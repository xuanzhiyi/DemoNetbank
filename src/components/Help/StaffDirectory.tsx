import { Staff } from '../../types'
import { Mail, Phone, MapPin, Star } from 'lucide-react'

interface StaffDirectoryProps {
  staff: Staff[]
}

const roleColors: Record<string, string> = {
  relationship_manager: 'bg-pink-50 text-pink-700',
  product_expert: 'bg-blue-50 text-blue-700'
}

const roleLabels: Record<string, string> = {
  relationship_manager: 'Relationship Manager',
  product_expert: 'Product Expert'
}

export default function StaffDirectory({ staff }: StaffDirectoryProps) {
  const relationshipManagers = staff.filter(s => s.role === 'relationship_manager')
  const productExperts = staff.filter(s => s.role === 'product_expert')

  return (
    <div className="space-y-8">
      {/* Relationship Managers */}
      <div>
        <h3 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <Star size={20} className="text-pink-500" />
          Your Relationship Managers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relationshipManagers.map((member) => (
            <div key={member.id} className="card">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{member.avatar || '👤'}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-navy-900">{member.name}</h4>
                  <p className={`text-xs font-medium px-2 py-1 rounded w-fit mt-1 ${roleColors[member.role]}`}>
                    {roleLabels[member.role]}
                  </p>
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-pink-500" />
                      <a href={`mailto:${member.email}`} className="text-pink-600 hover:text-pink-700">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-pink-500" />
                      <a href={`tel:${member.phone}`} className="text-pink-600 hover:text-pink-700">
                        {member.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-pink-500" />
                      <span>{member.office}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Experts */}
      <div>
        <h3 className="text-lg font-semibold text-navy-900 mb-4">Product Specialists</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {productExperts.map((expert) => (
            <div key={expert.id} className="card">
              <div className="text-center">
                <div className="text-4xl mb-2">{expert.avatar || '👤'}</div>
                <h4 className="font-semibold text-navy-900">{expert.name}</h4>
                <p className="text-sm text-pink-600 font-medium mt-1">{expert.specialization}</p>
                <p className={`text-xs font-medium px-2 py-1 rounded w-fit mt-2 mx-auto ${roleColors[expert.role]}`}>
                  {roleLabels[expert.role]}
                </p>

                <div className="mt-4 space-y-2 text-xs text-gray-600">
                  <a href={`mailto:${expert.email}`} className="block text-pink-600 hover:text-pink-700 truncate">
                    {expert.email}
                  </a>
                  <a href={`tel:${expert.phone}`} className="block text-pink-600 hover:text-pink-700">
                    {expert.phone}
                  </a>
                  <p>{expert.office}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
