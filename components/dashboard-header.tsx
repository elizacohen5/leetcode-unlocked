import { Code2 } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Code2 className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold">LeetCode Problem Tracker</h1>
      </div>
      <p className="text-gray-500">Search for LeetCode problems and add them to your study list</p>
    </div>
  )
}
