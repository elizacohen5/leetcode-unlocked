"use client"

import { Trash2, Plus, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Problem } from "../types/problem"

interface ProblemListProps {
  problems: Problem[]
  onRemoveProblem: (problemId: number) => void
  onUpdateCompletionCount: (problemId: number, count: number) => void
}

export function ProblemList({ problems, onRemoveProblem, onUpdateCompletionCount }: ProblemListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Problem List</CardTitle>
      </CardHeader>
      <CardContent>
        {problems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No problems added yet. Search and add problems to get started.</p>
          </div>
        ) : (
          <div className="rounded-md border divide-y">
            {problems.map((problem) => (
              <div key={problem.id} className="flex items-center justify-between p-4">
                <div className="flex-grow">
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

                <div className="flex items-center space-x-2 mr-4">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    onClick={() => onUpdateCompletionCount(problem.id, problem.completionCount - 1)}
                    disabled={problem.completionCount <= 0}
                  >
                    <Minus className="h-3 w-3" />
                    <span className="sr-only">Decrease</span>
                  </Button>

                  <span className="w-8 text-center font-medium">{problem.completionCount}</span>

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    onClick={() => onUpdateCompletionCount(problem.id, problem.completionCount + 1)}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveProblem(problem.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
