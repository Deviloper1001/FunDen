'use client'

import { Button } from "@/components/ui/button"
import { Download, Search, ChevronDown, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const items = [
  { 
    title: "Grand Theft Auto 4",
    downloadUrl:"https://1024terabox.com/s/113nEu5yfDNSO3V7bnW535w",
    category: "Games"
  },  
  { 
    title: "Grand Theft Auto: San Andreas",
    downloadUrl: "https://1024terabox.com/s/1rFMGbIqxxNWUYcFTnZoWOA",
    category: "Games"
  },
  {
    title: "Grand Theft Auto: Vice City",
    downloadUrl: "https://1024terabox.com/s/1nhru16Sn5AfBAF0VGjxSUg",
    category: "Games"
  },
  {
    title: "BeamNG.drive",
    downloadUrl: "https://1024terabox.com/s/1JL5lDWTRIY85QBbkD6k7fg",
    category: "Games"
  },
  {
    title: "Getting Over It",
    downloadUrl: "https://1024terabox.com/s/19ioNoy8tywEfrbiGKv1K5w",
    category: "Games"
  },
  {
    title: "Nokia game",
    downloadUrl:"https://drive.google.com/file/d/1UDwRpGQ2hRsE1IqzOdfIRT54wUkFo_Ly/view?usp=sharing",
    category: "Games"
  },
  {title: "Harry potter-Book Series",
   downloadUrl:"https://drive.google.com/drive/folders/1Zla_6ilK2KdyyeDBvc_DZEemWvHPt37R?usp=sharing",
   category: "Books"
  },
  {
    title:"Harry Potter-Movie Series",
    downloadUrl:"https://1024terabox.com/s/1mLoO30vE9xsBGOtv6klNlQ",
    category: "Movies"
  },
  {
  title:"Boards Study Material",
  downloadUrl:"https://drive.google.com/drive/folders/1m0OqitYOuBMH_8t12k5X-WGuFYfmafv2?usp=sharing",
  category: "Education"
  }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  // When searching, expand all categories that have matching items
  useEffect(() => {
    if (searchTerm) {
      const categoriesWithMatches = Object.keys(groupedItems)
      setExpandedCategories(categoriesWithMatches)
    }
  }, [searchTerm, groupedItems])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleDownload = (url: string, title: string) => {
    window.open(url, '_blank')
  }

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={index} className="bg-yellow-200 px-1 rounded">{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-2xl font-light text-gray-900 mb-2">Storage Links</h1>
          <p className="text-sm text-gray-600">Personal Download Links *Don't Use These*</p>
        </header>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Items List by Category */}
        <main className="space-y-8">
          {Object.keys(groupedItems).length > 0 ? (
            Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center gap-2 mb-4 text-left w-full group"
                >
                  {expandedCategories.includes(category) ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                  <h2 className="text-lg font-medium text-gray-900 group-hover:text-gray-700">
                    {category} ({categoryItems.length})
                  </h2>
                </button>

                {/* Items in Category */}
                {expandedCategories.includes(category) && (
                  <div className="ml-6 space-y-4">
                    {categoryItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {highlightText(item.title, searchTerm)}
                            </h3>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(item.downloadUrl, item.title)}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No items found matching "{searchTerm}"</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">Don't Download anything unless you know me</p>
        </footer>
      </div>
    </div>
  )
}
