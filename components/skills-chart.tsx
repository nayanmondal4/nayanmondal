"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export default function SkillsChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const frontendSkills = [
    { name: "HTML/CSS", value: 90 },
    { name: "JavaScript", value: 85 },
    { name: "React.js", value: 80 },
    { name: "Next.js", value: 75 },
    { name: "Tailwind", value: 85 },
  ]

  const backendSkills = [
    { name: "Node.js", value: 75 },
    { name: "Express", value: 70 },
    { name: "MongoDB", value: 65 },
    { name: "Firebase", value: 70 },
    { name: "REST API", value: 80 },
  ]

  const designSkills = [
    { name: "Premiere Pro", value: 90 },
    { name: "After Effects", value: 80 },
    { name: "Figma", value: 75 },
    { name: "Photoshop", value: 70 },
    { name: "UI/UX", value: 75 },
  ]

  const skillDistribution = [
    { name: "Frontend", value: 40 },
    { name: "Backend", value: 30 },
    { name: "Design", value: 30 },
  ]

  const COLORS = ["#3b82f6", "#1d4ed8", "#2563eb", "#1e40af", "#1e3a8a"]

  const radarData = [
    {
      subject: "Development",
      A: 85,
      fullMark: 100,
    },
    {
      subject: "Design",
      A: 80,
      fullMark: 100,
    },
    {
      subject: "Video Editing",
      A: 90,
      fullMark: 100,
    },
    {
      subject: "UI/UX",
      A: 75,
      fullMark: 100,
    },
    {
      subject: "Problem Solving",
      A: 80,
      fullMark: 100,
    },
    {
      subject: "Creativity",
      A: 85,
      fullMark: 100,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const chartBgColor = "#1f2937"
  const chartTextColor = "#e5e7eb"
  const chartGridColor = "#374151"
  const tooltipBgColor = "#1f2937"
  const tooltipBorderColor = "#3b82f6"

  return (
    <section id="skills-chart" className="py-20 bg-black">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Skills Visualization</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A visual representation of my technical skills and proficiency levels.
          </p>
        </motion.div>

        <Tabs defaultValue="distribution" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
            <TabsTrigger
              value="distribution"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            >
              Distribution
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            >
              Comparison
            </TabsTrigger>
            <TabsTrigger
              value="radar"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            >
              Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="distribution">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-900/40 backdrop-blur-sm border-0 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full p-6">
                  <CardContent className="p-0">
                      <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                      Skill Distribution
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={skillDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            animationBegin={200}
                            animationDuration={1500}
                          >
                            {skillDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: tooltipBgColor,
                              borderColor: tooltipBorderColor,
                              borderRadius: "0.5rem",
                            }}
                            itemStyle={{ color: chartTextColor }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-gray-900/40 backdrop-blur-sm border-0 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full p-6">
                  <CardContent className="p-0">
                      <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                      Frontend Skills
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={frontendSkills}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                          barSize={20}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                          <XAxis dataKey="name" stroke={chartTextColor} />
                          <YAxis stroke={chartTextColor} domain={[0, 100]} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: tooltipBgColor,
                              borderColor: tooltipBorderColor,
                              borderRadius: "0.5rem",
                            }}
                            itemStyle={{ color: chartTextColor }}
                          />
                          <Legend />
                          <Bar
                            dataKey="value"
                            name="Proficiency"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            animationBegin={200}
                            animationDuration={1500}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="comparison">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 gap-8"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-900/40 backdrop-blur-sm border-0 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full p-6">
                  <CardContent className="p-0">
                      <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                      Skills Comparison
                    </h3>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[...frontendSkills, ...backendSkills, ...designSkills]
                            .map((skill) => ({
                              ...skill,
                              category: frontendSkills.includes(skill)
                                ? "Frontend"
                                : backendSkills.includes(skill)
                                  ? "Backend"
                                  : "Design",
                            }))
                            .sort((a, b) => b.value - a.value)}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                          barSize={20}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                          <XAxis dataKey="name" stroke={chartTextColor} />
                          <YAxis stroke={chartTextColor} domain={[0, 100]} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: tooltipBgColor,
                              borderColor: tooltipBorderColor,
                              borderRadius: "0.5rem",
                            }}
                            itemStyle={{ color: chartTextColor }}
                          />
                          <Legend />
                          <Bar
                            dataKey="value"
                            name="Proficiency"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            animationBegin={200}
                            animationDuration={1500}
                          >
                            {[...frontendSkills, ...backendSkills, ...designSkills].map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry.category === "Frontend"
                                    ? "#3b82f6"
                                    : entry.category === "Backend"
                                      ? "#1d4ed8"
                                      : "#2563eb"
                                }
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="radar">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 gap-8"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-900/40 backdrop-blur-sm border-0 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full p-6">
                  <CardContent className="p-0">
                      <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                      Skills Overview
                    </h3>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid stroke={chartGridColor} />
                          <PolarAngleAxis dataKey="subject" stroke={chartTextColor} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={chartTextColor} />
                          <Radar
                            name="Skills"
                            dataKey="A"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.6}
                            animationBegin={200}
                            animationDuration={1500}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: tooltipBgColor,
                              borderColor: tooltipBorderColor,
                              borderRadius: "0.5rem",
                            }}
                            itemStyle={{ color: chartTextColor }}
                          />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
