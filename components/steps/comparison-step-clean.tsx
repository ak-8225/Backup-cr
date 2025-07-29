"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Target, TrendingUp, DollarSign, Award, Filter, Info, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import type { Step, College } from "@/types/college"
import { Progress } from "@/components/ui/progress"

interface ComparisonStepProps {
  pageVariants: any
  pageTransition: any
  colleges: College[]
  selectedForComparison: string[]
  onNext: (step: Step) => void
  onBack: () => void
  tuitionFees: { [key: string]: string }
  rankingData: { [key: string]: any }
  userPhone: string
  onCollegeToggle: (id: string) => void
  selectedNextStep: string
  onNextStepChange: (step: string) => void
  nextStepNotes: string[]
  onNotesChange: (notes: string[]) => void
}

export default function ComparisonStep({
  pageVariants,
  pageTransition,
  colleges,
  selectedForComparison,
  onNext,
  onBack,
  tuitionFees,
  rankingData,
  userPhone,
  onCollegeToggle,
  selectedNextStep,
  onNextStepChange,
}: ComparisonStepProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [metricsData, setMetricsData] = useState<{ [key: string]: string }>({})
  const [loadingMetrics, setLoadingMetrics] = useState<{ [key: string]: boolean }>({})

  // Get colleges selected for comparison
  const comparisonColleges = colleges.filter(college => selectedForComparison.includes(college.id))

  const categories = {
    all: { name: "All Categories", icon: Target, color: "from-gray-500 to-gray-600" },
    career: { name: "Career & ROI Outcomes", icon: TrendingUp, color: "from-green-500 to-emerald-600" },
    affordability: { name: "Affordability & Funding", icon: DollarSign, color: "from-blue-500 to-purple-600" },
    academics: { name: "Academics & Brand Value", icon: Award, color: "from-orange-500 to-red-600" },
  }

  const metrics = {
    career: [
      { label: "Graduate Employability Rate", values: comparisonColleges.map(() => "85%"), type: "percentage" },
      { label: "Average Starting Salary", values: comparisonColleges.map(() => "₹25.0L"), type: "currency" },
      { label: "Career Progression Rate", values: comparisonColleges.map(() => "75%"), type: "percentage" },
      { label: "Industry Network Score", values: comparisonColleges.map(() => "8.5/10"), type: "score" },
    ],
    affordability: [
      { label: "Annual Tuition Fees", values: comparisonColleges.map(college => college.tuitionFee), type: "currency" },
      { label: "Living Costs (Annual)", values: comparisonColleges.map(() => "₹12.6L"), type: "currency" },
      { label: "Scholarship Availability", values: comparisonColleges.map(() => "70%"), type: "percentage" },
      { label: "Total Cost of Study", values: comparisonColleges.map(() => "₹37.4L"), type: "currency" },
    ],
    academics: [
      { label: "University Ranking", values: comparisonColleges.map(college => `#${college.ranking}`), type: "ranking" },
      { label: "Student Satisfaction Score", values: comparisonColleges.map(() => "4.2/5"), type: "score" },
      { label: "Research Quality Rating", values: comparisonColleges.map(() => "4.0/5"), type: "score" },
      { label: "International Student Ratio", values: comparisonColleges.map(() => "25%"), type: "percentage" },
    ],
  }

  const allMetrics = selectedCategory === "all" 
    ? [...metrics.career, ...metrics.affordability, ...metrics.academics]
    : metrics[selectedCategory as keyof typeof metrics] || []

  if (comparisonColleges.length === 0) {
    return (
      <TooltipProvider>
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="hover:bg-white/50 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </Button>
          </div>
          
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Colleges Selected for Comparison</h2>
            <p className="text-gray-600 mb-6">Please go back and select at least one college to compare.</p>
            <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
              Go Back to Results
            </Button>
          </div>
        </motion.div>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-white/50 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          <Button
            onClick={() => onNext("initial-form")}
            variant="destructive"
            className="border-2 border-red-500 bg-white text-red-600 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">College Comparison</h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Compare {comparisonColleges.length} colleges across key metrics to make an informed decision
          </p>
        </div>

        {/* Category Filter */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filter by Category</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categories).map(([key, category]) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="sm"
                  className={`transition-all duration-300 ${
                    selectedCategory === key
                      ? `bg-gradient-to-r ${category.color} text-white hover:scale-105`
                      : "hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </Card>

        {/* Comparison Table */}
        <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-gray-200">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Detailed Comparison - {categories[selectedCategory as keyof typeof categories].name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b sticky top-0 z-30 bg-gray-50/90 shadow">
                    <th className="sticky left-0 z-40 bg-white text-left p-4 font-semibold min-w-[200px]">
                      Metric
                    </th>
                    {comparisonColleges.map(college => (
                      <th key={college.id} className="text-center p-4 font-semibold text-gray-900 min-w-[150px]">
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 bg-gradient-to-br ${college.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                            {college.name.charAt(0)}
                          </div>
                          <span className="text-sm">{college.name}</span>
                          {college.liked && (
                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                          )}
                          <Button
                            onClick={() => onCollegeToggle(college.id)}
                            variant={college.liked ? "default" : "outline"}
                            size="sm"
                            className={`transition-all duration-300 mt-1 ${
                              college.liked
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "hover:bg-red-50 hover:border-red-300"
                            }`}
                          >
                            <Heart className={`w-4 h-4 mr-1 ${college.liked ? "fill-current" : ""}`} />
                            {college.liked ? "Liked" : "Like"}
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allMetrics.map((metric, index) => (
                    <tr key={metric.label} className={`border-b hover:bg-gray-50/50 ${index % 2 === 0 ? "bg-white" : ""}`}>
                      <td className="sticky left-0 z-20 bg-white p-4">
                        <span className="font-medium text-gray-900 flex items-center gap-2">
                          {metric.label}
                        </span>
                      </td>
                      {metric.values.map((value, colIndex) => (
                        <td key={colIndex} className="p-4 text-center">
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            {value}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  )
}
