"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Problem } from "../types/problem"

// Mock data for LeetCode problems
const mockProblems: Problem[] = [
  { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array", "Hash Table"], completionCount: 0 },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", tags: ["Linked List", "Math"], completionCount: 0 },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["String", "Sliding Window"],
    completionCount: 0,
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search"],
    completionCount: 0,
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    tags: ["String", "Dynamic Programming"],
    completionCount: 0,
  },
  { id: 6, title: "ZigZag Conversion", difficulty: "Medium", tags: ["String"], completionCount: 0 },
  { id: 7, title: "Reverse Integer", difficulty: "Medium", tags: ["Math"], completionCount: 0 },
  { id: 8, title: "String to Integer (atoi)", difficulty: "Medium", tags: ["String"], completionCount: 0 },
  { id: 9, title: "Palindrome Number", difficulty: "Easy", tags: ["Math"], completionCount: 0 },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    tags: ["String", "Dynamic Programming"],
    completionCount: 0,
  },
]

interface SearchBarProps {
  onAddProblem: (problem: Problem) => void
}

export function SearchBar({ onAddProblem }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Problem[]>([])

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const results = mockProblems.filter((problem) => problem.title.toLowerCase().includes(searchQuery.toLowerCase()))
    setSearchResults(results)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Problems</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for a problem..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium">Results</h3>
            <div className="rounded-md border divide-y">
              {searchResults.map((problem) => (
                <div key={problem.id} className="flex items-center justify-between p-3">
                  <div>
                    <p className="font-medium">{problem.title}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          problem.difficulty === "Easy"
                            ? "bg-green-100 text-green-800"
                            : problem.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                      {problem.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => onAddProblem(problem)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
