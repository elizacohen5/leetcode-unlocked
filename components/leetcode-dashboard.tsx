"use client"

import { useState } from "react"
import { SearchBar } from "./search-bar"
import { ProblemList } from "./problem-list"
import type { Problem } from "../types/problem"
import { DashboardHeader } from "./dashboard-header"

export function LeetcodeDashboard() {
  const [savedProblems, setSavedProblems] = useState<Problem[]>([])

  const addProblem = (problem: Problem) => {
    if (!savedProblems.some((p) => p.id === problem.id)) {
      setSavedProblems([...savedProblems, problem])
    }
  }

  const removeProblem = (problemId: number) => {
    setSavedProblems(savedProblems.filter((p) => p.id !== problemId))
  }

  const updateCompletionCount = (problemId: number, count: number) => {
    setSavedProblems(
      savedProblems.map((problem) =>
        problem.id === problemId ? { ...problem, completionCount: Math.max(0, count) } : problem,
      ),
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-1">
          <SearchBar onAddProblem={addProblem} />
        </div>
        <div className="lg:col-span-2">
          <ProblemList
            problems={savedProblems}
            onRemoveProblem={removeProblem}
            onUpdateCompletionCount={updateCompletionCount}
          />
        </div>
      </div>
    </div>
  )
}
