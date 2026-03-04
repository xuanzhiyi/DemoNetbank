import { Document } from '../../types'
import { FileText, Download, Search, Filter } from 'lucide-react'
import { useState, useMemo } from 'react'

interface DocumentArchiveProps {
  documents: Document[]
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  trading: { bg: 'bg-blue-50', text: 'text-blue-700' },
  lending: { bg: 'bg-purple-50', text: 'text-purple-700' },
  account: { bg: 'bg-green-50', text: 'text-green-700' },
  legal: { bg: 'bg-orange-50', text: 'text-orange-700' }
}

const typeLabels: Record<string, string> = {
  trade_confirmation: 'Trade Confirmation',
  loan_contract: 'Loan Contract',
  statement: 'Statement',
  confirmation: 'Confirmation',
  agreement: 'Agreement'
}

export default function DocumentArchive({ documents }: DocumentArchiveProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date')

  const filteredDocuments = useMemo(() => {
    let filtered = documents

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(doc => doc.category === selectedCategory)
    }

    // Sort
    if (sortBy === 'date') {
      filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [documents, searchTerm, selectedCategory, sortBy])

  const categories = Array.from(new Set(documents.map(d => d.category)))

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <FileText size={20} className="text-pink-500" />
          Document Archive
        </h3>
        <p className="text-gray-600 text-sm">Find and access all your documents including confirmations, contracts, and statements</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="card space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Filter size={16} />
              Category
            </label>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
              className="input-field"
            >
              <option value="date">Most Recent</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-navy-900">{filteredDocuments.length}</span> document{filteredDocuments.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map(doc => (
            <div key={doc.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <FileText size={24} className="text-pink-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-navy-900 hover:text-pink-500 cursor-pointer transition-colors">
                        {doc.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                        <span className={`px-2 py-1 rounded font-medium ${categoryColors[doc.category].bg} ${categoryColors[doc.category].text}`}>
                          {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span>{typeLabels[doc.type]}</span>
                        <span className="text-gray-500">•</span>
                        <span>{doc.date.toLocaleDateString()}</span>
                        <span className="text-gray-500">•</span>
                        <span>{doc.size} KB</span>
                        <span className="text-gray-500">•</span>
                        <span className="font-medium text-gray-700">{doc.fileType.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                  <Download size={20} className="text-navy-500" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center py-8">
            <FileText size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No documents found</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
